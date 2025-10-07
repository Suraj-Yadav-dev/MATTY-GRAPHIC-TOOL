// Allowed frontend URLs (local + production)
const allowedOrigins = [
  "http://localhost:5173",                  // Local dev
  "https://matty-graphic-tool.vercel.app", // Vercel frontend
];

export const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true); // allow request
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // allow cookies if needed
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
};

export default corsOptions;
