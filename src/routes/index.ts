import { Router } from 'express';
import PostController from '../database/entities/posts/PostController';
import CommentController from '../database/entities/comment/CommentController';

const routes = Router();
const postController = new PostController();
const commentController = new CommentController();

routes.get('/posts', postController.index);

routes.get('/posts/:id', postController.show);

routes.post('/posts', postController.create);

routes.post('/posts/append/:id', commentController.create);

export default routes;
