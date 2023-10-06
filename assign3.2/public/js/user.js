import apiRequest from "./apirequest.js";

/* A small data model to represent a Post. */
export class Post {
  /* data is the post data from the API. */
  constructor(data) {
    /* Technically we don't have a full User object here (no followers list), but this is still useful. */
    this.user = new User(data.user);
    this.time = new Date(data.time);
    this.text = data.text;
  }
}

/* A data model representing a user of the app. */
export default class User {
  /* Returns an array of user IDs. */
  static async listUsers() {
    let data = await apiRequest("GET", "/users");
    return data.users;
  }

  /* Returns a User instance, creating the user if necessary. */
  static async loadOrCreate(id) {
    //TODO
    try {
      const data = await apiRequest("GET", `/users/${id}`);
      return new User(data);
    } catch (error) {
      if (error.status === 404) {
        const data = await apiRequest("POST", "/users", { id });
        return new User(data);
      } else {
        throw error;
      }
    }
  }

  /* data is the user object from the API. */
  constructor(data) {
    //TODO
    this.id = data.id;
    this.name = data.name;
    this.avatarURL = data.avatarURL;
    this.following = data.following;
  }

  /* The string representation of a User is their display name. */
  toString() {
    return this.name;
  }

  /* Returns an Object containing only the instances variables we want to send back to the API when we save() the user. */
  toJSON() {
    //TODO
    return {
      name: this.name,
      avatarURL: this.avatarURL
    };
  }

  /* Save the current state (name and avatar URL) of the user to the server. */
  async save() {
    //TODO
    const data = await apiRequest("PATCH", `/users/${this.id}`, this.toJSON());
  }

  /* Gets the user's current feed. Returns an Array of Post objects. */
  async getFeed() {
    //TODO
    const data = await apiRequest("GET",`/users/${this.id}/feed`);
    return data.posts.map(postData => new Post(postData));
  }

  /* Create a new post with the given text. */
  async makePost(text) {
    //TODO
    await apiRequest("POST", `/users/${this.id}/posts`, { text: text });
  }

  /* Start following the specified user id. Does not handle any HTTPErrors generated by the API. */
  async addFollow(id) {
    //TODO
    try {
      await apiRequest("POST", `/users/${this.id}/follow?target=${id}`);
      await this._reload();
    } catch (error) {
      alert(error);
    }
  }

  /* Stop following the specified user id. Does not handle any HTTPErrors generated by the API. */
  async deleteFollow(id) {
    //TODO
    await apiRequest("DELETE", `/users/${this.id}/follow?target=${id}`);
    await this._reload();
  }

  async _reload() {
    let data = await apiRequest("GET", `/users/${this.id}`);
    this.name = data.name;
    this.avatarURL = data.avatarURL;
    this.following = data.following;
  }
}