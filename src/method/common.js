import React from "react";
import Spinner from 'react-bootstrap/Spinner'

export const Loader = {
  section_loading: (
    <Spinner size="sm" animation="border" role="status">
      <span className="sr-only">Loading...</span>
    </Spinner>
  ),
};