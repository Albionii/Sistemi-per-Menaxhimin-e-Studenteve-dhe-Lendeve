package com.projekti.sistemimenaxhimittefakulltetit.service;

import com.projekti.sistemimenaxhimittefakulltetit.entities.Professor;
import com.projekti.sistemimenaxhimittefakulltetit.entities.Student;
import com.projekti.sistemimenaxhimittefakulltetit.entities.User;
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
            User existingUser = s.getUser();
            User updatedUser = newStudent.getUser();
            if (updatedUser != null) {
                if (updatedUser.getFirstName() != null) existingUser.setFirstName(updatedUser.getFirstName());
                if (updatedUser.getLastName() != null) existingUser.setLastName(updatedUser.getLastName());
                if (updatedUser.getEmail() != null) existingUser.setEmail(updatedUser.getEmail());
                if (updatedUser.getDateLindja() != null) existingUser.setDateLindja(updatedUser.getDateLindja());
                if (updatedUser.getGjinia() != null) existingUser.setGjinia(updatedUser.getGjinia());
                if (updatedUser.getNrTelefonit() != null) existingUser.setNrTelefonit(updatedUser.getNrTelefonit());
                if (updatedUser.getQyteti() != null) existingUser.setQyteti(updatedUser.getQyteti());
                if (updatedUser.getZipcode() != null) existingUser.setZipcode(updatedUser.getZipcode());
                if (updatedUser.getShteti() != null) existingUser.setShteti(updatedUser.getShteti());
                if (updatedUser.getRruga() != null) existingUser.setRruga(updatedUser.getRruga());
                if (updatedUser.getRole() != null) existingUser.setRole(updatedUser.getRole());
            }
            s.setId(newStudent.getId());
            s.setUser(existingUser);
            return studentRepository.save(s);
        } else {
            return null; // Or handle the case where the product with the given id is not found
        }

    }
}
