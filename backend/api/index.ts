// import { VercelRequest, VercelResponse } from '@vercel/node';
// import express from "express";
// import helmet from "helmet";
// import morgan from "morgan";
// import rateLimit from "express-rate-limit";
// import cors from "cors";
// import cookieParser from "cookie-parser";
// import authRoutes from "../src/routes/auth.route";
// import roomRoutes from "../src/routes/room.route";
// import reservationRoutes from "../src/routes/reservation.route";
// import dotenv from "dotenv";
// import { errorHandler, NotFound } from "../src/middleware/error-handler";
// import { connectMongoDB } from "../src/utils/connectDB";

// dotenv.config();

// let app: express.Application | null = null;
// let isConnected = false;

// const initializeApp = async () => {
//   if (app) return app;

//   app = express();

//   // Connect to MongoDB once
//   if (!isConnected) {
//     const mongoUrl = process.env.DATABASE_URL;
//     if (mongoUrl) {
//       try {
//         await connectMongoDB(mongoUrl);
//         isConnected = true;
//         console.log('MongoDB connected successfully');
//       } catch (error) {
//         console.error('MongoDB connection failed:', error);
//       }
//     }
//   }

//   // Middleware
//   app.use(cookieParser());
//   app.use(helmet());
  
//   // Only use morgan in development
//   if (process.env.NODE_ENV !== 'production') {
//     app.use(morgan("dev"));
//   }

//   const apiLimiter = rateLimit({
//     windowMs: 20 * 60 * 1000,
//     max: 200,
//     standardHeaders: true,
//     legacyHeaders: false,
//     message: "Too many requests from this IP, please try again after 20 minutes",
//   });

//   app.use(apiLimiter);
  
//   app.use(
//     cors({
//       origin: process.env.WEB_ORIGIN || "*",
//       credentials: true,
//     })
//   );

//   app.use(express.json());

//   // Health check routes
//   app.get("/", (req, res) => {
//     res.json({ 
//       message: "ZyncLuxury API is running fine!", 
//       timestamp: new Date().toISOString(),
//       environment: process.env.NODE_ENV || 'development'
//     });
//   });

//   app.get("/api", (req, res) => {
//     res.json({ 
//       message: "ZyncLuxury API is running fine!",
//       timestamp: new Date().toISOString()
//     });
//   });

//   app.get("/health", (req, res) => {
//     res.json({ 
//       status: "healthy", 
//       timestamp: new Date().toISOString(),
//       mongodb: isConnected ? "connected" : "disconnected"
//     });
//   });

//   // API Routes
//   app.use("/api/v1/auth", authRoutes);
//   app.use("/api/v1/room", roomRoutes);
//   app.use("/api/v1/reservation", reservationRoutes);

//   // Error handling middleware
//   app.use(NotFound);
//   app.use(errorHandler);

//   return app;
// };

// export default async (req: VercelRequest, res: VercelResponse) => {
//   try {
//     const appInstance = await initializeApp();
//     return appInstance(req, res);
//   } catch (error) {
//     console.error('Error initializing app:', error);
//     res.status(500).json({ 
//       error: 'Internal server error',
//       message: error instanceof Error ? error.message : 'Unknown error'
//     });
//   }
// };

import { VercelRequest, VercelResponse } from '@vercel/node';
import express from "express";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

let app: express.Application | null = null;

const initializeApp = async () => {
  if (app) return app;

  try {
    console.log('Initializing Express app...');
    app = express();

    // Basic middleware
    app.use(express.json());

    // Test routes
    app.get("/", (req, res) => {
      console.log('Root route hit');
      res.json({ 
        message: "ZyncLuxury API is running fine!", 
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development'
      });
    });

    app.get("/api", (req, res) => {
      console.log('API route hit');
      res.json({ 
        message: "API endpoint working!",
        timestamp: new Date().toISOString()
      });
    });

    app.get("/health", (req, res) => {
      console.log('Health check hit');
      res.json({ 
        status: "healthy", 
        timestamp: new Date().toISOString(),
        mongodb: "not connected (debug mode)"
      });
    });

    // Test if we can import our modules
    try {
      console.log('Testing module imports...');
      
      // Test import of middleware
      const { NotFound } = await import("../src/middleware/error-handler");
      console.log('✅ Middleware imported successfully');
      
      // Add 404 handler
      app.use(NotFound);
      
      console.log('✅ Express app initialized successfully');
    } catch (importError) {
      console.error('❌ Import error:', importError);
      // Continue without the problematic imports for now
    }

    return app;
  } catch (error) {
    console.error('❌ Error initializing app:', error);
    throw error;
  }
};

export default async (req: VercelRequest, res: VercelResponse) => {
  try {
    console.log(`Incoming request: ${req.method} ${req.url}`);
    const appInstance = await initializeApp();
    return appInstance(req, res);
  } catch (error) {
    console.error('❌ Function invocation error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });
  }
};