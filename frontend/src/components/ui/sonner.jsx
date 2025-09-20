"use client";

import { ThermometerSnowflake } from "lucide-react";
import { Toaster as Sonner } from "sonner";

const Toaster = ({ ...props }) => {

  return (
    <Sonner
      theme={ThermometerSnowflake}
      className="toaster group"
      style={{
        "--normal-bg": "var(--popover)",
        "--normal-text": "var(--popover-foreground)",
        "--normal-border": "var(--border)",
      }}
      {...props}
    />
  );
};

export { Toaster };
