import { useState, useEffect } from "react";
import axios from "axios";

const useTranskriptaData = (token) => {
  const [mesatarja, setMesatarja] = useState(0);
  const [ects, setEcts] = useState(0);
  const [semester, setSemester] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const transkriptaResponse = await axios.get(`http://localhost:8080/student/transkripta`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMesatarja(transkriptaResponse.data.mesatarja);

        const ectsResponse = await axios.get(`http://localhost:8080/student/ects`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setEcts(ectsResponse.data);

        const semesterResponse = await axios.get(`http://localhost:8080/student/semestri`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const semesterName = semesterResponse.data.semester.name
        const semesterNumber = semesterName.replace(/^\D+/g, '')
        setSemester(semesterNumber)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [token]);

  return { mesatarja, ects, semester };
};

export default useTranskriptaData;
