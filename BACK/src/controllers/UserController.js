import UserRepository from "../repository/UserRepository.js";
import {dataPage} from "../services/dataApiResponse.js";
const User = new UserRepository();
const fields = ["firstname", "lastname", "email", "password", "geolocation"];

class UserController {

    async getAll(request, response){
        const page = request.query.page || 1;
        const limit = 20;
        const offset = limit * (page - 1);
        try {
            const result = await User.getAll(offset, limit);
            response.status(200).json(dataPage(result.items, page, result.count, limit));
        }
        catch(error){
            console.log("primo catch");
            response.status(404).json({error : `La demande n'est pas valide.`});
        }
    }


    async getById(request, response){
        const userId = request.params.id;
        console.log(request.params);
        try {
            const result = await User.getById(userId);
            response.status(200).json(result);
        }
        catch(error){
            response.status(404).json({error: `la demande n'est pas valide`});
        }
    }


    async addUser(request, response){
        const entity = {};
        // console.log("Request BODY", request.body);
        fields.forEach(field=>{
            if (request.body[field]){
                entity[field] = request.body[field];
            }
        });
        entity.isAdmin = false;
        try {
            const result = await User.addUser(entity);
            response.status(200).json(result);
        }   
        catch (error){
            response.status(400).json({error: `la demande n'est pas valide`});
        }
    }


    async updateUser(request, response){
        const userId = request.params.id;
        const entity = {};
        fields.forEach(field=>{
            if (request.body[field]){
                entity[field] = request.body[field];
            }
        });
        try {
            const result = await User.updateUser(userId, entity);
            response.status(200).json(result);
        }   
        catch (error){
            response.status(400).json({error: `la demande n'est pas valide`});
        }
    }


    async deleteUser(request, response){
        const userId = request.params.id;
        console.log(userId);
        try {
            const result = await User.deleteUser(userId);
            response.status(200).json(result);
        }   
        catch (error){
            response.status(400).json({error: `la demande n'est pas valide`});
        }
    }
}

export default UserController;