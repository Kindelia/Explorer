import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Menu from '../components/Menu'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="mx-auto max-w-full lg:max-w-4xl py-5 px-5">
      <Menu />
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
