package com.projekti.sistemimenaxhimittefakulltetit.service;

import com.projekti.sistemimenaxhimittefakulltetit.entities.ProfesoriProvimi;
import com.projekti.sistemimenaxhimittefakulltetit.entities.Provimi;
import com.projekti.sistemimenaxhimittefakulltetit.entities.Student;
import com.projekti.sistemimenaxhimittefakulltetit.entities.StudentProvimi;
import com.projekti.sistemimenaxhimittefakulltetit.repository.StudentPrvRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StudentPrvService {

    private final StudentPrvRepository studentPrvRepository;
    public StudentProvimi paraqitProvimin(Student student, ProfesoriProvimi prv) throws Exception {

        if (student == null)
            throw new Exception("Studenti nuk u gjet!");

        if (prv == null)
            throw new Exception("Provimi nuk u gjet!");


        StudentProvimi studentProvimi = new StudentProvimi();

        studentProvimi.setStudent(student);
        studentProvimi.setProvimi(prv);

        if (studentPrvRepository.existsByProvimiAndStudent(prv, student)) {
            throw new Exception("Provimi veqse eshte paraqitur per ju!");
        }


            return studentPrvRepository.save(studentProvimi);
    }

    public void anulo(Student student, ProfesoriProvimi prv) {
        StudentProvimi studentProvimi = studentPrvRepository.findByProvimiAndStudent(prv, student);

        studentPrvRepository.delete(studentProvimi);
    }

    public List<StudentProvimi> getProvimet(Long id) {
       return studentPrvRepository.findAllByStudentId(id);
    }

}
