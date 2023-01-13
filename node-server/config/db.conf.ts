import "reflect-metadata";
import mongoose from 'mongoose';
import { blogSchema, userSchema } from "../models";
import { keys } from "../credentials/keys";

export class DBConfig {
    public static async init(): Promise<void> {
        try {
            await mongoose.connect(keys.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
            await mongoose.model('Blog', blogSchema);
            await mongoose.model('User', userSchema);
        } catch (error) {
            console.error(error);
        }
    }

    static get Instance(): typeof mongoose {
        try {
            return this.connection;
        } catch (error) {
            throw error;
        }
    }

    private static connection: typeof mongoose;
}
