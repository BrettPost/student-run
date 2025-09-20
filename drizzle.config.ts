import { defineConfig } from "drizzle-kit";
import { config } from "dotenv";

// Explicitly load .env.local
config({ path: ".env.local" });

export default defineConfig({
    schema: "./src/drizzle/schema",
    out: "./src/drizzle/migrations",
    dialect: "postgresql",
    dbCredentials: {
        url: process.env.DATABASE_URL as string
    },
    verbose: true,
    strict: true,
    casing: 'snake_case'
})