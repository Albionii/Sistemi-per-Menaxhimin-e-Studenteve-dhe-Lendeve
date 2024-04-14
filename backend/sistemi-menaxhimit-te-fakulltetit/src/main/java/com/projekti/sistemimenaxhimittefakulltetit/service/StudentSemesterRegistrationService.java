package com.projekti.sistemimenaxhimittefakulltetit.service;

import com.projekti.sistemimenaxhimittefakulltetit.entities.*;
import com.projekti.sistemimenaxhimittefakulltetit.repository.ProfesoriLendaRepository;
import com.projekti.sistemimenaxhimittefakulltetit.repository.StudentSemesterRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class StudentSemesterRegistrationService {

    private final StudentSemesterRepository registrationRepository;
    private final StudentLigjerataService studentLigjerataService;
    private final ProfesoriLendaRepository profesoriLendaRepository;


    public StudentSemesterRegistration registerStudentForSemester(Student student, Semester semester) throws Exception {
        StudentSemesterRegistration registration = new StudentSemesterRegistration();
        if (registrationRepository.existsByStudentAndSemester(student, semester)) {
            throw new Exception("Student is already registered for this semester");
        }
        registration.setStudent(student);
        registration.setSemester(semester);
        registration.setRegistrationDate(LocalDateTime.now());


        return registrationRepository.save(registration);
    }

    public StudentSemesterRegistration EnrollStudent(Lenda lenda, Long id) {

        StudentSemesterRegistration sem = registrationRepository.findByStudentId(id);

        Set<Lenda> lendet = sem.getLendet();
        lendet.add(lenda);
        sem.setLendet(lendet);

        registrationRepository.save(sem);

        return sem;
    }
}
