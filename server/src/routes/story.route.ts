import { Router } from "express";
import { createStory, getStories, getStoryById } from "../controllers/story.controller";

const storyRouter: Router = Router();

storyRouter.post('/create', createStory);
storyRouter.get('/', getStories);
storyRouter.get('/:id', getStoryById);

export default storyRouter;
