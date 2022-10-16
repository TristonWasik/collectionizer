import "../styles/globals.css";
import type { AppProps } from "next/app";
import { NextUIProvider } from "@nextui-org/react";
import * as ackeeTracker from "ackee-tracker";
import { useEffect } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const { stop } = ackeeTracker
      .create("https://analytics.cap.elfinslayer.io", {
        detailed: true,
        ignoreLocalhost: true,
        ignoreOwnVisits: false,
      })
      .record("6c742ae0-9f87-4b28-a350-a3a8e45d787d");

    return () => {
      stop();
    };
  }, []);

  return (
    <NextUIProvider>
      <Component {...pageProps} />
    </NextUIProvider>
  );
}

export default MyApp;
