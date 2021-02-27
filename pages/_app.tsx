import '../styles/globals.css'
import '@fontsource/ibm-plex-sans'

import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
