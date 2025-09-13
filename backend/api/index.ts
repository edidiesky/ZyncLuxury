import { VercelRequest, VercelResponse } from '@vercel/node';
import express from "express";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

dotenv.config();

let app: express.Application | null = null;

const initializeApp = async () => {
  if (app) return app;

  try {
    console.log('Initializing Express app...');
    app = express();

    // Basic middleware
    app.use(express.json());
    app.use(cookieParser());
    app.use(helmet());
    
    app.use(cors({
      origin: process.env.WEB_ORIGIN || "*",
      credentials: true,
    }));

    console.log('✅ Basic middleware added');

    // Test routes
    app.get("/", (req, res) => {
      res.json({ 
        message: "ZyncLuxury API is running fine!", 
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development'
      });
    });

    app.get("/health", (req, res) => {
      res.json({ 
        status: "healthy", 
        timestamp: new Date().toISOString(),
        mongodb: "not connected (debug mode)"
      });
    });

    // Test import of error handler middleware
    try {
      console.log('Testing error handler import...');
      const { NotFound, errorHandler } = await import("../src/middleware/error-handler");
      
      // Add 404 handler
      app.use(NotFound);
      app.use(errorHandler);
      
      console.log('✅ Error handlers imported successfully');
    } catch (importError) {
      console.error('❌ Error handler import failed:', importError);
      
      // Fallback error handlers
      app.use("*", (req, res) => {
        res.status(404).json({ 
          error: "Route not found",
          path: req.originalUrl 
        });
      });
      
      app.use((error: any, req: any, res: any, next: any) => {
        console.error('Error:', error);
        res.status(500).json({
          error: "Internal server error",
          message: error.message
        });
      });
    }

    console.log('✅ Express app initialized successfully');
    return app;
  } catch (error) {
    console.error('❌ Error initializing app:', error);
    throw error;
  }
};

export default async (req: VercelRequest, res: VercelResponse) => {
  try {
    const appInstance = await initializeApp();
    return appInstance(req, res);
  } catch (error) {
    console.error('❌ Function invocation error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};