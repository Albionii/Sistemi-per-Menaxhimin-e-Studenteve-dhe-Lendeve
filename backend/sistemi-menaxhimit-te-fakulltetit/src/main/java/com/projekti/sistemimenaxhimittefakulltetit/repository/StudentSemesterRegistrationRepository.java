package com.projekti.sistemimenaxhimittefakulltetit.repository;

import com.projekti.sistemimenaxhimittefakulltetit.entities.StudentSemesterRegistration;
import com.projekti.sistemimenaxhimittefakulltetit.service.StudentSemesterRegistrationService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

public interface StudentSemesterRegistrationRepository extends JpaRepository<StudentSemesterRegistration, Long> {
    StudentSemesterRegistration findByStudentId(Long Id);
}
