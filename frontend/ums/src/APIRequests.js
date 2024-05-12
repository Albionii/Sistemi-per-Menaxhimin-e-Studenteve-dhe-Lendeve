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
    const url = BASE_URL + `/professorLenda/updateprofessorLenda/`;
    return [url, "Gabim në përditësimin e ligjeratës!"];
  }

  // Lenda

  export const deleteLendaByID = () => {
    const url = BASE_URL + `/lenda/delete`;
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
    const url = BASE_URL + `/lenda`;
    return [url, "Gabim në marrjen e lëndës!"];
  }

  export const updateLendaByID = () => {
    const url = BASE_URL + `/lenda/update`;
    return [url, "Gabim në përditësimin e lëndës!"];
  }

  //

  




  
