import UserRepository from "../repository/UserRepository.js";
const User = new UserRepository();

class AuthController {
    print(request, response) {
        response.status(200).json("ok");  
    }

    process(request, response) {
        let email = request.body.email.trim();
        let password = request.body.password;
        User.connect(email, password)
        .then(result => {
            if (result === false){
                console.log("error");
                response.status(400).json({error: 'Authentification échouée', email: email});   
            }
            else{
                request.session.connected = true;
                request.session.email = result.email;
                request.session.isAdmin = result.isAdmin;
                request.session.lastname = result.lastname;
                request.session.firstname = result.firstname;
                
                console.log("coucou", request.sessionID);
                //response.status(200).json(request.sessionID);
                response.send(request.sessionID)
            }
        });
    }
    

}

export default AuthController;
