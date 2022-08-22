import { IdType } from "./shared-types.js";

export enum PostStatus {
    Published = 1, Draft
}

// export class PostCreateDto {
//     constructor(
//         public title: string,
//         public content: string,
//         public tags: string[],
//         public imageUrl: string,
//         public authorId: IdType
//     ) { }
// }

export class Post {
    constructor(
        public title: string,
        public content: string,
        public tags: string[],
        public imageUrl: string,
        public authorId: IdType,
        public status: PostStatus = PostStatus.Published,
        public id: IdType = undefined,
    ) {
        // super(title, content, tags, imageUrl, authorId);
    }
}
