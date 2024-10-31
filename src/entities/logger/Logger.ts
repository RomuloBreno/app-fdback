
import mongoose, { Document, Schema } from 'mongoose';

export interface ILogger extends Document {
    status: string;
    statusCode: string;
    content: string;
    method: string;
}

// Esquema do Post
const LoggerSchema: Schema = new Schema({
    status: { type: String, required: true },
    statusCode: { type: String, required: true },
    content: { type: String, required: true },
    method: { type: String, required: true }
});

// Modelo do Post
const Logger = mongoose.model<ILogger>('Logger', LoggerSchema);

export default Logger
