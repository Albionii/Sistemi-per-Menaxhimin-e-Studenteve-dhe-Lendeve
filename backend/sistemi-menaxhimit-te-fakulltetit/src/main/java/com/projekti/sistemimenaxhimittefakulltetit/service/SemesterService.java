package com.projekti.sistemimenaxhimittefakulltetit.service;

import com.projekti.sistemimenaxhimittefakulltetit.entities.Semester;
import com.projekti.sistemimenaxhimittefakulltetit.entities.StudentProvimi;
import com.projekti.sistemimenaxhimittefakulltetit.repository.SemesterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class SemesterService {

    @Autowired
    private SemesterRepository semesterRepository;

    public Semester createSemester(Semester created) {
        Semester semester = created;

        return semesterRepository.save(semester);
    }

    public Semester updateSemester(Long id,Semester updated) {
        Semester semester = semesterRepository.findSemesterById(id);
        semester.setName(updated.getName());
//        semester.setGrupet(updated.getGrupet());
        semester.setStartDate(updated.getStartDate());
        semester.setEndDate(updated.getEndDate());
        semester.setDepartamenti(updated.getDepartamenti());

        return semesterRepository.save(semester);
    }

    public void deleteSemester(Long id) {
        Semester semester = semesterRepository.findSemesterById(id);

        semesterRepository.delete(semester);
    }

    public List<Semester> getByDepartamentiId(Long id){
        return semesterRepository.findByDepartamentiId(id);
    }

    public List<Semester> getSemesters(){
        return semesterRepository.findAll();
    }



    public Semester getSemester(Long id) {
        return semesterRepository.findSemesterById(id);
    }

}
