/// <reference types="bun-types" />
import { defineConfig } from 'drizzle-kit'
import 'dotenv/config'

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/config/db/schemas',
  out: './drizzle',
  dbCredentials: {
    url: process.env.DATABASE_URL ?? '',
  },
})
