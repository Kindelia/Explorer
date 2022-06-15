import '../styles/globals.css'
import '../styles/statement.css'
import '../styles/utils.css'

import type { AppProps } from 'next/app'
import Head from 'next/head'
import Navigation from '@/components/Navigation'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Navigation />
      <div className="mx-auto max-w-full lg:max-w-4xl p-2 sm:p-5">
        <Head>
          <title>Kind Explorer</title>
          <link
            rel="shortcut icon"
            href="https://kindelia.org/static/images/kindelia_icon.svg"
          />
        </Head>
        <Component {...pageProps} />
      </div>
    </>
  )
}

export default MyApp
