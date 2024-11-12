// src/models/Post.ts
import mongoose, { Document, Schema } from 'mongoose';
import type {IFeedback} from './Feedbacks.ts'; // Importação correta de IComments

export interface IPost extends Document {
    title: string;
    description: string;
    path: string[];
    comments?: IFeedback[]; // Array de comentários
    owner: mongoose.Schema.Types.ObjectId; // Referência ao usuário
}

// Esquema do Post
const PostSchema: Schema = new Schema({
    title: { type: String },
    path: [{type: String}],
    description: { type: String, required: true },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Feedbacks' }], // Referência ao modelo Comment
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Referência ao modelo User
});

// Modelo do Post
const Post = mongoose.model<IPost>('Post', PostSchema);

export default Post;
