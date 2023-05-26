import FollowList from "./followlist.js";
import User, { Post } from "./user.js";

export default class App {
  constructor() {
    /* Store the currently logged-in user. */
    this._user = null;

    this._onListUsers = this._onListUsers.bind(this);

    this._loginForm = document.querySelector("#loginForm");
    this._loginForm.listUsers.addEventListener("click", this._onListUsers);

    //TODO: Initialize any additional private variables/handlers, and set up the FollowList
    this._onLogin = this._onLogin.bind(this);
    this._onNewPost = this._onNewPost.bind(this);

    this._loginForm.addEventListener("submit", this._onLogin);

    this._postForm = document.querySelector("#postForm");
    this._postForm.addEventListener("submit", this._onNewPost);

    this._followList = new FollowList(document.querySelector("#followContainer"),
    this._onAddFollow.bind(this), this._onDeleteFollow.bind(this));

    this._nameForm = document.querySelector("#nameForm");
    this._nameForm.addEventListener("submit", this._onUpdateName.bind(this));

    this._avatarForm = document.querySelector("#avatarForm");
    this._avatarForm.addEventListener("submit", this._onUpdateAvatar.bind(this));

  }

  /*** Event handlers ***/

  async _onListUsers() {
    let users = await User.listUsers();
    let usersStr = users.join("\n");
    alert(`List of users:\n\n${usersStr}`);
  }

  //TODO: Add your event handlers/callback functions here
  

  /*** Helper methods ***/
  async _onLogin(e) {
    e.preventDefault();
    let id = this._loginForm.userid.value;
    this._user = await User.loadOrCreate(id);
    await this._loadProfile();
  }

  async _onNewPost(e) {
    e.preventDefault();
    let text = this._postForm.querySelector("#newPost").value;
    await this._user.makePost(text);
    this._postForm.querySelector("#newPost").value = "";
    await this._loadProfile();
  }

  async _onAddFollow(id) {
    await this._user.addFollow(id);
    await this._loadProfile();
  }

  async _onDeleteFollow(id) {
    await this._user.deleteFollow(id);
    await this._loadProfile();
  }

  async _onUpdateName(e) {
    e.preventDefault();
    let newName = this._nameForm.querySelector("#nameInput").value;
    this._user.name = newName;
    await this._user.save();
    await this._loadProfile();
  }
  
  async _onUpdateAvatar(e) {
    e.preventDefault();
    let newAvatarURL = this._avatarForm.querySelector("#avatarInput").value;
    this._user.avatarURL = newAvatarURL;
    await this._user.save();
    await this._loadProfile();
  }
  

  /* Add the given Post object to the feed. */
  _displayPost(post) {
    /* Make sure we receive a Post object. */
    if (!(post instanceof Post)) throw new Error("displayPost wasn't passed a Post object");

    let elem = document.querySelector("#templatePost").cloneNode(true);
    elem.id = "";

    let avatar = elem.querySelector(".avatar");
    avatar.src = post.user.avatarURL;
    avatar.alt = `${post.user}'s avatar`;

    elem.querySelector(".name").textContent = post.user;
    elem.querySelector(".userid").textContent = post.user.id;
    elem.querySelector(".time").textContent = post.time.toLocaleString();
    elem.querySelector(".text").textContent = post.text;

    document.querySelector("#feed").append(elem);
  }

  /* Load (or reload) a user's profile. Assumes that this._user has been set to a User instance. */
  async _loadProfile() {
    document.querySelector("#welcome").classList.add("hidden");
    document.querySelector("#main").classList.remove("hidden");
    document.querySelector("#idContainer").textContent = this._user.id;
    /* Reset the feed. */
    document.querySelector("#feed").textContent = "";

    /* Update the avatar, name, and user ID in the new post form */
    this._postForm.querySelector(".avatar").src = this._user.avatarURL;
    this._postForm.querySelector(".name").textContent = this._user.name;
    this._postForm.querySelector(".userid").textContent = this._user.id;

    //TODO: Update the rest of the sidebar and show the user's feed
    document.querySelector("#nameInput").value = this._user.name;
    document.querySelector("#avatarInput").value = this._user.avatarURL;
    this._followList.setList(this._user.following);

    let posts = await this._user.getFeed();
    posts.forEach(post => this._displayPost(post));
  }
}
