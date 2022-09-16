import mongoose from "mongoose";

const schemaOptions = {
    versionKey: false
  };

const pointSchema = new mongoose.Schema({
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  });

const UserSchema = new mongoose.Schema(
    {
        firstname: {
            type: String,
            required: true,
        },
        lastname: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        address: String,
        geolocation: {
            type: pointSchema,
        },
        isAdmin: Boolean, 
    }
)

export default mongoose.model("User", UserSchema, "users");