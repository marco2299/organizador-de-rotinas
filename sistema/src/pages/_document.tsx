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
          <div
            style={{
              color: "#0A090C",
              fontSize: 23,
              fontFamily: "Inter",
              fontWeight: "700",
              textAlign: "center",
              padding: 15,
            }}
          >
            Olá, Mundo!
          </div>
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
