import React, { useState } from 'react';
import { Button, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { useForm, FormProvider } from 'react-hook-form';

import FormInput from '../controls/FormInput';
import { useQueryClient, useMutation } from 'react-query';
import api from '../api-client/api';
import UpdateMessage from './UpdateMessage';

import { useInput } from './util';

const useStyles = makeStyles((theme) => ({
  buttongroup: {
    spacing: '10px',
  },
}));

const addAttempt = async (newAttempt) => {
  const { data } = await api.addAttempt(newAttempt);
  return data;
};

function Attempt() {
  const methods = useForm();
  const {
    handleSubmit,
    formState: { errors: formErrors },
  } = methods;
  const queryClient = useQueryClient();

  const {
    data: attemptResponse,
    isLoading,
    mutate,
  } = useMutation(addAttempt, {
    onSuccess: (data) => {
      console.log('attemptResult: ' + JSON.stringify(data));
    },
    onError: (error) => {
      alert('there was an error: ' + error.message);
    },
    onSettled: () => {
      //queryClient.invalidateQueries('create')
    },
  });

  const classes = useStyles();

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
  const alma = true;
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
      <UpdateMessage
        message={
          attemptResponse
            ? attemptResponse.correct
              ? 'Congratulations! Your guess is correct'
              : 'Oops! Your guess ' +
                attemptResponse.resultAttempt +
                ' is wrong, but keep playing!'
            : 'unknown'
        }
      />
    </div>
  );
}

export default Attempt;
