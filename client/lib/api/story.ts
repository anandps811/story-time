import { StoryData } from '../types';

type CreateStoryPayload = {
  lesson: string;
  theme?: string;
  length?: 'QUICK' | 'NORMAL' | 'LONG';
  userId?: string;
};

type CreateStoryResponse = {
  message: string;
  story: {
    id: string;
    title: string;
    content: string;
    lesson: string;
    theme?: string;
    length?: string;
    createdAt: string;
  };
};

const base = process.env.NEXT_PUBLIC_API_URL ?? '';

async function request(path: string, opts?: RequestInit) {
  const res = await fetch(`${base}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    ...opts,
  });

  const text = await res.text();
  let data: { message?: string; [key: string]: unknown } = {};
  
  try {
    data = text ? JSON.parse(text) : {};
  } catch (e) {
    // Response is not valid JSON (likely HTML error page)
    console.error('Failed to parse response as JSON:', e);
    data = { message: 'Invalid server response' };
  }

  if (!res.ok) {
    const err = new Error(data?.message ?? 'Request failed') as Error & { status?: number; data?: unknown };
    err.status = res.status;
    err.data = data;
    throw err;
  }

  return data;
}

/**
 * Create a new story using AI
 */
export async function createStory(payload: CreateStoryPayload): Promise<CreateStoryResponse> {
  return request('/story/create', { 
    method: 'POST', 
    body: JSON.stringify(payload) 
  }) as Promise<CreateStoryResponse>;
}

/**
 * Get all stories
 */
export async function getStories(userId?: string) {
  const query = userId ? `?userId=${userId}` : '';
  return request(`/story${query}`, { method: 'GET' });
}

/**
 * Get a story by ID
 */
export async function getStoryById(id: string) {
  return request(`/story/${id}`, { method: 'GET' });
}

/**
 * Convert backend story response to frontend StoryData format
 */
export function convertStoryToFrontendFormat(backendStory: CreateStoryResponse['story']): StoryData {
  // Split content into paragraphs (split by double newlines or single newlines)
  const paragraphs = backendStory.content
    .split(/\n\s*\n/)
    .map(p => p.trim())
    .filter(p => p.length > 0);

  // If no paragraphs found, split by single newlines
  const content = paragraphs.length > 0 
    ? paragraphs 
    : backendStory.content.split('\n').map(p => p.trim()).filter(p => p.length > 0);

  // If still no content, use the whole content as one paragraph
  return {
    title: backendStory.title,
    content: content.length > 0 ? content : [backendStory.content],
  };
}

const story = { createStory, getStories, getStoryById, convertStoryToFrontendFormat };
export default story;
