import type { AppProps } from 'next/app'
import Head from 'next/head'

import '@kindelia/lib/ui/globals.css'
import { Main } from '@kindelia/lib/ui'
import { ThemeProvider } from 'next-themes'
import Footer from '@kindelia/lib/ui/Footer'
import Navbar from '@kindelia/lib/ui/Navbar/'

const nav = [
  { name: 'Explore', href: '#details', current: false },
  { name: 'Details', href: '#details', current: false },
  { name: 'Roadmap', href: '#roadmap', current: false },
]

const plugins = {
  Searchbar: true,
  ProfileDropdown: false,
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
