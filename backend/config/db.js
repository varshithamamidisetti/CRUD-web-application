import {neon } from "@neondatabase/serverless";
import dotenv from "dotenv";

dotenv.config();

const {PGUSER,PGPASSWORD,PGHOST,PGDATABASE}= process.env;
// creates a sql connection using our env variables.
export const sql= neon(
    `postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?sslmode=require&channel_binding=require`
);