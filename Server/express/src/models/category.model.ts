import { Document, Schema, Types, model } from "mongoose";

export interface ICategory extends Document {
  name: string;
  description?: string;
  userId: Types.ObjectId;
}

const categorySchema = new Schema<ICategory>({
  name: {
    type: String,
    required: [true, "Category name is required"],
  },
  description: {
    type: String,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "UserModel",
    required: true,
  }
}, { timestamps: true });

export const Category = model<ICategory>("Category", categorySchema);
