import express from'express';
import ProduitController from '../src/controllers/ProduitController.js';
const router = express.Router();
const produitController = new ProduitController();

 
// Récupére tous les produits
router.get('/', (req, res) => {
    produitController.getAll(req, res);
});
// Récupére 1 utilisateur via son ID
router.get('/:id', (req, res) => {
    produitController.getById(req, res);
});
// Création d'un produit
router.post('/', (req, res) => {
    produitController.add(req, res);
});
// Modification d'un produit via son ID
router.put('/:id', (req, res) => {
    produitController.updateById(req, res);
});
// Suppression d'un produit via son ID
router.delete('/:id', (req, res) => {
    produitController.deleteById(req, res);
});
 
// Les autres méthodes sont donc non allouées
router.route('/').all((req,res) => { res.status(405).send(); });
router.route('/:id').all((req,res) => { res.status(405).send(); });
 
export default router;