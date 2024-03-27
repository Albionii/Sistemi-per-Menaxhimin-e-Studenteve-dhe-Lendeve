package com.projekti.sistemimenaxhimittefakulltetit.repository;

import com.projekti.sistemimenaxhimittefakulltetit.entities.StudentLigjerata;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StudentLigjerataRepository extends JpaRepository<StudentLigjerata, Long> {
    List<StudentLigjerata> findByStudentId(Long id);
}
