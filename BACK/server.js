import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
//import session from 'express-session';
const app = express();

app.use(
    cors({
        origin: "http://127.0.0.1:5501",
    })
)
app.use(express.urlencoded({extended: true})); // it parses urlencoded bodies

// app.use(bodyParser.json()); //it parses JSON

// we create a session where to store the infos of a connected user

// app.use(session({
//     secret: process.env.APP_KEY, resave:false, saveUninitialized:false, 
//     cookie: {maxAge: 3600000} 
// }));
// permet de renvoyer les sessions à la vue
//app.use((req,res,next) => {res.locals.session = req.session; next();});



import dotenv from "dotenv";
dotenv.config(); 

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

//--------------------------------------------------------------------
//     Connexion à la base de données
//--------------------------------------------------------------------

mongoose
    .connect(`${process.env.MONGO_URI}`, {
      autoIndex: true,
    })
    .then(() => console.log("Connecté à la base de données"))
    .catch((err) => console.log(err));
