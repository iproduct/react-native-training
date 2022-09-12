import { IdType, ImageData } from "./shared-types.js";

export enum PostStatus {
    Published = 1, Draft
}

export class Post {
    constructor(
        public title: string,
        public content: string,
        public tags: string[],
        public image: ImageData,
        public authorId: IdType,
        public status: PostStatus = PostStatus.Published,
        public id: IdType = undefined,
    ) {
        // super(title, content, tags, imageUrl, authorId);
    }
}
