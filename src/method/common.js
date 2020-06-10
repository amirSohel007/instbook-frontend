import React from "react";
import Spinner from 'react-bootstrap/Spinner'

export const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("authToken")}`,
};

    export const Loader = {
      section_loading: (
        <Spinner size="sm" animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      ),
    };