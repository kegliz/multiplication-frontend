import { Grid, Paper, Typography } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 500,
  },
}));

function UpdateMessage({ message }) {
  const classes = useStyles();

  return (
    <Grid container spacing={2}>
      <Grid item>
        <Paper className={classes.paper}>
          <Typography variant="h5" align="center">
            {message}
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default UpdateMessage;
