import db from './db';

const Due = {
    async author(parent, args, context, info) {
        return await db.UserModel.findById(parent.author).
                select("name") 
    }
};

export { Due as default };