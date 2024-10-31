
import mongoose, { Document, Schema } from 'mongoose';

export interface IFeedback extends Document {
    content: string;
    author: mongoose.Schema.Types.ObjectId; // Referência ao autor (User)
}

// Esquema do Post
const CommentSchema: Schema = new Schema({
    content: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Referência ao modelo User
});

// Modelo do Post
const Feedback = mongoose.model<IFeedback>('Comment', CommentSchema);

export default Feedback;
