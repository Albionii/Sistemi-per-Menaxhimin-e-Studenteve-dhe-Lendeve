import React, { useState, useEffect } from "react";
import { Button, Box, CircularProgress  } from "@mui/material";
import axios from "axios";
import UpdateSubmission from "./UpdateSubmission";
import Modal from "@mui/material/Modal";
import { OrbitProgress } from "react-loading-indicators";


const HasSubmission = ({
  token,
  assignmentId,
  onSubmit,
  updateSubmission,
  closeEditSubmission,
  submissionData,
  editSubmission,
  viewAssignment,
  onUpdate,
  hasSubmitted,
  setHasSubmitted,
}) => {

  const [loading, setLoading] = useState(true);

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
        } else {
          setHasSubmitted(false);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error: " + error);
        setLoading(false);
      });
  }, [assignmentId, token, onSubmit]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" width="100px">
        <CircularProgress />
      </Box>
    );
  }

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
      <Modal
        open={editSubmission}
        onClose={closeEditSubmission}
        aria-labelledby="Create Submission"
        aria-describedby="Assignment Submission"
      >
        <Box sx={style}>
          <UpdateSubmission
            onSubmit={updateSubmission}
            onClose={closeEditSubmission}
            initialData={submissionData}
            ligjerataId={viewAssignment.id}
            assignmentId={viewAssignment.id}
            token={token}
            setHasSubmitted={setHasSubmitted}
          />
        </Box>
      </Modal>
    </Box>
  );
};

export default HasSubmission;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
