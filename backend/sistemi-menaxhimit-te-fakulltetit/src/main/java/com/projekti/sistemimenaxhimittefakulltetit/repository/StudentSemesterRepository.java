package com.projekti.sistemimenaxhimittefakulltetit.repository;

import com.projekti.sistemimenaxhimittefakulltetit.entities.Semester;
import com.projekti.sistemimenaxhimittefakulltetit.entities.Student;
import com.projekti.sistemimenaxhimittefakulltetit.entities.StudentSemesterRegistration;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentSemesterRepository extends JpaRepository<StudentSemesterRegistration, Long> {
    StudentSemesterRegistration findByStudentId(Long Id);

    boolean existsByStudentAndSemester(Student student, Semester semester);
}
