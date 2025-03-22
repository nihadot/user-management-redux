import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Provider } from 'react-redux'
import { store } from './redux/store.ts'
import { Toaster } from 'react-hot-toast'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
// const theme = createTheme({
//   palette: {
//     primary: {
//       main: "rgba(222, 222, 222, 1)",
//     },
//     secondary: {
//       main: "rgba(222, 222, 222, 1)"
//     }
//   }
// });

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>

        <Toaster
          position="top-center"
          reverseOrder={false}
        />
        <App />
        {/* <ThemeProvider theme={theme}> */}
        {/* </ThemeProvider> */}
      </LocalizationProvider>

    </Provider>
  </StrictMode>,
)
