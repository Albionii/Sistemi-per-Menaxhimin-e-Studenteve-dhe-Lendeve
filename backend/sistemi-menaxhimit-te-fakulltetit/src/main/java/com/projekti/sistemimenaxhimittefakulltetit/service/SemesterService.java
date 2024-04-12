package com.projekti.sistemimenaxhimittefakulltetit.service;

import com.projekti.sistemimenaxhimittefakulltetit.entities.Lenda;
import com.projekti.sistemimenaxhimittefakulltetit.entities.Semester;
import com.projekti.sistemimenaxhimittefakulltetit.repository.SemesterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class SemesterService {

    @Autowired
    private SemesterRepository semesterRepository;

    public Semester createSemester(Semester created) {
        Semester semester = created;

        return semesterRepository.save(semester);
    }

    public void deleteSemester(Long id) {
        Semester semester = semesterRepository.findSemesterById(id);

        semesterRepository.delete(semester);
    }

    public void deleteLendaSemester(Semester semester, Lenda lenda) {

        Set<Lenda> lendet = semester.getLendet();
        lendet.remove(lenda);

        semester.setLendet(lendet);

        semesterRepository.save(semester);
    }


    public Semester getSemester(Long id) {
        return semesterRepository.findSemesterById(id);
    }

}
