import type { AppProps } from 'next/app'
import Head from 'next/head'

import '@kindelia/lib/ui/globals.css'
import { Main } from '@kindelia/lib/ui'
import { Header } from '@/components/Header'
import { ThemeProvider } from 'next-themes'
import Footer from '@kindelia/lib/ui/Footer'
import Navbar from '@kindelia/lib/ui/Navbar/index2'


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <Navbar />
      <Head>
        <title>Kind Explorer</title>
      </Head>
      <Main>
        <Component {...pageProps} />
      </Main>
      <Footer />
    </ThemeProvider>
  )
}

export default MyApp
