// src/models/Post.ts
import mongoose, { Document, Schema } from 'mongoose';
import Comment from './Feedbacks.ts'; // Importação correta de IComments
import User from './User.ts'; // Verifique o caminho

export interface IPost extends Document {
    title: string;
    description: string;
    comments?: string[]; // Array de comentários
    owner: mongoose.Schema.Types.ObjectId; // Referência ao usuário
}

// Esquema do Post
const PostSchema: Schema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comments' }], // Referência ao modelo Comment
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Referência ao modelo User
});

// Modelo do Post
const Post = mongoose.model<IPost>('Post', PostSchema);

export default Post;