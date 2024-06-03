import { useState, useEffect } from "react";
import axios from "axios";
import ConfirmationModal from "./ConfirmationModal";
import extractFileName from "../global/extractFileName";
import DeletedNotification from "../Notifications/DeletedNotification";

const useAssignments = (ligjerataId, token, setHasSubmitted) => {
  const [assignments, setAssignments] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [deleteNotification, setDeleteNotification] = useState(false);


  const getAssignments = () => {
    axios
      .get(
        `http://localhost:8080/api/user/assignment/get/ligjerata/${ligjerataId}`,
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

  const createAssignment = (assignment, formData) => {
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
      .then((response) => {
        let pointer = response.data;
        submitFiles(formData, pointer.id);
        getAssignments();
        setShowNotification(true);
        setTimeout(() => {
          setShowNotification(false);
        }, 3000);
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  };

  const submitFiles = (formData, assignmentId) => {
    const folderType = "Assignments";
    axios
      .post(
        `http://localhost:8080/api/professor/assignment/${assignmentId}/upload`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then(() => {
        console.log("Assignment uploaded successfully");
        getAssignments();
      })
      .catch((error) => {
        console.error("Error uploading assignment: ", error);
      });
  };

  const downloadFile = (assignmentId, fileName) => {
    const folderType = "Assignments";

    axios({
      url: `http://localhost:8080/api/storage/${folderType}/${assignmentId}/download/${fileName}`,
      method: "GET",
      responseType: "blob",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", extractFileName(fileName));
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      })
      .catch((error) => {
        console.error("Error downloading file: ", error);
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
        setDeleteNotification(true);
        setTimeout(() => {
          setDeleteNotification(false);
        }, 3000);
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
        `http://localhost:8080/api/professor/assignment/get/submissions`,
        assignemnt,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {});
  };

  const updateAssignment = (assignment, assignmentId, formData) => {
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
        if (formData && formData.has("files")) {
          submitFiles(formData, assignmentId)
          getAssignments(); 


        } else {
          getAssignments(); 
        }
      })
      .catch((error) => {
        console.log("Error updating assignment: " + error);
      });
  };
  const submissionFiles = (formData, assignmentId, submissionId) => {
    axios
      .post(
        `http://localhost:8080/student/${assignmentId}/upload/${submissionId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then(() => {

        console.log("Assignment uploaded successfully");
      })
      .catch((error) => {
        console.error("Error uploading assignment: ", error);
      });
  };

  const submitAssignment = (assignmentId, submission, formData) => {
    axios
      .post(
        `http://localhost:8080/api/user/submit/${assignmentId}`,
        submission,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        submissionFiles(formData, assignmentId, response.data.id);
        setHasSubmitted(true);
        return true;
      })
      .catch((error) => {
        console.log("Error: " + error);
      });
  };

  const updateSubmission = (formData, assignmentId, submission) => {
    axios
      .put(
        `http://localhost:8080/api/user/submit/update/${assignmentId}`,
        submission,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {

        if(formData && formData.has("files")){
          submissionFiles(formData, assignmentId, response.data.id);
        }
        console.log("Update Success");
      })
      .catch((error) => {
        console.log("Error: " + error);
      });
  };

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
    downloadFile,
    showNotification,
    deleteNotification,
  };
};

export default useAssignments;
