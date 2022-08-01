export class Post {
    constructor(title, content, tags, imageUrl, authorId = 1, id) {
        this.title = title;
        this.content = content;
        this.tags = tags;
        this.imageUrl = imageUrl;
        this.authorId = authorId;
        this.id = id;
    }
}