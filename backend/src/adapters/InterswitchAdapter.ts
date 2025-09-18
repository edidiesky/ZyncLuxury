import logger from "../utils/logger";
import {
  AdapterProcesserType,
  IProcessOnlineTransaction,
  PaymentAdapterResultType,
} from "../types";
import axios from "axios";

export const InterswitchAdapter = (secretKey: string): AdapterProcesserType => {
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
    }: IProcessOnlineTransaction): Promise<PaymentAdapterResultType> => {
      try {
        const { data } = await axios.post(
          "https://api.paystack.co/transaction/initialize",
          {
            email,
            amount: amount * 100,
            reference,
            callback_url,
            metadata: {
              name,
              phone,
            },
          },
          {
            headers: {
              Authorization: `Bearer ${secretKey}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (data.status) {
          return {
            message: "Interswitch transaction Id created succesfully",
            transactionId: data.data.reference,
            redirectUrl: data.data.authorization_url,
            success: true,
          };
        } else {
          throw new Error("Error creating a transaction with Interswitch Server");
        }
      } catch (error) {
        logger.error("Failed to create a transaction with Interswitch:", {
          message:
            error instanceof Error
              ? error.message
              : "An unknown Interswitch error did occurred",
          stack:
            error instanceof Error
              ? error.stack
              : "An unknown Interswitch error did occurred",
        });
        return {
          message:
            error instanceof Error
              ? error.message
              : "An unknown Interswitch error did occurred",
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
