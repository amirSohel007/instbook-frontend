import React from "react";
import Spinner from 'react-bootstrap/Spinner'

export const Loader = {
  section_loading: (
    <Spinner size="sm" animation="border" role="status">
      <span className="sr-only">Loading...</span>
    </Spinner>
  ),
};

export const successMessage = () => {
  return {
    appearance: 'success',
    autoDismiss: true,
    autoDismissTimeout: 2000
  }
}

export const errorMessage = () => {
  return {
    appearance: 'error',
    autoDismiss: true,
    autoDismissTimeout: 2000
  }
}