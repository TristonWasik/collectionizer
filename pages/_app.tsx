import "../styles/globals.css";
import type { AppProps } from "next/app";
import { NextUIProvider } from "@nextui-org/react";
import { useAckee } from "./hooks/useAckee";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  useAckee(
    router.pathname,
    {
      server: "https://analytics.cap.elfinslayer.io",
      domainId: "6c742ae0-9f87-4b28-a350-a3a8e45d787d",
    },
    {
      detailed: true,
      ignoreLocalhost: false,
      ignoreOwnVisits: false,
    }
  );
  return (
    <NextUIProvider>
      <Component {...pageProps} />
    </NextUIProvider>
  );
}

export default MyApp;
