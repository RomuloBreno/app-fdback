// src/models/User.ts
import mongoose, { Document, Schema } from 'mongoose';

// Interface para o usuário, que estende Document do Mongoose
export interface IUser extends Document {
    name: string;
    email: string;
    job: string;
    passwordHash: string;
}

// Esquema do usuário
const UserSchema: Schema<IUser> = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    job: { type: String, required: true },
    passwordHash: { type: String, required: true }
}, { timestamps: true }); // Adiciona timestamps para createdAt e updatedAt

// Modelo do usuário
const User = mongoose.model<IUser>('User', UserSchema);

export default User;