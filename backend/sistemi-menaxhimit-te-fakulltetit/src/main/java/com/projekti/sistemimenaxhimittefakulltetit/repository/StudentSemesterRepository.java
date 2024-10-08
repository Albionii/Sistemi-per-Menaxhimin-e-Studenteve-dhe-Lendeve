package com.projekti.sistemimenaxhimittefakulltetit.repository;

import com.projekti.sistemimenaxhimittefakulltetit.entities.Semester;
import com.projekti.sistemimenaxhimittefakulltetit.entities.Student;
import com.projekti.sistemimenaxhimittefakulltetit.entities.StudentGrupi;
import com.projekti.sistemimenaxhimittefakulltetit.entities.StudentSemester;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface StudentSemesterRepository extends JpaRepository<StudentSemester, Long> {
    StudentSemester findByStudentId(Long Id);

    boolean existsByStudentAndSemester(Student student, Semester semester);

    List<StudentSemester> findAllByStudentId(Long id);

    StudentSemester findFirstByStudentIdOrderByRegistrationDateDesc(Long studentId);

    List<StudentSemester> findByAfatiId(Long afatiId);

    List<StudentSemester> findByAfatiIdAndStudentId(Long afatiId, Long studentId);

    void deleteByStudentIdAndAfatiId(Long studentId, Long afatiId);

}
