import { useState, useEffect } from "react";
import axios from "axios";
import ConfirmationModal from "./ConfirmationModal";

const useAssignments = (ligjerataId, token) => {
  const [assignments, setAssignments] = useState([]);

  const getAssignments = () => {
    axios
      .get(
        `http://localhost:8080/api/professor/assignment/get/ligjerata/${ligjerataId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setAssignments(response.data);
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  };

  const createAssignment = (assignment) => {
    axios
      .post(
        `http://localhost:8080/api/professor/assignment/create/${ligjerataId}`,
        assignment,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        getAssignments();
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  };

  const deleteAssignment = (assignmentId, callback) => {
    axios
      .delete(
        `http://localhost:8080/api/professor/assignment/delete/${assignmentId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        getAssignments();
        if (callback) {
          callback();
        }
      })
      .catch((error) => {
        console.log("Error: " + error);
      });
  };

  const getAllSubmissions = (assignemnt) => {
    axios
      .get(
        `http://localhost:8080/api/professor/assignment/get/submissions`,  assignemnt, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ).then((response) => {
        
      })
  }

  const updateAssignment = (assignment, assignmentId) => {
    axios
      .put(
        `http://localhost:8080/api/professor/assignment/update/${assignmentId}`,
        assignment,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        getAssignments();
      })
      .catch((error) => {
        console.log("Error: " + error);
      });
  };

  const submitAssignment = (assignmentId,submission) => {
    axios
      .post(
        `http://localhost:8080/api/user/submit/${assignmentId}`,
        submission,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      )
      .then(() => {
        console.log("success");
      })
      .catch((error) => {
        console.log("Error: " + error);
      })
  }

  const updateSubmission = (assignmentId, submission) => {
    axios
      .put(
        `http://localhost:8080/api/user/submit/update/${assignmentId}`,
        submission,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }        
      )
      .then(()=> {
        console.log("Update Success");
      })
      .catch((error) => {
        console.log("Error: " + error);
      })
  }



  useEffect(() => {
    getAssignments();
  }, [ligjerataId]);

  return {
    assignments,
    createAssignment,
    deleteAssignment,
    updateAssignment,
    submitAssignment,
    updateSubmission,
  };
};

export default useAssignments;
