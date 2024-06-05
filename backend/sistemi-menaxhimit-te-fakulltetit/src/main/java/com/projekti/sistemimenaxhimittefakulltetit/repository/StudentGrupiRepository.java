package com.projekti.sistemimenaxhimittefakulltetit.repository;


import com.projekti.sistemimenaxhimittefakulltetit.entities.StudentGrupi;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StudentGrupiRepository extends JpaRepository<StudentGrupi, Long> {
    List<StudentGrupi> findByStudentId(Long id);

    List<StudentGrupi> findByAfatiId(Long afatiId);

    List<StudentGrupi> findByAfatiIdAndStudentId(Long afatiId, Long studentId);

    void deleteByStudentIdAndAfatiId(Long studentId, Long afatiId);

}
