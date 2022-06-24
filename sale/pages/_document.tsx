import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="shortcut icon" href="/kindelia_icon.svg" />
        </Head>
        <body className="bg-bg-light dark:bg-bg-dark text-font-light dark:text-font-dark">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
