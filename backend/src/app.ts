import swaggerUi from "swagger-ui-express";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import cors from "cors";
import authRoutes from "./routes/auth.route";
import roomRoutes from "./routes/room.route";
import reservationRoutes from "./routes/reservation.route";
import dotenv from "dotenv";
dotenv.config();
const app = express();
if (!process.env.WEB_ORIGIN) {
  throw new Error("No WEB_ORIGIN value");
}
app.use(helmet());
app.use(morgan("dev"));
const apiLimiter = rateLimit({
  windowMs: 20 * 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: "Too many requests from this IP, please try again after 20 minutes",
});
app.use(apiLimiter);
app.use(
  cors({
    origin: [process.env.WEB_ORIGIN],
    credentials: true,
  })
);

app.use(express.json());

/** ROUTES */
app.use("/api/v1/room", roomRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/reservation", reservationRoutes);

/** HEALTH CHECK */
app.get("/health", (_req, res) => {
  res.json({ message: "API is running fine!!!", status: "succes" });
});

/** SWAGGER DOCS */
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
// app.get("/api-docs.json", (req, res) => {
//   res.setHeader("Content-Type", "application/json");
//   res.send(specs);
// });

export { app };
