
import mongoose, { Document, Schema } from 'mongoose';

export interface INotify extends Document {
    receiver: mongoose.Schema.Types.ObjectId;
    notifier: mongoose.Schema.Types.ObjectId;
    postId: mongoose.Schema.Types.ObjectId;
    message: number;

}

// Esquema do Post
const NotifySchema: Schema = new Schema({
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    notifier:  { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    postId:  { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: false },
    message: {type: Number}
});

// Modelo do Post
const Notify = mongoose.model<INotify>('Notify', NotifySchema);

export default Notify;
