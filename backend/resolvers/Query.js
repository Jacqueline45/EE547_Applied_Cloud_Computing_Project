import db from './db';
const mongoose = require('mongoose');
const Query = {
  async users(parent, {name}, context, info) {
      if (!name) {
        return await db.UserModel.find({}).
          collation({locale: "en"}).
          sort({name : 1}).
          select('-password')
      }

      let ul = await db.UserModel.find({name: name}).select('-password')

      console.log("===Query===")
      console.log(ul)
      return ul
  },

  async signIn(parent, {name, password}, context, info){
    try{
      if(!name || !password) return;

      let user = await db.UserModel.findOne({name: name}).select('name password');
      console.log("===Query:SignIn===");
      console.log(user);

      if(user) {
        if (user.password === password) return "SUCCESS";
        else return "WRONG_PASSWORD";
      } else {
        return "USER_NOT_FOUND";
      }
    } catch(e) {return "USER_NOT_FOUND";}
  },
  
  async posts(parent, {author}, context, info) {
    try{
      const post = await db.PostModel.find({});
      if (!post) throw ("Post Not found")
      console.log("===Query:Posts===");
      console.log(post);
      return post
    } catch(e) {console.log(e)}
  },

  async dues(parent, {author}, context, info) {
    try{
      if (!author) throw new Error("Missing author.");
      const user = await db.UserModel.findOne({name: author});
      const due_post = await db.DueModel.find({author: user});
      if (!user || !due_post) throw ("User or post not found.");
      console.log("===Query:Due Posts===");
      console.log(due_post);
      return due_post;
    } catch(e) {console.log(e)}
  },

  async onemessageboxes(parent, {sender}, context, info){
    try{
      if (!sender) throw new Error("Missing sender.");
      const user = await db.UserModel.findOne({name: sender});
      const message = await db.OneMessageBoxModel.find({sender: user});
      if (!user || !message) throw ("User or message not found.");
      console.log("===Query:Message===");
      console.log(message);
      return message;
    } catch(e) {console.log(e)}
  },

  async votes(parent, {vote}, context, info){
    if(!vote){
      return await db.VoteModel.find()
    } else {
      return await db.VoteModel.findOne({vote: vote})
    }
  },
}

export default Query;