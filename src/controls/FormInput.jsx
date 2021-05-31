import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  requiredLabel: {
    color: 'blue',
  },
  normalLabel: {
    color: 'green',
  },
});

function FormInput(props) {
  const { control } = useFormContext();
  const classes = useStyles();

  const { name, label, required, type, errorobj } = props;
  let isError = false;
  let errorMessage = '';
  if (errorobj) {
    isError = true;
    errorMessage = errorobj.message;
  }

  return (
    <Controller
      render={({ field }) => (
        <TextField
          {...field}
          variant="outlined"
          label={label}
          required={required}
          type={type}
          InputLabelProps={{
            className: required ? classes.requiredLabel : classes.normalLabel,
            required: required || false,
          }}
          error={isError}
          helperText={errorMessage}
          fullWidth
        />
      )}
      rules={{ required: required ? name + ' is required' : false }}
      name={name}
      control={control}
      {...props}
    />
  );
}

export default FormInput;
