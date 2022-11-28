import db from './db';

const User = {
    friends(parent, args, context, info) {
        return Promise.all (
            parent.friends.map(
                (Id) => db.UserModel.findById(Id).
                            select('name today')
            )
        )
    },
  };
  
export { User as default };
  