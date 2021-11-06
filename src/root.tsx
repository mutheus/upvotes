import { createGlobalStyle } from 'styled-components'
import { App } from 'app'
import 'normalize-css'

const GlobalStyle = createGlobalStyle`
  html {
    font-size: 100%;
    box-sizing: border-box;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  body {
    font-family: system-ui, sans-serif;
  }
`

export function Root () {
  return (
    <>
      <GlobalStyle />
      <App />
    </>
  )
}
