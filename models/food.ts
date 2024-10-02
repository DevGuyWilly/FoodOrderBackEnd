import mongoose, { Schema, Document, Model } from "mongoose";

interface FoodDoc extends Document {
  vendorId: string;
  name: string;
  description: string;
  category: string;
  foodType: string;
  image: [string];
  readyTime: string;
  price: number;
  ratings: number;
}

const foodSchema = new Schema(
  {
    vendorId: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String },
    foodType: { type: String, required: true },
    image: [{ type: String }],
    readyTime: { type: Number },
    ratings: { type: Number },
    price: { type: Number, required: true },
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.__v, delete ret.createdAt, delete ret.updatedAt;
      },
    },
    timestamps: true,
  }
);

const Food = mongoose.model<FoodDoc>("food", foodSchema);

export { Food };
