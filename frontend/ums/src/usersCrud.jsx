import React from 'react'
import Crud from './CRUD-Template/Crud'

import {
    createStudent,
    getAllStudents,
    getStudentByID,
    updateStudentByID,
    deleteStudentByID
} from './APIRequests'



function usersCrud() {
    const rowsNames = [
        "Studenti ID",
        "Emri",
        "Mbiemri",
        "Gjinia",
        "email",
        "buttons"
    ]
    const isPreviewAvailable = false;

    const addButtonJson = {
        titulli: "Krijo Ligjeraten",
        inputat: {
            I1: {
                emri: "ID",
                getAPI: ""
            },
            I3: {
                emri: "Emri",
                getAPI: ""
            },
            I4: {
                emri: "Mbiemri",
                getAPI: ""
            }
        },
        button: {
            emri: "Add Studenti"
        }
    }
    const editButtonJson = {
        titulli: "",
        inputat: {
            1: {
                emri: "",
                getAPI: ""
            },
            2: {
                emri: "",
                getAPI: ""
            },
            3: {
                emri: "",
                getAPI: ""
            }
        },
        button: {
            emri: ""
        }
    }
    const formDataJson = {
        // Ketu eshte json per api qe ki me dergu ne backend (si ne Postman)
        rruga: '',
        // dateLindja: currentDate,
        qyteti: '',
        zipcode: '',
        shteti: '',
        nrTelefonit: '',
        email: '',
        firstName: '',
        lastName: '',
        gjinia: 'male',
        password: ''
    }
    const jsonNames = ["id","user.firstName","user.lastName","user.gjinia","user.email"];


    return (
        <>
            <Crud
                rows={rowsNames}
                createAPI={createStudent}
                getAllAPI={getAllStudents}
                getByIDAPI={getStudentByID}
                updateAPI={updateStudentByID}
                deleteAPI={deleteStudentByID}
                isPreviewAvailable={isPreviewAvailable}
                addButtonJson={addButtonJson}
                editButtonJson={editButtonJson}
                formDataJson={formDataJson}
                jsonName={jsonNames}

            />
        </>
    )
}

export default usersCrud