import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import extractFileName from "../global/extractFileName";

const useMateriali = (ligjerataId, token) => {
  const [materiali, setMateriali] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [deleteNotification, setDeleteNotification] = useState(false);


  const getMateriali = () => {
    axios
      .get(`http://localhost:8080/api/user/materiali/get/${ligjerataId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setMateriali(response.data);
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  };

  const createMaterial = (material, formData) => {
    axios
      .post(
        `http://localhost:8080/api/professor/materiali/create/${ligjerataId}`,
        material,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        submitFiles(formData, response.data.id);
        getMateriali();
        setShowNotification(true);
        setTimeout(() => {
          setShowNotification(false);
        }, 3000);
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  };

  const submitFiles = (formData, materialId) => {
    axios
      .post(
        `http://localhost:8080/api/professor/materiali/${materialId}/upload`,
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
        getMateriali();
      })
      .catch((error) => {
        console.error("Error uploading assignment: ", error);
      });
  };

  const deleteMaterial = (materialId) => {
    axios
      .delete(
        `http://localhost:8080/api/professor/materiali/delete/${materialId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        getMateriali();
        setDeleteNotification(true);
        setTimeout(() => {
          setDeleteNotification(false);
        }, 3000);
      })
      .catch((error) => {
        console.log("Error: " + error);
      });
  };

  const updateMaterial = (materialId, update, formData) => {
    axios
      .put(`http://localhost:8080/api/professor/materiali/update`, update, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        if (formData && formData.has("files")) {
          submitFiles(formData, materialId);
          getMateriali();
        } else {
          getMateriali();
        }

      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const downloadFile = (assignmentId, fileName) => {
    const folderType = "Materiali";

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

  useEffect(() => {
    getMateriali();
  }, [ligjerataId]);

  return {
    materiali,
    createMaterial,
    deleteMaterial,
    updateMaterial,
    downloadFile,
    showNotification,
    deleteNotification
  };
};

export default useMateriali;
