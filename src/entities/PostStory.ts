// src/models/Post.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface IPostStory extends Document {
    title: string;
    postStory?: mongoose.Schema.Types.ObjectId[]; // Array de posts
    owner: mongoose.Schema.Types.ObjectId; // Referência ao usuário
}

// Esquema do Post
const PostStorySchema: Schema = new Schema({
    title: { type: String },
    postStory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true }], // Referência ao modelo Comment
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Referência ao modelo User
});

// Modelo do Post
const PostStory = mongoose.model<IPostStory>('PostStory', PostStorySchema);

export default PostStory;
