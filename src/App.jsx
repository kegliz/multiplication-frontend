import React from 'react';
import styled from 'styled-components';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import Container from '@material-ui/core/Container';

import Challenge from './components/Challenge';
import Attempt from './components/Attempt';
import LastAttempts from './components/LastAttempts';

import { ThemeProvider } from '@material-ui/core/styles';
import theme from './theme';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Container maxWidth="sm">
          <Challenge />
          <Attempt />
          <LastAttempts />
        </Container>
        <ReactQueryDevtools initialIsOpen />
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
