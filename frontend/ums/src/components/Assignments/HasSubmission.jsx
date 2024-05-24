import React, { useState, useEffect } from "react";
import { Button, Box } from "@mui/material";
import axios from "axios";

const HasSubmission = ({ token, assignmentId, onSubmit, onUpdate }) => {
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/user/get/submission/${assignmentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.data) {
          setHasSubmitted(true);
        }
      })
      .catch((error) => {
        console.log("Error: " + error);
      });
  }, [assignmentId, token]);

  return (
    <Box>
      {hasSubmitted ? (
        <Button
          variant="contained"
          color="info"
          onClick={() => {
            onUpdate();
          }}
        >
          View Submission
        </Button>
      ) : (
        <Button
          variant="contained"
          color="success"
          onClick={() => {
            onSubmit();
          }}
        >
          Submit
        </Button>
      )}
    </Box>
  );
};

export default HasSubmission;
