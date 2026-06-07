import { Document, Schema, Types, model } from "mongoose";

export interface INote extends Document {
  title: string;
  content: string;
  category: string;
  userId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const noteSchema = new Schema<INote>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    content: {
      type: String,
      required: [true, "Content is required"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "UserModel",
      required: true,
    }
  },
  {
    timestamps: true,
  },
);

export const Note = model<INote>("Note", noteSchema);

export default Note;
