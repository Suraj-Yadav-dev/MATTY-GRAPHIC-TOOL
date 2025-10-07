// server/config/corsOptions.js
const allowedOrigins = ["http://localhost:5173"]; // frontend URL

export const corsOptions = {
  origin: allowedOrigins,
  credentials: true,
};

export default corsOptions;
