package com.projekti.sistemimenaxhimittefakulltetit.service;

import com.projekti.sistemimenaxhimittefakulltetit.entities.Grupi;
import com.projekti.sistemimenaxhimittefakulltetit.entities.Student;
import com.projekti.sistemimenaxhimittefakulltetit.entities.StudentGrupi;
import com.projekti.sistemimenaxhimittefakulltetit.entities.User;
import com.projekti.sistemimenaxhimittefakulltetit.repository.StudentGrupiRepository;
import com.projekti.sistemimenaxhimittefakulltetit.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class StudentGrupiService {
    private final StudentGrupiRepository studentGrupiRepository;
    private final UserService userService;
    private final StudentService studentService;
    private final GrupiService grupiService;

    public List<StudentGrupi> getGrupiByStudentId(String jwt, Long id) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        Student student = studentService.findStudentByUserId(user.getId());
        id = student.getId();
        return studentGrupiRepository.findByStudentId(id);
    }

    public StudentGrupi studentGrupi(String jwt, Long grupiId) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        Student student = studentService.findStudentByUserId(user.getId());
        if (student == null) {
            throw new Exception("Student not found for user: " + user.getId());
        }

        Grupi grupi = grupiService.getGrupiById(grupiId);

        StudentGrupi studentGrupi = new StudentGrupi();
        studentGrupi.setGrupi(grupi);
        studentGrupi.setStudent(student);

        return studentGrupiRepository.save(studentGrupi);
    }
}
