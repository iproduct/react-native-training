import { Repository, RepositoryInMemoryImpl } from './repository.js';
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

export interface PostRepository extends Repository<IdType, Post> {
    findByTags(searachTags: string[]): Post[];
    findByTitlePart(titlePart: string): Post[];
    findByAuthorId(authorId: IdType): Post[];
}

export class PostRepositoryImpl extends RepositoryInMemoryImpl<IdType, Post> implements PostRepository {
    findByTags(searachTags: string[]): Post[] {
        return this.findAll().filter(post => post.tags.some(tag => searachTags.includes(tag)));
    }
    findByTitlePart(titlePart: string): Post[] {
        return this.findAll().filter(post => post.title.includes(titlePart));
    }
    findByAuthorId(authorId: number): Post[] {
        return this.findAll().filter(post => post.authorId === authorId);
    }
}

// const SAMPLE_POSTS = [
//     new Post("New in TypeScript", "TypeScript becomes stricter ...", ['typescript', 'novelties'], 
//     "https://res.cloudinary.com/practicaldev/image/fetch/s--Iz3e8EkG--/c_imagga_scale,f_auto,fl_progressive,h_1080,q_auto,w_1080/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/azhvn8vuqrofsidykaas.jpg", 1),
//     new Post("New in EcmaScript", "Private fields were added to ES2021 ...", ['es', 'private', 'novelties'], 
//     "http://doctorakil.com/wp-content/uploads/2018/01/coffee-940x600.jpg", 1),
//     new Post("Async Composition using Async/Await", 
//     "ES provides improved composition of async function. ...", ['es', 'async', 'await'], 
//     "http://doctorakil.com/wp-content/uploads/2018/01/coffee-940x600.jpg", 1),
// ]

// function testPostRepository() {
//     const postRepo: PostRepository = new PostRepositoryImpl(new NumberIdGenerator());
//     SAMPLE_POSTS.forEach(post => postRepo.create(post))
//     postRepo.findAll().forEach(post => console.log(post))
//     console.log('Find by Tags:')
//     postRepo.findByTags(['es']).forEach(post => console.log(post))
//     console.log('Find by Tiltle:')
//     postRepo.findByTitlePart('New').forEach(post => console.log(post))
// }

// testPostRepository()
