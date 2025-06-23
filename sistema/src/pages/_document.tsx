// src/pages/_document.tsx
import { Html, Head, Main, NextScript } from "next/document";
import {
  DocumentProps,
  DocumentContext,
  DocumentInitialProps,
} from "next/document";
import Document from "next/document";

class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="pt-BR">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
