
import mongoose, { Document, Schema } from 'mongoose';

export interface IFollows extends Document {
    user: mongoose.Schema.Types.ObjectId;
    followers: string[];
    following: string[];
    qtdFollowers: number;
    qtdFollowing: number;

}

// Esquema do Post
const FollowSchema: Schema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Referência ao modelo User
    followers: [{type: String}],
    following: [{type: String}],
    qtdFollowers: {type: Number},
    qtdFollowing:  {type: Number},
});

// Modelo do Post
const Follows = mongoose.model<IFollows>('Follows', FollowSchema);

export default Follows;
