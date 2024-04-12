import React, { useState, useEffect } from 'react'
import Student from '../components/Student'; 



function home() {
  const [students, setStudent] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/students')
      .then(response => response.json())
      .then(data => setStudent(data))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <>
    <div>
       {students.map(student => (
        <Student key={student.id} student={student}/>
       ))}
    </div>
    </>
  )
}

export default home