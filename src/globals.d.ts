declare namespace NodeJS {
    interface ProcessEnv {
        MONGO_URI: string; // Adicione outras variáveis que você está usando
        PORT?: string;     // Use '?' se for opcional
        JWT_SECRET?: string;     // Use '?' se for opcional
        JWT_EXPIRATION?: string;     // Use '?' se for opcional
    }
}

