import express from 'express';
import apiProduitsRoutes from './routes.produits.js';
import apiUsersRoutes from './routes.users.js';
const router = express.Router();
 
// ... chargement de vos prochaines routes ici
router.use('/produit', apiProduitsRoutes);
router.use('/user', apiUsersRoutes);
 
// Si une route n'existe pas, erreur 404
router.route("*").all((req,res) => {res.status(404).send();});
export default router;