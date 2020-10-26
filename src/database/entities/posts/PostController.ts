import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Post from './Post';

export default class PostController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { title, content, comments } = request.body;

    const postRepository = getRepository(Post);

    const post = postRepository.create({ title, content, comments });

    const savedPost = await postRepository.save(post);

    return response.json(savedPost);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const postRepository = getRepository(Post);

    const posts = await postRepository.find();

    return response.json(posts);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const postRepository = getRepository(Post);

    const post = await postRepository.findOneOrFail(id);

    return response.json(post);
  }
}
