import { Request, Response } from 'express';
import Story from '../models/story.model';
import { z, ZodError } from 'zod';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Lazy initialization of Gemini AI client (only when API key is available)
let genAI: GoogleGenerativeAI | null = null;

function getGenAI(): GoogleGenerativeAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  if (!genAI) {
    genAI = new GoogleGenerativeAI(apiKey);
  }
  return genAI;
}

// Define Zod schema for story creation validation (matching frontend data structure)
const createStorySchema = z.object({
  lesson: z.string().min(1, 'Lesson is required'), // The big lesson from STEP 3
  theme: z.string().optional(), // Theme from STEP 1: FAIRY TALE, SPACE, ADVENTURE, SPOOKY
  length: z.enum(['QUICK', 'NORMAL', 'LONG']).optional(), // Length from STEP 2
  userId: z.string().optional(),
});

// Local fallback generator used when Gemini API is not configured or fails
const generateLocalStory = async (
  lesson: string,
  theme?: string,
  length?: string
): Promise<{ title: string; content: string }> => {
  const wordCount = length === 'QUICK' ? 300 : length === 'LONG' ? 1000 : 500;
  const title = theme ? `${theme} Adventure: Learning ${lesson}` : `Learning ${lesson}`;
  const paragraphs = [] as string[];
  paragraphs.push(`Once upon a time, in a ${theme ?? 'magical'} place, a curious child set out to learn about ${lesson}.`);
  paragraphs.push(`Along the way, they met friends and faced small challenges that taught them why ${lesson} matters.`);
  paragraphs.push(`By the end, the hero understood ${lesson} and felt braver and wiser.`);
  // Repeat or expand until approximate word count reached (simple heuristic)
  let content = paragraphs.join('\n\n');
  while (content.split(' ').length < wordCount) {
    content += '\n\n' + paragraphs[Math.floor(Math.random() * paragraphs.length)];
  }
  return { title, content };
};

/**
 * Generate a story using Gemini AI based on the provided lesson, theme, and length
 */
const generateStoryWithAI = async (
  lesson: string,
  theme?: string,
  length?: string
): Promise<{ title: string; content: string }> => {
  try {
    // Determine word count based on length
    let wordCount = 500; // Default for NORMAL
    if (length === 'QUICK') {
      wordCount = 300;
    } else if (length === 'LONG') {
      wordCount = 1000;
    }

    // Build the prompt for Gemini AI
    let prompt = `You are a creative children's story writer. Create an engaging, age-appropriate story that is educational and fun.

THE MAIN LESSON: The hero should learn about "${lesson}"

`;

    if (theme) {
      prompt += `THEME: ${theme}\n`;
    }

    prompt += `STORY LENGTH: Approximately ${wordCount} words

Please create a complete children's story with:
1. A creative and engaging title (on the first line, followed by a blank line)
2. A complete story that teaches the lesson "${lesson}" in an engaging way
3. The story should be appropriate for children ages 5-10
4. Include vivid descriptions and a clear narrative arc
5. Make it fun, imaginative, and memorable

Format your response as:
TITLE: [Story Title]

[Story content here]`;

    // Try to get Gemini AI client; if missing, use local fallback generator
    const genAIClient = getGenAI();
    if (!genAIClient) {
      return generateLocalStory(lesson, theme, length);
    }

    const model = genAIClient.getGenerativeModel({ model: 'gemini-pro' });

    // Use the generative model API; if anything goes wrong, fall back to local generator
    let aiResponse = '';
    try {
      const result = await model.generateContent(prompt);

      // The SDK may return different shapes; try common access patterns
      try {
        const response = await (result as any).response;
        if (response) {
          const text = response.text;
          aiResponse = typeof text === 'function' ? await text.call(response) : String(text);
        }
      } catch (e) {
        // ignore and try alternative
      }

      if (!aiResponse) {
        try {
          const alt = (result as any).output?.[0]?.content?.[0]?.text || (result as any).text || '';
          aiResponse = String(alt || '');
        } catch (e) {
          aiResponse = '';
        }
      }

      if (!aiResponse) {
        console.warn('Gemini SDK returned no text; falling back to local generator');
        return generateLocalStory(lesson, theme, length);
      }
    } catch (e) {
      console.error('Gemini SDK error, falling back to local generator:', e);
      return generateLocalStory(lesson, theme, length);
    }

    // Extract title and content from the AI response
    let title = '';
    let content = '';

    // Try to extract title if it's explicitly marked with "TITLE:"
    const titleMatch = aiResponse.match(/^TITLE:\s*(.+?)(?:\n|$)/i);
    if (titleMatch) {
      title = titleMatch[1].trim();
      content = aiResponse.replace(/^TITLE:\s*.+?\n+/i, '').trim();
    } else {
      // If no explicit title, use first line as title and rest as content
      const lines = aiResponse.split('\n').filter((line: string) => line.trim());
      title = lines[0]?.trim() || 'Untitled Story';
      content = lines.slice(1).join('\n').trim() || aiResponse;
    }

    // If content is empty, use the full response
    if (!content) {
      content = aiResponse;
    }

    return { title, content };
  } catch (error) {
    console.error('Error generating story with AI:', error);
    
    // Provide more specific error messages
    if (error instanceof Error) {
      if (error.message.includes('GEMINI_API_KEY')) {
        throw new Error('Gemini API key is not configured. Please set GEMINI_API_KEY in your environment variables.');
      }
      if (error.message.includes('403') || error.message.includes('Forbidden')) {
        throw new Error('Invalid or missing Gemini API key. Please check your GEMINI_API_KEY environment variable.');
      }
      if (error.message.includes('401') || error.message.includes('Unauthorized')) {
        throw new Error('Gemini API key is invalid or expired. Please check your GEMINI_API_KEY.');
      }
    }
    
    throw new Error('Failed to generate story with AI. Please try again later.');
  }
};

/**
 * Create a new story using AI (matching frontend data structure)
 */
export const createStory = async (req: Request, res: Response) => {
  try {
    // Validate request body (matching frontend: lesson, theme, length)
    const { lesson, theme, length, userId } = createStorySchema.parse(req.body);

    // Generate story using Gemini AI (will check API key inside)
    const { title, content } = await generateStoryWithAI(lesson, theme, length);

    // Create and save the story
    const newStory = new Story({
      title,
      content,
      userId: userId || null,
      lesson,
      theme: theme || null,
      length: length || 'NORMAL',
    });

    await newStory.save();

    return res.status(201).json({
      message: 'Story created successfully',
      story: {
        id: newStory._id,
        title: newStory.title,
        content: newStory.content,
        lesson: newStory.lesson,
        theme: newStory.theme,
        length: newStory.length,
        createdAt: newStory.createdAt,
      },
    });
  } catch (error) {
    console.error('createStory error:', error);
    
    if (error instanceof ZodError) {
      return res.status(400).json({
        message: 'Validation error',
        errors: error.issues,
      });
    }

    const errMessage = error instanceof Error ? error.message : JSON.stringify(error);
    return res.status(500).json({
      message: 'Error creating story',
      error: errMessage,
    });
  }
};

/**
 * Get all stories (optional: filter by userId)
 */
export const getStories = async (req: Request, res: Response) => {
  try {
    const { userId } = req.query;
    const query = userId ? { userId } : {};

    const stories = await Story.find(query)
      .sort({ createdAt: -1 })
      .select('-__v')
      .lean();

    return res.status(200).json({
      message: 'Stories retrieved successfully',
      stories,
    });
  } catch (error) {
    console.error('getStories error:', error);
    const errMessage = error instanceof Error ? error.message : JSON.stringify(error);
    return res.status(500).json({
      message: 'Error retrieving stories',
      error: errMessage,
    });
  }
};

/**
 * Get a single story by ID
 */
export const getStoryById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const story = await Story.findById(id).select('-__v').lean();

    if (!story) {
      return res.status(404).json({ message: 'Story not found' });
    }

    return res.status(200).json({
      message: 'Story retrieved successfully',
      story,
    });
  } catch (error) {
    console.error('getStoryById error:', error);
    const errMessage = error instanceof Error ? error.message : JSON.stringify(error);
    return res.status(500).json({
      message: 'Error retrieving story',
      error: errMessage,
    });
  }
};
