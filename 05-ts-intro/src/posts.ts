import { NumberIdGenerator, Repository, RepositoryInMemoryImpl } from './repository.js';
import { IdType } from "./shared-types.js";

export class PostCreateDto {
    constructor(
        public title: string,
        public content: string,
        public tags: string[],
        public imageUrl: string,
        public authorId: IdType
    ) { }
}

export class Post extends PostCreateDto{
    constructor(
        public id: IdType,
        title: string,
        content: string,
        tags: string[],
        imageUrl: string,
        authorId: IdType
    ) {
        super(title, content, tags, imageUrl, authorId);
    }
}

export interface PostRepository extends Repository<IdType, Post> {
    findByTags(searachTags: string[]): Post[];
    findByTitlePart(titlePart: string): Post[];
    findByAuthorId(authorId: IdType): Post[];
}

