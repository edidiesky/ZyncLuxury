import logger from "../utils/logger";
import {
  AdapterProcesserType,
  IProcessOnlineTransaction,
  PaymentAdapterResultType,
} from "../types";
import axios from "axios";

export const FlutterWaveAdapter = (secretKey: string): AdapterProcesserType => {
  const timestamp = Date.now().toString().slice(-4);
  const numericSuffix = Math.floor(Math.random() * 1000000)
    .toString()
    .padStart(6, "0");
  const reference = `${timestamp}${numericSuffix}`;
  return {
    processOnlineTransaction: async ({
      email,
      amount,
      name,
      callback_url,
      phone,
      currency,
    }: IProcessOnlineTransaction): Promise<PaymentAdapterResultType> => {
      try {
        const { data } = await axios.post(
          "https://api.paystack.co/transaction/initialize",
          {
            tx_ref: reference,
            amount,
            currency,
            redirect_url: callback_url,
            customer: {
              email,
              name,
              phonenumber: phone,
            },
            customizations: {
              title: "Zyncluxury Apartment Payment",
              description: "Payment for an Airbnb",
            },
          },
          {
            headers: {
              Authorization: `Bearer ${secretKey}`,
              "Content-Type": "application/json",
            },
          }
        );

        logger.info("Flutterwave payment initiated successfully", {
          transactionId: reference,
          redirectUrl: data.data.link,
        });
        if (data.status === "success" || data.data?.link) {
          return {
            message: "FlutterWave transaction Id created succesfully",
            transactionId: reference,
            redirectUrl: data.data.link,
            success: true,
          };
        } else {
          throw new Error(
            data.message ||
              "Error creating a transaction with FlutterWave Server"
          );
        }
      } catch (error) {
        logger.error("Failed to create a transaction with FlutterWave:", {
          message:
            error instanceof Error
              ? error.message
              : "An unknown FlutterWave error did occurred",
          stack:
            error instanceof Error
              ? error.stack
              : "An unknown FlutterWave error did occurred",
        });
        return {
          message:
            error instanceof Error
              ? error.message
              : "An unknown FlutterWave error did occurred",
          transactionId: "",
          redirectUrl: "",
          success: false,
        };
      }
    },
    processTransferTransaction: async (): Promise<void> => {},
    processRefundTransaction: async (): Promise<void> => {},
  };
};
