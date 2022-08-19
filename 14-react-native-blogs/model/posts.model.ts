import { IdType } from "./shared-types.js";

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
        public id: IdType,
    ) {
        // super(title, content, tags, imageUrl, authorId);
    }
}
