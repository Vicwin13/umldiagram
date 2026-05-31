import { Document, Schema, model } from "mongoose";

export interface ICategory extends Document {
  name: string;
  description?: string;
}

const categorySchema = new Schema<ICategory>({
  name: {
    type: String,
    required: [true, "Category name is required"],
    unique: true,
  },
  description: {
    type: String,
  }
}, { timestamps: true });

export const Category = model<ICategory>("Category", categorySchema);
