import User from "../models/User.js";
// import {selectFromFields} from "../services/dataApiResponse.js";


class UserRepository{

    async getAll(offset, limit){
        try {
            const count = await User.estimatedDocumentCount();
            const items = await User.find()
                    .skip(offset)
                    .limit(limit)
                    .select({firstname: 1, lastname: 1, isAdmin: 1, email: 1, geolocation: 1})
                    .sort("lastname");
            return {items: items,
                    count : count};
        } 
        catch (e) {
            return e+" - Cannot retrieve all users ! ";
        }
    }

    async getById(userId){
        try {
            const user = await User.findOne({"_id": userId})
                    .select({firstname: 1, lastname: 1, isAdmin: 1, email: 1, geolocation: 1});
            return user; //if the user does not exists, then "user === []"
        }
        catch (e){
            return e+` - Cannot retrieve user with id ${id}`;
        }
    }


    async addUser(userEntity){ // pour l'instant pas crypté
        try{
            const user = await User.create({firstname: userEntity.firstname.trim(),
                                            lastname: userEntity.lastname.trim(),
                                            email: userEntity.email.trim(),
                                            password: userEntity.password});
            return user;
        }
        catch (e){
            return e+` - Probably you did not give enough infos.`
        }
    }

    async connect(email, password){ //pour l'instant pas crypté
        const user = await User.findOne({"email": email});
        if (user !== null){
            if (user.password === password){
                return user;
            }
            return false;
        }
        return false;
    }



    async updateUser(userId, userEntity){
        try{
            const user = await User.findOne({"_id":userId});
            for (let key in userEntity){
                user[key] = userEntity[key];
            }
            user.save();
            return user;
        }
        catch (e){
            return e+` - Probably you did not give enough infos.`
        }
    }


    async deleteUser(userId){
        console.log(userId);
        try{
            const result = await User.deleteOne({"_id": userId});
            return result;
        }
        catch (e){
            return e+` - Probably you did not give enough infos or the user does not exist.`
        }
    }

}

export default UserRepository;