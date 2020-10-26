import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { uuid } from 'uuidv4';
import findDeepCommentAndInsertAInnerComment from '../../../utils/findDeepCommentAndInsertAInnerComment';
import Post from '../posts/Post';

export default class CommentController {
  public async create(request: Request, response: Response): Promise<Response> {
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
  }
}
