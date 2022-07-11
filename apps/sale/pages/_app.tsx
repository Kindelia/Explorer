import { ThemeProvider } from 'next-themes'
import type { AppProps } from 'next/app'
import Head from 'next/head'

import 'kindelia/globals.css'
import { explorer_url } from '@/lib/config'
import { Main } from 'kindelia'
import Footer from 'kindelia/Footer'
import Navbar from 'kindelia/Navbar/'

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
