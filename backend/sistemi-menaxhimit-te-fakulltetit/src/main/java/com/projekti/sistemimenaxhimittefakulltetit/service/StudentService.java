package com.projekti.sistemimenaxhimittefakulltetit.service;

import com.projekti.sistemimenaxhimittefakulltetit.entities.Student;
import com.projekti.sistemimenaxhimittefakulltetit.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class StudentService {

    @Autowired
    private final StudentRepository studentRepository;

    public Student findStudentByUserId(Long id){
        return studentRepository.findStudentByUserId(id);
    }

    public void deleteByID(Long id) {
        studentRepository.deleteById(id);
    }

    public List<Student> getAllStudents(){
        return studentRepository.findAll();
    }

    public Optional<Student> getStudentByID(Long id) {
        return studentRepository.findById(id);
    }
}
