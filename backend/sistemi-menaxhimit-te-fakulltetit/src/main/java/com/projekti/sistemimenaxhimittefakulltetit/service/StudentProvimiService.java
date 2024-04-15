package com.projekti.sistemimenaxhimittefakulltetit.service;

import com.projekti.sistemimenaxhimittefakulltetit.entities.Provimi;
import com.projekti.sistemimenaxhimittefakulltetit.entities.Student;
import com.projekti.sistemimenaxhimittefakulltetit.entities.StudentProvim;
import com.projekti.sistemimenaxhimittefakulltetit.repository.StudentProvimRepository;
import com.projekti.sistemimenaxhimittefakulltetit.request.CreateStudentProvimRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StudentProvimiService {

    @Autowired
    private StudentProvimRepository studentProvimRepository;

    public void deleteStudentAndProvimiByID(Long id){
        studentProvimRepository.deleteById(id);
    }

    public List<StudentProvim> findAllStudentAndProvimet(){
        return studentProvimRepository.findAll();
    }

    public StudentProvim createStudentProvim(CreateStudentProvimRequest req){
        StudentProvim s = new StudentProvim();
        Student student = new Student();
        Provimi provimi = new Provimi();

        student.setId(req.getStudent());
        provimi.setP_ID(req.getProvimi());

        s.setId(req.getId());
        s.setStudent(student);
        s.setProvim(provimi);

        return studentProvimRepository.save(s);
    }
}
