import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { ThemeProvider } from 'next-themes'
import type { AppProps } from 'next/app'
import Head from 'next/head'

import { Main } from 'kindelia'
import Footer from 'kindelia/Footer'
import Navbar from 'kindelia/Navbar'
import 'kindelia/globals.css'

import '@/styles/utils.css'

config.autoAddCss = false

const nav = [
  { name: 'Interact', href: '/interact', current: false },
  { name: 'Blocks', href: '/blocks', current: false },
  { name: 'Functions', href: '/functions', current: false },
]

const plugins = {
  Searchbar: true,
  ProfileDropdown: true,
  SelectNode: true,
  ToggleTheme: true,
  ViewNotification: false,
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <Navbar nav={nav} plugins={plugins} />
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
