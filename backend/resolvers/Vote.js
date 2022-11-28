import db from './db';

const Vote = {
    async creator(parent, args, context, info) {
        return await db.UserModel.findById(parent.creator).
                select("name") 
    }
};

export { Vote as default };

