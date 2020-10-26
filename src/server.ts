import express from 'express';
import cors from 'cors';
import { getRepository } from 'typeorm';
import { uuid } from 'uuidv4';
import Post from './database/entities/posts/Post';

import './database';

const server = express();

server.use(express.json());
server.use(cors());

server.get('/posts', async (request, response) => {
  const postRepository = getRepository(Post);

  const posts = await postRepository.find();

  return response.json(posts);
});

server.get('/posts/:id', async (request, response) => {
  const { id } = request.params;

  const postRepository = getRepository(Post);

  const post = await postRepository.findOneOrFail(id);

  return response.json(post);
});

server.post('/posts', async (request, response) => {
  const { title, content, comments } = request.body;

  const postRepository = getRepository(Post);

  const post = postRepository.create({ title, content, comments });

  const savedPost = await postRepository.save(post);

  return response.json(savedPost);
});

function findDeepCommentAndInsertAInnerComment(
  commentId: string,
  comments: Post[],
  newComment: Post,
) {
  comments.forEach(comment => {
    if (String(comment.id) === commentId) comment.comments.push(newComment);
    else
      findDeepCommentAndInsertAInnerComment(
        commentId,
        comment.comments,
        newComment,
      );
  });
}

server.post('/posts/append/:id', async (request, response) => {
  const { content, comments, fatherId } = request.body;
  const { id } = request.params;

  const postRepository = getRepository(Post);

  const father = await postRepository.findOneOrFail(id);

  if (!father)
    return response.status(400).json({ message: 'Wrong Father Id.' });

  const child = postRepository.create({ id: uuid(), content, comments });

  if (String(father.id) !== fatherId) {
    findDeepCommentAndInsertAInnerComment(fatherId, father.comments, child);
  } else father.comments.push(child);

  const savedPost = await postRepository.save(father);

  return response.json(savedPost);
});

server.listen(3333, () => console.log('running'));
