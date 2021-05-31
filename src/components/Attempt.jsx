import React from 'react';
import { Button, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { useForm, FormProvider } from 'react-hook-form';

import FormInput from '../controls/FormInput';
import { useQueryClient } from 'react-query';

import { useInput } from './util';

const useStyles = makeStyles((theme) => ({
  buttongroup: {
    spacing: '10px',
  },
}));

function Attempt() {
  const methods = useForm();
  const {
    handleSubmit,
    formState: { errors },
  } = methods;
  const queryClient = useQueryClient();
  const classes = useStyles();

  const onFormSubmit = (data) => {
    alert(data.alias + ' ' + data.guess);
    console.log(data);
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
                errorobj={errors.alias}
              />
            </Grid>

            <Grid item xs={6}>
              <FormInput
                required
                label="Your guess"
                type="number"
                name="guess"
                errorobj={errors.guess}
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
            Submit
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
    </div>
  );
}

export default Attempt;
