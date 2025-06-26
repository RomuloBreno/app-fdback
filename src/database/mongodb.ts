import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config()

export async function connect() {
    let mongoUri = process.env.MONGO_URI
if (!mongoUri) {
    console.error("A URI do MongoDB não foi definida.");
    process.exit(1); // Encerra o processo, pois a conexão não será possível
  }
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB successfully!');
}