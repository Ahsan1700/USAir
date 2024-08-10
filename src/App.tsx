import './App.css';
import { CssBaseline, Container, createTheme, ThemeProvider } from '@mui/material';
import Header from './components/Header';
import Main from './components/Main';

const App = () => {
  const theme = createTheme({
    typography: {
      fontFamily: [
        'Barlow', 
        'sans-serif'
      ].join(','),
    }
  });

  return (
    <div className='App'>
      <CssBaseline/>
      <ThemeProvider theme={theme}>
        <Container maxWidth='sm'>
          <Header/>
          <Main/>
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default App;
