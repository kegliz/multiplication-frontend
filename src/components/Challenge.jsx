import React from 'react';
import Typography from '@material-ui/core/Typography';
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
    <div>
      {isLoading ? (
        'Loading...'
      ) : isError ? (
        <span>Error: {error.message}</span>
      ) : (
        <>
          <div>
            <Typography
              className={classes.freeStyle}
              variant="h3"
              align="center"
            >
              Your new challenge is
            </Typography>
            <Multiplication {...data} />
          </div>
          <div>{isFetching ? 'Background Updating...' : ' '}</div>
        </>
      )}
    </div>
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
