  import Swal from 'sweetalert2'

  const BASE_URL = `http://localhost:8080`;

  //Studenti

  export const errorAlert = (message) => {
    return (
      Swal.fire({
        icon: "error",
        title: message,
      })
    )
  }

  export const deleteStudentByID = () => {
    const url = BASE_URL + `/student/delete/`;
    return [url, "Studenti nuk është fshirë!"];
  }
  
  export const createStudent = () => {
    const url = BASE_URL + `/auth/signup`;
    return [url, "Studenti nuk është shtuar!"];
  }

  export const getAllStudents = () => {
    const url = BASE_URL + `/student/getAllStudents`;
    return [url, "Gabim në marrjen e studentëve!"];
  }

  export const getStudentByID = () => {
    const url = BASE_URL + `/student/getStudent/`;
    return [url, "Gabim në marrjen e studentit!"];
  }

  export const updateStudentByID = () => {
    const url = BASE_URL + `/student/update/`;
    return [url, "Gabim në përditësimin e studentit!"];
  }

  //Profesori
  
  export const deleteProfessorByID = () => {
    const url = BASE_URL + `/professor/delete/`;
    return [url, "Profesori nuk është fshirë!"];
  }
  
  export const createProfessor = () => {
    const url = BASE_URL + `/professor/create`;
    return [url, "Profesori nuk është shtuar!"];
  }

  export const getAllProfessors = () => {
    const url = BASE_URL + `/professor`;
    return [url, "Gabim në marrjen e profesoreve!"];
  }

  export const getProfessorByID = () => {
    const url = BASE_URL + `/professor/getProfessor/`;
    return [url, "Gabim në marrjen e profesorit!"];
  }

  export const updateProfessorByID = () => {
    const url = BASE_URL + `/professor/update/`;
    return [url, "Gabim në përditësimin e profesorit!"];
  }


  //Ligjeratat

  export const deleteLigjerataByID = () => {
    const url = BASE_URL + `/professorLenda/delete/`;
    return [url, "Gabim në fshirjen e ligjeratës!"];
  }

  export const createLigjerata = () => {
    const url = BASE_URL + `/professorLenda/createLigjerata`;
    return [url, "Gabim në krijimin e ligjeratës!"];
  }

  export const getAllLigjeratat = () => {
    const url = BASE_URL + `/professorLenda`;
    return [url,"Gabim në marrjen e ligjeratave!"];
  }
  
  export const getLigjerataByID = () => {
    const url = BASE_URL + `/professorLenda/`;
    return [url, "Gabim në marrjen e ligjeratës!"];
  }

  export const updateLigjerataByID = () => {
    const url = BASE_URL + `/professorLenda/update/`;
    return [url, "Gabim në përditësimin e ligjeratës!"];
  }

  // Lenda

  export const deleteLendaByID = () => {
    const url = BASE_URL + `/lenda/delete/`;
    return [url, "Gabim në fshirjen e lëndës!"];
  }

  export const createLenda = () => {
    const url = BASE_URL + `/lenda/create`;
    return [url, "Gabim në krijimin e lëndës!"];
  }

  export const getAllLendet = () => {
    const url = BASE_URL + `/lenda`;
    return [url, "Gabim në marrjen e lëndëve!"];
  }
  
  export const getLendaByID = () => {
    const url = BASE_URL + `/lenda/`;
    return [url, "Gabim në marrjen e lëndës!"];
  }

  export const updateLendaByID = () => {
    const url = BASE_URL + `/lenda/update/`;
    return [url, "Gabim në përditësimin e lëndës!"];
  }

  // Provimi

  export const deleteProvimiByID = () => {
    const url = BASE_URL + `/api/admin/provimi/delete/`;
    return [url, "Gabim në fshirjen e provimit!"];
  }

  export const createProvimi = () => {
    const url = BASE_URL + `/api/admin/provimi/create`;
    return [url, "Gabim në krijimin e provimit!"];
  }

  export const getAllProvimet = () => {
    const url = BASE_URL + `/api/admin/provimi`;
    return [url, "Gabim në marrjen e provimeve!"];
  }
  
  export const getProvimiByID = () => {
    const url = BASE_URL + `/api/admin/provimi/`;
    return [url, "Gabim në marrjen e provimit!"];
  }

  export const updateProvimiByID = () => {
    const url = BASE_URL + `/api/admin/provimi/update/`;
    return [url, "Gabim në përditësimin e provimit!"];
  }

  //Sallat

  export const deleteSallaByID = () => {
    const url = BASE_URL + `/salla/delete/`;
    return [url, "Gabim në fshirjen e salles!"];
  }

  export const createSalla = () => {
    const url = BASE_URL + `/salla/create`;
    return [url, "Gabim në krijimin e salles!"];
  }

  export const getAllSallat = () => {
    const url = BASE_URL + `/salla`;
    return [url, "Gabim në marrjen e sallave!"];
  }
  
  export const getSallaByID = () => {
    const url = BASE_URL + `/salla/`;
    return [url, "Gabim në marrjen e salles!"];
  }

  export const updateSallaByID = () => {
    const url = BASE_URL + `/salla/update/`;
    return [url, "Gabim në përditësimin e salles!"];
  }


  //Users


  export const getAllUsers = () => {
    const url = BASE_URL + `/api/user`;
    return [url,"Gabim në marrjen e userave!"];
  }
 
  export const updateUserByID = () => {
    const url = BASE_URL + `/api/user/updateRole/`;
    return [url, "Gabim në përditësimin e ligjeratës!"];
  }

  //Paraqitja Provimit 

  export const createParaqitjaProvimit = () => {
    const url = BASE_URL + `/student/paraqitjaProvimit/create`;
    return [url, "Gabim në paraqitjen e provimit!"];
  }

  
  export const getAllParaqitjaProvimeve = () => {
    const url = BASE_URL + `/student/paraqitjaProvimit`;
    return [url, "Gabim në marrjen e paraqitjes së provimeve!"];
  }

  export const getAllParaqitjaProvimeveByID = () => {
    const url = BASE_URL + `/student/paraqitjaProvimit/`;
    return [url, "Gabim në marrjen e paraqitjes së provimeve!"];
  }

  
  export const deleteParaqitjaProvimeveByID = () => {
    const url = BASE_URL + `/student/paraqitjaProvimit/delete/`;
    return [url, "Gabim në fshirjen e paraqitjes së provimit!"];
  }
  




  // departamenti




  export const deleteDepartamentiByID = () => {
    const url = BASE_URL + `/departamenti/delete/`;
    return [url, "Gabim në fshirjen e Departamentit!"];
  }

  export const createDepartamenti = () => {
    const url = BASE_URL + `/departamenti/create`;
    return [url, "Gabim në krijimin e Departamentit!"];
  }

  export const getAllDepartamenti = () => {
    const url = BASE_URL + `/departamenti`;
    return [url, "Gabim në marrjen e Departamentit!"];
  }
  
  export const getDepartamentiByID = () => {
    const url = BASE_URL + `/departamenti/`;
    return [url, "Gabim në marrjen e Departamentit!"];
  }

  export const updateDepartamentiByID = () => {
    const url = BASE_URL + `/departamenti/update/`;
    return [url, "Gabim në përditësimin e Departamentit"];
  }

  

//fakultetet


export const getAllFakulteti = () => {
  const url = BASE_URL + `/fakulteti`;
  return [url, "Gabim në marrjen e Fakultetit!"];
}
export const deleteFakultetiById = () => {
  const url = BASE_URL + `/fakulteti/delete/`;
    return [url, "Gabim në fshirjen e Fakultetit!"];
}
export const createFakulteti = () => {
  const url = BASE_URL + `/fakulteti/create`;
  return [url, "Gabim në krijimin e Fakultetit!"];
}
export const getFakultetiById = () => {
  const url = BASE_URL + `/fakulteti/`;
  return [url, "Gabim në marrjen e Fakultetit!"];
}
export const updateFakultetiByID = () => {
  const url = BASE_URL + `/fakulteti/update/`;
  return [url, "Gabim në përditësimin e Fakultetit!"];
}



// Semester

export const getAllSemester = () => {
  const url = BASE_URL + `/api/admin/semesters`;
  return [url, "Gabim në marrjen e Semestrit!"];
}
export const deleteSemesterById = () => {
  const url = BASE_URL + `/api/admin/semester/delete/`;
    return [url, "Gabim në fshirjen e Semestrit!"];
}
export const createSemester = () => {
  const url = BASE_URL + `/api/admin/semester/create`;
  return [url, "Gabim në krijimin e Semestrit!"];
}
export const getSemesterById = () => {
  const url = BASE_URL + `/api/admin/semester/get/`;
  return [url, "Gabim në marrjen e semestrit!"];
}
export const updateSemesterById = () => {
  const url = BASE_URL + `/api/admin/semester/update/`;
  return [url, "Gabim në përditësimin e semestrit!"];
}


// StudentProvimi

export const getAllStudentProvimet = () => {
  const url = BASE_URL + `/student`;
  return [url, "Gabim në marrjen e provimeve të paraqitura!"];
}


export const getAllLigjeratatByProfessorID = () => {
  const url = BASE_URL + `/professor/provimetOfProfessor`;
  return [url, "Gabim në marrjen e provimeve të paraqitura!"];
}

export const deleteStudentProvimiById = () => {
  const url = BASE_URL + `/student/delete/`;
    return [url, "Gabim në fshirjen e Semestrit!"];
}
export const createStudentProvimi = () => {
  const url = BASE_URL + `/student/create`;
  return [url, "Gabim në krijimin e Semestrit!"];
}
export const getStudentProvimiById = () => {
  const url = BASE_URL + `/student/get/`;
  return [url, "Gabim në marrjen e semestrit!"];
}
export const updateStudentProvimiById = () => {
  const url = BASE_URL + `/student/update/`;
  return [url, "Gabim në përditësimin e semestrit!"];
}

//Grupi

export const getAllGrupet = () => {
  const url = BASE_URL + `/grupi/get`
  return [url, "Gabim ne marrjen e grupeve!"];
}

export const getGrupiById = () => {
  const url = BASE_URL + `/grupi/`
  return [url, "Gabim ne marrjen e grupit!"];
}

export const updateGrupiById = () => {
  const url = BASE_URL + `/grupi/update/`
  return [url, "Gabim ne perditesimin e grupit"];
}

export const deleteGrupiById = () => {
  const url = BASE_URL + `/grupi/delete/`
  return [url, "Gabim ne fshirjen e grupit"];
}

export const createGrupi = () => {
  const url = BASE_URL + `/grupi/create`
  return [url, "Gabim ne krijimin e grupit"];
}

//Orari
export const createOrari = () => {
  const url = BASE_URL + `/orari/create`
  return [url, "Gabim ne krijimin e orarit"];
}

export const getOrariById = () => {
  const url = BASE_URL + `/orari/`
  return [url, "Gabim ne marrjen e orarit!"];
}

export const updateOrariById = () => {
  const url = BASE_URL +`/orari/update/`
  return [url, "Gabim ne perditesimin e orari"];
}

export const deleteOrariById = () => {
  const url = BASE_URL + `/orari/delete/`
  return [url, "Gabim ne fshirjen e orari"];
}

export const getAllOraret = () => {
  const url = BASE_URL + `/orari/get`
  return [url, "Gabim ne marrjen e orareve"];
}

//Lajmi
export const createLajmi = () => {
  const url = BASE_URL + `/lajmet/create`
  return [url, "Gabim ne krijimin e lajmit"];
}

export const updateLajmiById = () => {
  const url = BASE_URL + `/lajmet/update/`
  return [url, "Gabim ne perditesimin e lajmit"];
}

export const deleteLajmiById = () => {
  const url = BASE_URL + `/lajmet/delete/`
  return [url, "Gabim ne fshirjen e lajmit"];
}

export const getLajmiById = () => {
  const url = BASE_URL + '/lajmet/getById/'
  return [url, "Gabim ne marrjen e lajmit"];
}

export const getAllLajmet = () => {
  const url = BASE_URL + `/lajmet/get`
  return [url, "Gabim ne marrjen e lajmeve"];
}

//OrariLigjerata
export const createOrariLigjerata = () => {
  const url = BASE_URL + `/orariLigjerata/create`
  return [url, "Gabim ne krijimin e orariLigjerates"];
}

export const updateOrariLigjerataById = () => {
  const url = BASE_URL + `/orariLigjerata/update/`
  return [url, "Gabim ne perditesimin e orariLigjerates"];
}

export const deleteOrariLigjerataById = () => {
  const url = BASE_URL + `/orariLigjerata/delete/`
  return [url, "Gabim ne fshirjen e orariLigjerates"];
}

export const getOrariLigjerataById = () => {
  const url = BASE_URL + '/orariLigjerata/getById/'
  return [url, "Gabim ne marrjen e orariLigjerates"];
}

export const getAllOrariLigjeratat = () => {
  const url = BASE_URL + `/orariLigjerata/get`
  return [url, "Gabim ne marrjen e orariLigjeratave"];
}

//Afati 
export const createAfati = () => {
  const url = BASE_URL + `/api/afati`
  return [url, "Gabim ne krijimin e afatit"];
}

export const updateAfatiByID = () => {
  const url = BASE_URL + `/api/afati/`
  return [url, "Gabim ne perditesimin e afatit"];
} 

export const deleteAfatiByID = () => {
  const url = BASE_URL + `/api/afati/`
  return [url, "Gabim ne fshirjen e afatit"];
}

export const getAfatiByID = () => {
  const url = BASE_URL + '/api/afati/'
  return [url, "Gabim ne marrjen e afatit"];
}

export const getAllAfatet = () => {
  const url = BASE_URL + `/api/afati`
  return [url, "Gabim ne marrjen e afatave"];
}