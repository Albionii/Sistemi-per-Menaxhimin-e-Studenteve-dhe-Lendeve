package com.projekti.sistemimenaxhimittefakulltetit.service;

import com.projekti.sistemimenaxhimittefakulltetit.entities.*;
import com.projekti.sistemimenaxhimittefakulltetit.repository.ProfesoriLendaRepository;
import com.projekti.sistemimenaxhimittefakulltetit.repository.StudentRepository;
import com.projekti.sistemimenaxhimittefakulltetit.repository.StudentSemesterRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class StudentSemesterRegistrationService {

    private final StudentSemesterRepository registrationRepository;
    private final StudentRepository studentRepository;
    private final StudentLigjerataService studentLigjerataService;
    private final ProfesoriLendaRepository profesoriLendaRepository;
    private final UserService userService;
    private final StudentService studentService;


    public StudentSemester registerStudentForSemester(String jwt, StudentSemester studentSemester) throws Exception {
        StudentSemester registration = new StudentSemester();

//

        User user = userService.findUserByJwtToken(jwt);
        Student student = studentService.findStudentByUserId(user.getId());

        registration.setStudent(student);
        registration.setSemester(studentSemester.getSemester());
        registration.setLokacioni(studentSemester.getLokacioni());
        registration.setNderrimiOrarit(studentSemester.getNderrimiOrarit());
        registration.setRegistrationDate(LocalDateTime.now());


        return registrationRepository.save(registration);
    }

    public StudentSemester findSemesterByStudent(String jwt) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        Student student = studentService.findStudentByUserId(user.getId());

        return registrationRepository.findFirstByStudentIdOrderByRegistrationDateDesc(student.getId());
    }

//    public StudentSemester EnrollStudent(Lenda lenda, Long id) {
//
//        StudentSemester sem = registrationRepository.findByStudentId(id);
//
//        Set<Lenda> lendet = sem.getLendet();
//        lendet.add(lenda);
//        sem.setLendet(lendet);
//
//        registrationRepository.save(sem);
//
//        return sem;
//    }

    public List<StudentSemester> getSemesters(String jwt) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        Student student = studentService.findStudentByUserId(user.getId());
        return registrationRepository.findAllByStudentId(student.getId());
    }
}
