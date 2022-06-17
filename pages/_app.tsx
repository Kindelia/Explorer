import type { AppProps } from 'next/app'
import Head from 'next/head'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { config } from '@fortawesome/fontawesome-svg-core'

import '@/styles/globals.css'
import '@/styles/utils.css'
import '@/styles/statement.css'
import Navbar from '@/components/Navbar/'

config.autoAddCss = false

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="bg-white dark:bg-black">
      <Navbar />
      <div className="mx-auto max-w-full lg:max-w-4xl p-2 sm:p-5">
        <Head>
          <title>Kind Explorer</title>
          <link rel="shortcut icon" href={process.env.logo} />
        </Head>
        <Component {...pageProps} />
      </div>
    </div>
  )
}

export default MyApp
