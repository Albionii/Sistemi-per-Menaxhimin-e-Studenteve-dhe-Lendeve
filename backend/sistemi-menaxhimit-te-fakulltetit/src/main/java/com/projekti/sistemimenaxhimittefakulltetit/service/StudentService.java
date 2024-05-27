package com.projekti.sistemimenaxhimittefakulltetit.service;

import com.projekti.sistemimenaxhimittefakulltetit.entities.Professor;
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

    public Student updateStudent(Long id, Student newStudent){
        Optional<Student> student = studentRepository.findById(id);
        if (student.isPresent()) {
            Student s = student.get();
            s.setId(newStudent.getId());
            s.setUser(newStudent.getUser());
            return studentRepository.save(s);
        } else {
            return null; // Or handle the case where the product with the given id is not found
        }

    }
}
