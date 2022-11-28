import db from './db';

const Message = {
    async sender(parent, args, context, info) {
        return await db.UserModel.findById(parent.sender).
                select("name") 
    }
};

export { Message as default };