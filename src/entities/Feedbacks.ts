
import mongoose, { Document, Schema } from 'mongoose';

export interface IFeedback extends Document {
    content: string;
    postId: mongoose.Schema.Types.ObjectId; // Referência ao autor (User)
    author: mongoose.Schema.Types.ObjectId; // Referência ao autor (User)
}

// Esquema do Post
const CommentSchema: Schema = new Schema({
    content: { type: String, required: true },
    postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true }, // Referência ao modelo User
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Referência ao modelo User
});

// Modelo do Post
const Feedback = mongoose.model<IFeedback>('Comment', CommentSchema);

export default Feedback;
