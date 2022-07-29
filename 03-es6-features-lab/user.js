export class User {
    constructor(username, name, pictureUrl, numberRepos, numberGists, followers) {
        this.username = username;
        this.name = name;
        this.pictureUrl = pictureUrl;
        this.numberRepos = numberRepos;
        this.numberGists = numberGists;
        this.followers = followers;
    }
}