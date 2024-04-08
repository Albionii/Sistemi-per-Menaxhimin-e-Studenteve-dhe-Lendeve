package com.projekti.sistemimenaxhimittefakulltetit.service;

import com.projekti.sistemimenaxhimittefakulltetit.entities.Lenda;
import com.projekti.sistemimenaxhimittefakulltetit.entities.Semester;
import com.projekti.sistemimenaxhimittefakulltetit.entities.Student;
import com.projekti.sistemimenaxhimittefakulltetit.entities.StudentSemesterRegistration;
import com.projekti.sistemimenaxhimittefakulltetit.repository.StudentSemesterRegistrationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class StudentSemesterRegistrationService {

    private final StudentSemesterRegistrationRepository registrationRepository;


    public StudentSemesterRegistration registerStudentForSemester(Student student, Semester semester) {
        StudentSemesterRegistration registration = new StudentSemesterRegistration();
        registration.setStudent(student);
        registration.setSemester(semester);
        registration.setRegistrationDate(LocalDateTime.now());

        return registrationRepository.save(registration);
    }

    public StudentSemesterRegistration EnrollStudent(Lenda lenda, Long id) {

        StudentSemesterRegistration sem = registrationRepository.findByStudentId(id);

        System.out.println(sem == null);

        Set<Lenda> lendet = sem.getLendet();
        System.out.println("Para: " + lendet);
        lendet.add(lenda);

        sem.setLendet(lendet);

        System.out.println("Pas: " + lendet);

        registrationRepository.save(sem);

        return sem;
    }
}
