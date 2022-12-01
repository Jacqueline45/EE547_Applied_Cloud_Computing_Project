/* -------------------------------------------------------------------------- */
/*                               MONGOOSE MODELS                              */
/* -------------------------------------------------------------------------- */
const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: true },
  password: { type: String, required: true, select: false },
  friends: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
  mood: [{ type: Number }],
  today: { type: Number, default: -1 },
});

const messageSchema = new Schema({
  date: { type: Date },
  sender: { type: mongoose.Types.ObjectId, ref: 'User' },
  body: { type: String },
});

const dueSchema = new Schema({
  due: { type: String, required: true },
  body: { type: String },
  author: { type: mongoose.Types.ObjectId, ref: 'User' }
});

const postSchema = new Schema({
  time: { type: String, required: true },
  body: { type: String },
  author: { type: mongoose.Types.ObjectId, ref: 'User' },
  comments: [{ type: mongoose.Types.ObjectId, ref: 'Comment' }],
});

const commentSchema = new Schema({
  post: { type: mongoose.Types.ObjectId, ref: 'Post' },
  time: { type: String, required: true },
  body: { type: String },
  author: { type: mongoose.Types.ObjectId, ref: 'User' },
});

const oneessageboxSchema = new Schema({
  date: { type: Date },
  sender: { type: mongoose.Types.ObjectId, ref: 'User' },
  body: { type: String },
});

const voteSchema = new Schema({
  vote: { type: String, required: true },
  creator: { type: mongoose.Types.ObjectId, ref: 'User' },
  count: { type: Number }
});

const UserModel = mongoose.model('User', userSchema);
const MessageModel = mongoose.model('Message', messageSchema);
const DueModel = mongoose.model('Due', dueSchema);
const PostModel = mongoose.model('Post', postSchema);
const CommentModel = mongoose.model('Comment', commentSchema);
const OneMessageBoxModel = mongoose.model('OneMessageBox', oneessageboxSchema);
const VoteModel = mongoose.model('Vote', voteSchema);

const db = {
  UserModel,
  MessageModel,
  DueModel,
  PostModel,
  CommentModel,
  OneMessageBoxModel,
  VoteModel,
};

export default db;