import pubsub from './pubsub';
import db from './db';
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

async function newUser(db, data){
    return await new db.UserModel(data).save();
}

const Mutation = {
    async createUser(parent, { data }, context, info) {
        try{
            if (!data.name) {throw new Error('Missing username');}
            if (!data.password) {throw new Error('Missing password');}
            if (!data.phone) {throw new Error('Missing phone');}
            if (!data.email) {throw new Error('Missing email');}
            const existing = await db.UserModel.findOne({ name: data.name});
            if (existing) {return "USER_EXISTS"}
            const userdata = {
                name: data.name,
                password: data.password,
                phone: data.phone,
                email: data.email
            };

            const user = await newUser(db, userdata);
            
            console.log("===Mutation: createUser===")
            console.log(user)
            pubsub.publish('user', {
                user: {
                    mutation: 'CREATED',
                    data: user,
                },
            });

            return "SUCCESS"

        }  catch(e){console.log(e)}
    },

    async deleteUser(parent, { name }, context, info) {
        try{
            if (!name) {
                throw new Error('Missing User name');
            }
            const user = await db.UserModel.findOne({name: name})
            if (user){
                await db.UserModel.deleteOne({ name: name })
            } else {
                throw new Error('User not found')
            }
            console.log("===Mutation: deleteUser===")
            console.log(user)
            return await user;

        }  catch(e){console.log(e)}
    },

    async updateUser(parent, args, context, info) {
        try{
            const { name, friends, mood, today } = args.data;
            const user = await db.UserModel.findOne({name: name});

            if (!user) {
                throw new Error('User not found');
            }

            if(friends.length !== 0){
                user.friends = [];
                // console.log("friends="+friends)
                await Promise.all (
                    friends.map( async friend => {
                        const a = await db.UserModel.findOne({name: friend});
                        // console.log(a.name)
                        if (a) {
                            user.friends.push(a);
                        }
                }))
            }
        
            if (mood.length !== 0) {
                user.mood = mood;
            }

            if (typeof today === 'number') {
                user.today = today;
            }

            await user.save()
            console.log("===Mutation: updateUser===")
            console.log(user)

            pubsub.publish('user', {
                user: {
                    mutation: 'UPDATED',
                    data: user,
                },
            });
            return user;

        } catch(e){console.log(e)}
    },
    async createDue(parent, {data}, context, info) {
        try {
            const {due, body, author} = data;
            const user = await db.UserModel.findOne({name: author});

            if (!user) { throw new Error('User not found'); }
            const due_post = {
                due: due,
                body: body,
                author: user
            };
            await new db.DueModel(due_post).save();
            pubsub.publish('due'+`${author}`, {
                due: {
                    mutation: 'CREATED',
                    data: due_post,
                },
            });
            console.log("===Mutation: createDue===");
            console.log(due_post);
            return due_post;

        }catch(e) {console.log(e)}
    },
    async deleteDue(parent, {_id, author}, context, info) {
        try{
            const user = await db.UserModel.findOne({name: author})
            if(!user) throw('User not found')
            const due = await db.DueModel.findOne({_id: _id, author: user});
            if(!due) throw('Due not found')

            await db.DueModel.deleteOne({_id: _id, author: user});
            
            pubsub.publish('due'+`${author}`, {
                due: {
                    mutation: 'DELETED',
                    data: due,
                },
            });

            return due
        } catch(e) {console.log(e)}
    },
    async createPost(parent, {data}, context, info) {
        try {
            const {body, author} = data;
            const user = await db.UserModel.findOne({name: author});

            if (!user) { throw new Error('User not found');}
            var tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
            var localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1);
            var timeStamp = localISOTime.substring(0, 10) + '-' + localISOTime.substring(11, 13) + '-' + localISOTime.substring(14, 16) + '-' + localISOTime.substring(17, 19);
            const post = {
                time: timeStamp,
                body: body,
                author: user,
                comments: []
            };
            await db.PostModel.updateOne({author: user},post,{upsert: true});
            pubsub.publish('post', {
                post: {
                    mutation: 'CREATED',
                    data: post,
                },
            });
            console.log("===Mutation: createPost===")
            console.log(post);
            return post;

        }catch(e) {console.log(e)}
    },

    async deletePost(parent, {_id, author}, context, info) {
        try{
            const user = await db.UserModel.findOne({name: author})
            if(!user) throw('User not found')
            const post = await db.PostModel.findOne({type: type, _id: _id, author: user});
            if(!post) throw('Post not found')

            await db.PostModel.deleteOne({_id: _id, author: user});
            const comments = await db.CommentModel.deleteMany({post: post});
            console.log(comments)
            
            pubsub.publish('post', {
                post: {
                    mutation: 'DELETED',
                    data: post,
                },
            });

            return post
        } catch(e) {console.log(e)}
    },
    
    async createComment (parent, {data}, context, info) {
        try {
            const {postId, postAuthor, body, author} = data;
            const postUser = await db.UserModel.findOne({name: postAuthor})
            const commentUser = await db.UserModel.findOne({name: author})
            if (!postUser) throw (`${postAuthor} not found`)
            if (!commentUser) throw (`${author} not found`)

            const post = await db.PostModel.findOne({_id:postId, author: postUser})
            if(!post) throw ("Post not found")

            var tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
            var localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1);
            var timeStamp = localISOTime.substring(0, 10) + '-' + localISOTime.substring(11, 13) + '-' + localISOTime.substring(14, 16) + '-' + localISOTime.substring(17, 19);
            
            const comment = new db.CommentModel({
                post: post,
                time: timeStamp,
                body: body,
                author: commentUser
            })
            await comment.save()
            await db.PostModel.updateOne({_id:postId, author: postUser}, {$push: {comments: comment}});
            console.log("===Mutation: createComment===")
            pubsub.publish('post', {
                post: {
                    mutation: 'ADDED_COMMENT',
                    data: {
                        id: post.id,
                        time: post.time,
                        body: post.body,
                        author: post.author,
                        comments: [comment]
                    },
                },
            });
            return comment

        } catch (e) {console.log(e)}
    },

    async deleteComment (parent, {data}, context, info) {
        try {
            const {type, postId, postAuthor, commentId, author} = data
            const postUser = await db.UserModel.findOne({name: postAuthor})
            const commentUser = await db.UserModel.findOne({name: author})
            if(!postUser || !commentUser) throw ("User nout found")

            const post = await db.PostModel.findOne({type, id:postId, author:postUser});
            if(!post) throw ("Post nout found")

            const comment = await db.CommentModel.findOne({post:post, id:commentId, author:commentUser})
            if(!comment) throw ("Comment nout found")

            await db.CommentModel.deleteOne({post:post, author:commentUser});
            
            pubsub.publish('post', {
                post: {
                    mutation: 'DELETED_COMMENT',
                    data: {
                        type: post.type,
                        id: post.id,
                        time: post.time,
                        body: post.body,
                        author: post.author,
                        comments: [comment]
                    },
                },
            });
            return comment

        } catch (e) {console.log(e)}
    },

    async createOneMessage(parent, {sender, body}, context, info) {
        try{
            const user = await db.UserModel.findOne({name: sender})
            if(!user) throw ("User not found")
            const message = new db.OneMessageBoxModel({
                sender: user,
                body: body
            })
            await message.save();
            pubsub.publish('message'+`${sender}`, {
                onemessagebox: {
                    mutation: 'CREATED',
                    data: message,
                },
            });
            console.log("===Mutation: CreateOneMessage===");
            console.log(message);
            return message;

        }  catch(e) {console.log(e)}
    },

    async deleteOneMessage(parent, {_id, sender}, context, info) {
        try{
            const user = await db.UserModel.findOne({name: sender})
            if(!user) throw('User not found')
            const message = await db.OneMessageBoxModel.findOne({_id: _id, sender: user});
            if(!message) throw('Message not found')

            await db.OneMessageBoxModel.deleteOne({_id: _id, sender: user});
            pubsub.publish('message'+`${sender}`, {
                onemessagebox: {
                    mutation: 'DELETED',
                    data: message,
                },
            });
            console.log("===Mutation: deleteOneMessage===");
            console.log(message);
            return message;
        } catch(e) {console.log(e)}
    },
    
    async createVote (parent, {data}, context, info) {
        try{
            const {vote, creator} = data;
            const User = await db.UserModel.findOne({name: creator});
            if(!User) throw ("User not found")
            const Vote_exist = await db.VoteModel.findOne({vote: vote, creator: User});
            if(Vote_exist) throw ("This story has been made; share some other stories!!!")
            const newVote = new db.VoteModel({
                vote: vote,
                creator: User,
                count: 0
            })
            await newVote.save();
            pubsub.publish('vote', {
                vote: {
                    mutation: 'CREATED',
                    data: newVote
                },
            });
            return newVote;
        }catch(e) {console.log(e)}
    },

    async updateVote (parent, {data}, context, info) {
        try{
            const {vote, creator} = data;
            const User = await db.UserModel.findOne({name: creator});
            if(!User) throw ("User not found")
            const Vote_exist = await db.VoteModel.findOne({vote: vote, creator: User});
            if(!Vote_exist) throw ("Story doesn't exist!!!")
            const c = Vote_exist.count + 1
            const newVote = {
                vote: vote,
                creator: User,
                count: c
            }
            await db.VoteModel.updateOne({vote: vote, creator: User},newVote,{upsert: true});
            pubsub.publish('vote', {
                vote: {
                    mutation: 'UPDATED',
                    data: newVote
                },
            });
            return newVote;
        }catch(e) {console.log(e)}
    },

    async deleteVote (parent, {_id, creator}, context, info) {
        try{
            const User = await db.UserModel.findOne({name: creator});
            if(!User) throw ("User not found")

            const vote = await db.VoteModel.findOne({_id: _id, creator: User});
            if(!vote) throw ("Vote not found");

            await db.VoteModel.deleteOne({_id: _id, creator: User});
            pubsub.publish('vote', {
                vote: {
                    mutation: 'DELETED',
                    data:vote
                },
            });
            return vote;
        }catch(e) {console.log(e)}
    },

    async clearData(parent, {type}, context, info) {
        try{
            if(!type) {
                await db.UserModel.deleteMany()
                await db.ChatBoxModel.deleteMany()
                await db.MessageModel.deleteMany()
                await db.PostModel.deleteMany()
                await db.CommentModel.deleteMany()
                await db.OneMessageBoxModel.deleteMany();
                await db.VoteModel.deleteMany();
                console.log("===Mutation: clearAll===")
            } else {
                type = type.toLowerCase();
                switch (type) {
                    case "users":
                      await db.UserModel.deleteMany();
                      break;
                    case "chatboxes":
                        await db.ChatBoxModel.deleteMany();
                        break;
                    case "messages":
                      await db.MessageModel.deleteMany();
                      break;
                    case "posts":
                        await db.PostModel.deleteMany();
                        break;
                    case "comments":
                        await db.CommentModel.deleteMany();
                        break;
                    case "onemessagebox":
                        await db.OneMessageBoxModel.deleteMany();
                        break;
                    case "votes":
                        await db.VoteModel.deleteMany();
                        break;
                    default:
                      throw `Type(${type}) not found`;
                  }
                  console.log(`===Mutation: clear${type}===`)
            }
            return true

        } catch(e){console.log(e)}
        return false
    },
};

export default Mutation;