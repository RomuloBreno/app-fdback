
import mongoose, { Document, Schema } from 'mongoose';

export interface ILogger extends Document {
    status: string;
    statusCode: string;
    content: string;
    method: string;
}

const LoggerSchema: Schema = new Schema({
    status: { type: String, required: true },
    statusCode: { type: String, required: true },
    content: { type: String, required: true },
    method: { type: String, required: true }
});

const Logger = mongoose.model<ILogger>('Logger', LoggerSchema);

export default Logger
