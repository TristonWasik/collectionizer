import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";
import { CssBaseline } from "@nextui-org/react";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return {
      ...initialProps,
      styles: [<>{initialProps.styles}</>],
    };
  }

  render() {
    return (
      <Html lang="en">
        <Head>{CssBaseline.flush()}</Head>
        <body>
          <Main />
          <NextScript />
          <script
            async
            src="https://analytics.cap.elfinslayer.io/tracker.js"
            data-ackee-server="https://analytics.cap.elfinslayer.io"
            data-ackee-domain-id="6c742ae0-9f87-4b28-a350-a3a8e45d787d"
          ></script>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
