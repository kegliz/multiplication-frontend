import React from 'react';
import styled from 'styled-components';
import Challenge from './components/Challenge';
import Attempt from './components/Attempt';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import Container from '@material-ui/core/Container';

import { ThemeProvider } from '@material-ui/core/styles';
import theme from './theme';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Container maxWidth="sm">
          <div className="App">
            <Challenge />
            <Attempt />
          </div>
        </Container>
        <ReactQueryDevtools initialIsOpen />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
