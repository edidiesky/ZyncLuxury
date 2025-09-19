import axios from "axios";
import logger from "../utils/logger";
import redisClient from "../config/redisClient";

interface InterswitchTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
  jti: string;
}

export class InterswitchTokenManager {
  private clientId: string;
  private clientSecret: string;
  private tokenUrl: string =
    "https://passport.k8.isw.la/passport/oauth/token?grant_type=client_credentials";
  private cacheKey: string = "interswitch:access_token";
  private refreshInterval: NodeJS.Timeout | null = null;

  constructor(clientId: string, clientSecret: string) {
    this.clientId = clientId;
    this.clientSecret = clientSecret;
  }

  private async generateToken(): Promise<string> {
    try {
      // Ensure proper Base64 encoding without newlines
      const authString = `${this.clientId}:${this.clientSecret}`;
      const authHeader = Buffer.from(authString).toString("base64");
      logger.info("authHeader credentials:", {
        authHeader,
        clientId: this.clientId,
        clientSecret: this.clientSecret,
      });

      const response = await axios.post<InterswitchTokenResponse>(
        this.tokenUrl,
        "",
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Basic ${authHeader}`,
          },
        }
      );

      const { access_token, expires_in } = response.data;
      logger.info("Interswitch access token generated", {
        jti: response.data.jti,
        expires_in,
        access_token,
      });

      await redisClient.set(
        this.cacheKey,
        access_token,
        "EX",
        Math.floor(expires_in * 0.9)
      );

      return access_token;
    } catch (error: any) {
      logger.error("Failed to generate Interswitch access token", {
        error: error.response?.data || error.message,
        status: error.response?.status,
        headers: error.response?.headers,
      });
      throw new Error("Unable to generate access token");
    }
  }

  async getToken(): Promise<string> {
    const cachedToken = await redisClient.get(this.cacheKey);
    if (cachedToken) {
      logger.info("Retrieved Interswitch access token from cache");
      return cachedToken; 
    }

    return this.generateToken();
  }

  startRefresh(): void {
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
    }

    this.refreshInterval = setInterval(async () => {
      try {
        await this.generateToken();
        logger.info("Interswitch access token refreshed");
      } catch (error) {
        logger.error("Failed to refresh Interswitch access token", { error });
      }
    }, 3.5 * 60 * 60 * 1000); 
  }

  stopRefresh(): void {
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
      this.refreshInterval = null;
    }
  }
}
