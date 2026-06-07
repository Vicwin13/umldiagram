import { Document, Schema, Types, model } from 'mongoose';

import bcrypt from 'bcrypt';

export interface IUser extends Document {
    _id: Types.ObjectId;
    firstName: string;
    lastName: string;
    address: string;
    email: string;
    password: string;
    dateOfBirth: Date;
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema = new Schema<IUser>({
    firstName: {
        type: String,
        required: [true, 'First name is required'],
        trim: true,
        lowercase: true,
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required'],
        trim: true,
        lowercase: true,

    },
    address: {
        type: String,
        required: [true, 'Address is required'],
        trim: true,
        lowercase: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        
    },
    dateOfBirth: {
        type: Date,
        
    },

}, {timestamps: true});


UserSchema.pre('save', async function (this: IUser) { 
    if (!this.isModified('password')) return ;

    
        const salt = await bcrypt.genSalt(12);
        this.password = await bcrypt.hash(this.password, salt);
        
   
});


export const User = model<IUser>('UserModel', UserSchema);

export default User;