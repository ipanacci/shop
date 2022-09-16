import ProduitRepository from "../repository/ProduitRepository.js";
const Produit = new ProduitRepository();

class ProduitController {
    getAll(request, response){
        const page = request.body.page || 1;
        const limit = 20;
        const offset = limit * (page - 1);
        Produit.getAll()
        .then(produits=>{
            response.status(200).json(produits);
        })
        .catch((error) => {
            response.status(404).json({error : `La demande n'est pas valide.`});}
        );
        
    }
}

export default ProduitController;