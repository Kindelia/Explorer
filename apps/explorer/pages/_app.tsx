import type { AppProps } from 'next/app'
import Head from 'next/head'
import { ThemeProvider } from 'next-themes'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'

import 'ui/globals.css'
import { Main } from 'ui'
import Navbar from 'ui/Navbar'
import Footer from 'ui/Footer'

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
