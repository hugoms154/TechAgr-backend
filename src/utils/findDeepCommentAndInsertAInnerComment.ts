import Post from '../database/entities/posts/Post';

export default function findDeepCommentAndInsertAInnerComment(
  commentId: string,
  comments: Post[],
  newComment: Post,
): void {
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
