import React from 'react';
import { Alert, AlertTitle } from '@material-ui/lab';
import { Fade, ClickAwayListener } from '@material-ui/core';

export default function PopUp({ showAlert, handleAlert }) {
  return (
    <React.Fragment>
      <ClickAwayListener onClickAway={() => handleAlert()}>
        <Fade in={showAlert} timeout={600}>
          <Alert onClose={() => handleAlert()} severity='success'>
            <AlertTitle>Success</AlertTitle>
            Todo was successfully added
          </Alert>
        </Fade>
      </ClickAwayListener>
    </React.Fragment>
  );
}
