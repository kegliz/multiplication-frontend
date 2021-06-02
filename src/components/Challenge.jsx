import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import api from '../api-client/api';
import { useQuery } from 'react-query';

const useStyles = makeStyles({
  freeStyle: {
    fontStyle: 'oblique',
    color: 'red',
  },
  multiStyle: {
    color: 'indigo',
  },
});

function useChallenge() {
  return useQuery(
    'randomChallenge',
    async () => {
      const { data } = await api.getRandomChallenge();
      return data;
    },
    { refetchOnWindowFocus: false },
  );
}

function Challenge() {
  const { isLoading, isError, data, error, isFetching } = useChallenge();
  const classes = useStyles();

  return (
    <Grid container spacing={2}>
      {isLoading ? (
        <Grid item xs={12}>
          'Loading...'{' '}
        </Grid>
      ) : isError ? (
        <Grid item xs={12}>
          Error: {error.message}{' '}
        </Grid>
      ) : (
        <Grid item xs={12}>
          <Typography className={classes.freeStyle} variant="h3" align="center">
            Your new challenge is
          </Typography>
          <Multiplication {...data} />

          <div>{isFetching ? 'Background Updating...' : ' '}</div>
        </Grid>
      )}
    </Grid>
  );
}

function Multiplication({ factorA, factorB }) {
  const classes = useStyles();
  return (
    <Typography variant="h2" align="center" className={classes.multiStyle}>
      {factorA} x {factorB}
    </Typography>
  );
}

Multiplication.propTypes = {
  factorA: PropTypes.number.isRequired,
  factorB: PropTypes.number.isRequired,
};

export default Challenge;
