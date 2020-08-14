import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleAlert } from '../redux/actions/alertActions';
import { Alert, AlertTitle } from '@material-ui/lab';
import { Fade, ClickAwayListener } from '@material-ui/core';

export default function PopUp() {
  const dispatch = useDispatch();
  const isAlert = useSelector((state) => state.alert);
  return (
    <React.Fragment>
      <ClickAwayListener onClickAway={() => dispatch(toggleAlert())}>
        <Fade in={isAlert} timeout={600}>
          <Alert onClose={() => dispatch(toggleAlert())} severity='success'>
            <AlertTitle>Success</AlertTitle>
            Todo was successfully added
          </Alert>
        </Fade>
      </ClickAwayListener>
    </React.Fragment>
  );
}
