import React, { useEffect } from 'react'
import axios from 'axios';
import { useState } from 'react';

const useMateriali = (ligjerataId, token) => {
  const [materiali, setMateriali] = useState([]);
  
  const getMateriali = () => {
    axios
      .get(
        `http://localhost:8080/api/professor/materiali/get/${ligjerataId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setMateriali(response.data);
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  };

  const createMaterial = (material) => {
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
      .then(() => {
        getMateriali();
      })
      .catch((error) => {
        console.error("Error: ", error);
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
      })
      .catch((error) => {
        console.log("Error: " + error);
      });
  }

  const updateMaterial = (materialId, update) => {
    axios
      .put(`http://localhost:8080/api/professor/materiali/update`, update,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        getMateriali();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    getMateriali();
  }, [ligjerataId])

  return {
    materiali,
    createMaterial,
    deleteMaterial, 
    updateMaterial
  };
};

export default useMateriali;