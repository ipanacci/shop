import mongoose from "mongoose";

const schemaOptions = {
    versionKey: false
  };

const ProduitSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },
      priceEuro: Number,
      description: String,
      product_image: String,
    },
    schemaOptions
);

export default mongoose.model("Produit", ProduitSchema, "produits");