import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { ThemeProvider } from 'styled-components'
import { theme } from './theme.ts'
import { Reset } from 'styled-reset'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <Reset />
      <App />
    </ThemeProvider>
  </StrictMode>,
)
