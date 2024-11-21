
import mongoose, { Document, Schema } from 'mongoose';

export interface ILikes extends Document {
    postRefer: mongoose.Schema.Types.ObjectId;
    usersLiked: string[];
    qtdLikes : number;

}

// Esquema do Post
const Likeschema: Schema = new Schema({
    postRefer: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true }, // Referência ao modelo User
    usersLiked: [{ type: String, ref: 'User'}], // Referência ao modelo User
    qtdLikes : {type: Number}
});

// Modelo do Post
const Likes = mongoose.model<ILikes>('Likes', Likeschema);

export default Likes;
