// src/models/User.ts
import mongoose, { Document, Schema } from 'mongoose';

// Interface para o usuário, que estende Document do Mongoose
export interface IUser extends Document {
    name: string;
    nick: string;
    email: string;
    job: string;
    passwordHash: string;
    pathImage: string;
}

// Esquema do usuário
const UserSchema: Schema<IUser> = new Schema({
    name: { type: String, required: true },
    nick: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    job: { type: String, required: true },
    passwordHash: { type: String, required: true },
    pathImage: { type: String }
}, { timestamps: true }); // Adiciona timestamps para createdAt e updatedAt

// Modelo do usuário
const User = mongoose.model<IUser>('User', UserSchema);

export default User;