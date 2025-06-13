import { createGlobalStyle } from "styled-components"
import Router from "./router"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const GlobalStyle = createGlobalStyle`
  body{
    width: 100vw;
    height: 100vh;
    background-color: ${props => props.theme.backgroundColor};
  }
  a{
    text-decoration: none;
  }
`;
const queryClient = new QueryClient()
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyle />
      <Router />
    </QueryClientProvider>
  )
}

export default App
