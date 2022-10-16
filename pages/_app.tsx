import "../styles/globals.css";
import type { AppProps } from "next/app";
import { NextUIProvider } from "@nextui-org/react";
import * as ackeeTracker from "ackee-tracker";
import { useEffect } from "react";

export const ackeeInstance = ackeeTracker.create(
  "https://analytics.cap.elfinslayer.io",
  {
    detailed: true,
    ignoreLocalhost: true,
    ignoreOwnVisits: false,
  }
);

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const { stop } = ackeeInstance.record(
        "6c742ae0-9f87-4b28-a350-a3a8e45d787d",
        {
          siteLocation: window.location.href,
          siteReferrer: document.referrer,
        }
      );

      return () => {
        stop();
      };
    }
  }, []);

  return (
    <NextUIProvider>
      <Component {...pageProps} />
    </NextUIProvider>
  );
}

export default MyApp;
