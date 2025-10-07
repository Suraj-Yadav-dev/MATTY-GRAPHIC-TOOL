import mongoose from "mongoose";
import dotenv from "dotenv";
import Design from "./models/Design.js";

dotenv.config();

const seedTemplates = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // Remove existing built-in templates
    await Design.deleteMany({ isBuiltIn: true });

    // Insert new built-in templates
    await Design.insertMany([
      {
        title: "Instagram Post Sale",
        category: "instagram",
        thumbnailUrl: "http://localhost:5173/ig-sale-thumb.jpg",
        jsonData: {
          elements: [
            { type: "text", content: "Big Sale!", x: 50, y: 50, fontSize: 30 },
          ],
        },
        isBuiltIn: true,
        tags: ["sale", "instagram", "promo"],
      },
      {
        title: "LinkedIn Banner Professional",
        category: "linkedin",
        thumbnailUrl: "http://localhost:5173/linkedin-banner-thumb.jpg",
        jsonData: {
          elements: [
            { type: "text", content: "Welcome!", x: 20, y: 30, fontSize: 24 },
          ],
        },
        isBuiltIn: true,
        tags: ["linkedin", "professional"],
      },
      {
        title: "Business Card",
        category: "business-card",
        thumbnailUrl: "http://localhost:5173/Business-Card.jpg",
        jsonData: {
          elements: [
            { type: "text", content: "Your Name", x: 30, y: 40, fontSize: 20 },
            { type: "text", content: "Your Title", x: 30, y: 70, fontSize: 16 },
          ],
        },
        isBuiltIn: true,
        tags: ["business", "card", "professional"],
      },
      {
        title: "Certificate Template",
        category: "certificate",
        thumbnailUrl: "http://localhost:5173/certificate.jpg",
        jsonData: {
          elements: [
            { type: "text", content: "Certificate of Achievement", x: 80, y: 50, fontSize: 26 },
            { type: "text", content: "Awarded to:", x: 100, y: 100, fontSize: 18 },
          ],
        },
        isBuiltIn: true,
        tags: ["certificate", "education", "award"],
      },
      {
        title: "Resume Template",
        category: "resume",
        thumbnailUrl: "http://localhost:5173/Resume.jpg",
        jsonData: {
          elements: [
            { type: "text", content: "Your Name", x: 60, y: 40, fontSize: 22 },
            { type: "text", content: "Profile Summary", x: 60, y: 80, fontSize: 16 },
          ],
        },
        isBuiltIn: true,
        tags: ["resume", "cv", "professional"],
      },
    ]);

    console.log("✅ Built-in templates seeded successfully");
    process.exit();
  } catch (err) {
    console.error("❌ Error seeding templates:", err);
    process.exit(1);
  }
};

seedTemplates();
