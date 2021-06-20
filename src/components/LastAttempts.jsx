import React from 'react';
import { Grid } from '@material-ui/core';

const LastAttempts = ({ lastAttempts }) => {
  return (
    <Grid container spacing={2}>
      <Grid item>
        <table>
          <thead>
            <tr>
              <th>Challenge</th>
              <th>Your guess</th>
              <th>Correct</th>
            </tr>
          </thead>
          <tbody>
            {lastAttempts.map((a) => (
              <tr key={a.id} style={{ color: a.correct ? 'green' : 'red' }}>
                <td>
                  {a.factorA} x {a.factorB}
                </td>
                <td>{a.resultAttempt}</td>
                <td>
                  {a.correct
                    ? 'Correct'
                    : 'Incorrect (' + a.factorA * a.factorB + ')'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Grid>
    </Grid>
  );
};

export default LastAttempts;
