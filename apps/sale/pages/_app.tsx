import type { AppProps } from 'next/app'
import Head from 'next/head'
import { ThemeProvider } from 'next-themes'

import 'ui/globals.css'
import { Main } from 'ui'
import Footer from 'ui/Footer'
import Navbar from 'ui/Navbar/'

import { explorer_url } from '@/lib/config'

const nav = [
  { name: 'Explore', href: explorer_url, current: false },
  { name: 'Details', href: '#details', current: false },
  { name: 'Roadmap', href: '#roadmap', current: false },
]

const plugins = {
  Searchbar: false,
  ProfileDropdown: false,
  SelectNode: false,
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
