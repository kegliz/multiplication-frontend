import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import api from '../api-client/api';
import { useQuery } from 'react-query';

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

  return (
    <div>
      {isLoading ? (
        'Loading...'
      ) : isError ? (
        <span>Error: {error.message}</span>
      ) : (
        <>
          <div>
            <h3>Your new challenge is</h3>
            <Multiplication {...data} />
          </div>
          <div>{isFetching ? 'Background Updating...' : ' '}</div>
        </>
      )}
    </div>
  );
}

function Multiplication({ factorA, factorB }) {
  return (
    <h1>
      {factorA} x {factorB}
    </h1>
  );
}

Multiplication.propTypes = {
  factorA: PropTypes.number.isRequired,
  factorB: PropTypes.number.isRequired,
};

export default Challenge;
