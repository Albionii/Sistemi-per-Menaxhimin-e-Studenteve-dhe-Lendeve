import React from 'react'

function Student({student}) {
  return (
    <div className='flex gap-2'>
        <h2>{student.id}</h2>
        <h3>{student.name}</h3>
        <h3>{student.surname}</h3>
        <h3>{student.gender}</h3>
    </div>
  );
}

export default Student