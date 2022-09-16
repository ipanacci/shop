import UserRepository from "../repository/UserRepository";
const User = new UserRepository();

class AuthController {
    print(request, response) {
        response.status(200).json("ok");  
    }

    process(request, response) {
        let email = request.body.email;
        let password = request.body.password;
        User.connect(email, password)
        .then(result => {
            if (result === false){
                response.status(400).json({error: 'Authentification échouée', email: email});   
            }
            else{
                request.session.user = {
                    connected : true,
                    id : result._id,
                    email : result.email,
                    isAdmin : result.isAdmin,
                    lastname : result.lastname,
                    firstname : result.firstname
                }
                request.flash('notify', 'vous êtes connecté');
                response.status(200).json("OK");
            }
        });
    }
    

}

export default AuthController;
