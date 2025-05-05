import { config } from "dotenv";
import args from "./setArgs.helper.js";

const { mode } = args;
const path = ".env" + (mode && "." + mode);

config({ path });

const PORT = process.env.PORT;
const MONGO = process.env.MONGO;

const SESSION_KEY = process.env.SESSION_KEY;
const COOKIE_KEY = process.env.COOKIE_KEY;
const JWT_KEY = process.env.JWT_KEY;

const GOOGLE_ID = process.env.GOOGLE_ID;
const GOOGLE_SECRET = process.env.GOOGLE_SECRET;

const env = {
  PORT,
  MONGO,
  SESSION_KEY,
  COOKIE_KEY,
  JWT_KEY,
  GOOGLE_ID,
  GOOGLE_SECRET,
};
