import '../styles/globals.css'
import '@fontsource/ibm-plex-sans'
import '@fontsource/ibm-plex-sans/500.css'

import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
