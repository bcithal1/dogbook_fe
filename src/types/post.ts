export type Post = {
    postId: number;
    commentId?: number;
    message: string;
    authorId: number;
    likeCount: number;
    commentCount: number;
    dateTime: Date;
}