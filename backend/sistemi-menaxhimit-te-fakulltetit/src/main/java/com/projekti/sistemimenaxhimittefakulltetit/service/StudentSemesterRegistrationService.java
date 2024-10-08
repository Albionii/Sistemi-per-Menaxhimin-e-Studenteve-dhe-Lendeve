package com.projekti.sistemimenaxhimittefakulltetit.service;

import com.projekti.sistemimenaxhimittefakulltetit.entities.*;
import com.projekti.sistemimenaxhimittefakulltetit.repository.ProfesoriLendaRepository;
import com.projekti.sistemimenaxhimittefakulltetit.repository.StudentRepository;
import com.projekti.sistemimenaxhimittefakulltetit.repository.StudentSemesterRepository;
import jakarta.transaction.Transactional;
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
    private final AfatiService afatiService;


    public StudentSemester registerStudentForSemester(String jwt, StudentSemester studentSemester) throws Exception {
        StudentSemester registration = new StudentSemester();

//

        User user = userService.findUserByJwtToken(jwt);
        Student student = studentService.findStudentByUserId(user.getId());

        registration.setStudent(student);
        registration.setSemester(studentSemester.getSemester());
        registration.setAfati(studentSemester.getAfati());
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

    public List<StudentSemester> getStudentSemestersByAfatiId(Long afatiId) {
        return registrationRepository.findByAfatiId(afatiId);
    }


    public List<StudentSemester> getSemesters(Student student) throws Exception {

        return registrationRepository.findAllByStudentId(student.getId());
    }

    public List<StudentSemester> getStudentByAfati(String jwt) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        Student student = studentService.findStudentByUserId(user.getId());
        List<Afati> afati = afatiService.findByCurrent();

        return registrationRepository.findByAfatiIdAndStudentId(afati.get(0).getId(), student.getId());
    }

    @Transactional
    public void deleteByStudentId(String jwt) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        Student student = studentService.findStudentByUserId(user.getId());
        List<Afati> afati = afatiService.findByCurrent();

        registrationRepository.deleteByStudentIdAndAfatiId(student.getId(), afati.get(0).getId());
    }
}
