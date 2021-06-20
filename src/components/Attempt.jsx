import React, { useState } from 'react';
import { Button, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { useForm, FormProvider } from 'react-hook-form';

import FormInput from '../controls/FormInput';
import { useQueryClient, useMutation, useQuery } from 'react-query';
import api from '../api-client/api';
import UpdateMessage from './UpdateMessage';
import LastAttempts from './LastAttempts';

const Attempt = () => {
  const methods = useForm();
  const {
    handleSubmit,
    formState: { errors: formErrors },
  } = methods;
  const queryClient = useQueryClient();

  const [userAlias, setUserAlias] = useState();

  const { data: attemptResponse, mutate } = useMutation(api.addAttempt, {
    onSuccess: (data) => {
      //console.log('attemptResult: ' + JSON.stringify(data));
      queryClient.invalidateQueries('lastAttempts', { exact: true });
    },
    onError: (error) => {
      alert('there was an error: ' + error.message);
    },
  });
  const user_q = attemptResponse?.user;
  const userAlias_q = user_q?.alias;
  const {
    isLoading,
    isError,
    data: lastAttempts,
    error,
  } = useQuery(
    ['lastAttempts', { userAlias: userAlias_q }],
    api.getLastAttempts,
    {
      refetchOnWindowFocus: false,
      enabled: !!userAlias_q,
    },
  );

  const onFormSubmit = (data) => {
    let challengeData = queryClient.getQueryData('randomChallenge');
    if (challengeData) {
      mutate({
        ...challengeData,
        userAlias: data.alias,
        guess: data.guess,
      });
    }
  };

  const handleNewChallenge = () => {
    queryClient.invalidateQueries('randomChallenge', { exact: true });
  };

  return (
    <div>
      <FormProvider {...methods}>
        <form>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <FormInput
                required
                label="Your alias"
                name="alias"
                errorobj={formErrors.alias}
              />
            </Grid>

            <Grid item xs={6}>
              <FormInput
                required
                label="Your guess"
                type="number"
                name="guess"
                errorobj={formErrors.guess}
              />
            </Grid>
          </Grid>
        </form>
      </FormProvider>
      <br />
      <Grid container alignItems="flex-start" spacing={2}>
        <Grid item>
          <Button
            color="primary"
            variant="contained"
            onClick={handleSubmit(onFormSubmit)}
          >
            Submit Attempt
          </Button>
        </Grid>

        <Grid item>
          <Button
            color="secondary"
            variant="contained"
            onClick={handleNewChallenge}
          >
            New Challenge
          </Button>
        </Grid>
      </Grid>
      {attemptResponse && (
        <UpdateMessage
          message={
            attemptResponse.correct
              ? 'Congratulations! Your guess is correct'
              : 'Oops! Your guess ' +
                attemptResponse.resultAttempt +
                ' is wrong, but keep playing!'
          }
        />
      )}
      {lastAttempts && lastAttempts.length > 0 && (
        <LastAttempts lastAttempts={lastAttempts} />
      )}
    </div>
  );
};

export default Attempt;
