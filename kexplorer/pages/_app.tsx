import type { AppProps } from 'next/app'
import Head from 'next/head'
import { ThemeProvider } from 'next-themes'
import Navbar from '@kindelia/lib/ui/Navbar/'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import '@kindelia/lib/ui/globals.css'
import '@/styles/utils.css'
import { Main } from '@kindelia/lib/ui'
import Footer from '@kindelia/lib/ui/Footer'

config.autoAddCss = false

const nav = [
  { name: 'Interact', href: '/interact', current: false },
  { name: 'Blocks', href: '/blocks', current: false },
  { name: 'Functions', href: '/functions', current: false },
]

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <Navbar nav={nav} />
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
