package com.projekti.sistemimenaxhimittefakulltetit.repository;

import com.projekti.sistemimenaxhimittefakulltetit.entities.StudentLigjerata;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface StudentLigjerataRepository extends JpaRepository<StudentLigjerata, Long> {
    List<StudentLigjerata> findByStudentId(Long id);
    Optional<StudentLigjerata> findByStudentIdAndLigjerataId(Long id1, Long id2);
    List<StudentLigjerata> findByLigjerataId(Long ligjerataId);
}
