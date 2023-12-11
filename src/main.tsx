import { ReactElement, StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { Wrapper, Status } from '@googlemaps/react-wrapper'

import { ChakraProvider } from '@chakra-ui/react'
import { App } from './App'

const render = (status: Status): ReactElement => {
  if (status === Status.LOADING) return <h3>{status} ..</h3>
  if (status === Status.FAILURE) return <h3>{status} ...</h3>
  return <></>
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <ChakraProvider>
      <Wrapper apiKey={import.meta.env.VITE_MAP_API_KEY} render={render}>
        <App />
      </Wrapper>
    </ChakraProvider>
  </StrictMode>
)
