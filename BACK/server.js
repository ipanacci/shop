import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import cookieParser from "cookie-parser"; //you need it to access to cookies with the server. Even without it you can write cookies by res.cookie(...)
import session from "express-session";
import MongoStore from "connect-mongo";


const app = express();

app.use(
    cors({
        origin: "http://127.0.0.1:5501",
        credentials: true
    })
)
app.use(express.urlencoded({extended: true})); // it parses urlencoded bodies

// app.use(bodyParser.json()); //it parses JSON


import dotenv from "dotenv";
dotenv.config(); 




//--------------------------------------------------------------------
//     Connexion à la base de données
//--------------------------------------------------------------------

mongoose
    .connect(`${process.env.MONGO_URI}`, {
      autoIndex: true,
    })
    .then(() => console.log("Connecté à la base de données"))
    .catch((err) => console.log(err));



//app.use(cookieParser()); // now you can access to cookies with req.cookies

//---------------------------------------------------------------------------------------------------------------
//     Create a session where to store the infos of a connected user (AFTER THE CONNECTION MONGOOSE)
//---------------------------------------------------------------------------------------------------------------

app.use(session({
    secret: process.env.APP_KEY, 
    resave:false, 
    secure: true,
    saveUninitialized:false, 
    cookie: {sameSite:"none", maxAge: 1000*60*60*24*365, httpOnly: false },
    httpOnly: false,
    store: MongoStore.create({
        client: mongoose.connection.getClient()
    })
}));
// It works ! It is just saved on localhost, instead than on "http://127.0.0.1:5501/FRONT/auth.html". Now, either we set another cookie in the front, or we just use it in the back.
// In fact we cannot set the domain of the cookie to be complitely another one, but just to be a subdomain...

// permet de renvoyer les sessions à la vue
//app.use((req,res,next) => {res.locals.session = req.session; next();});

//--------------------------------------------------------------------
//      Chargement des routes
//--------------------------------------------------------------------
import apiRoutes from "./api/routes.js";
app.use('/api', apiRoutes);

//--------------------------------------------------------------------
//     Ecoute du serveur HTTP
//--------------------------------------------------------------------

app.listen(process.env.PORT, ()=>{
    console.log(`The server is run and is working : http://localhost:${process.env.PORT}`);
});