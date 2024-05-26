package com.projekti.sistemimenaxhimittefakulltetit.repository;


import com.projekti.sistemimenaxhimittefakulltetit.entities.StudentGrupi;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StudentGrupiRepository extends JpaRepository<StudentGrupi, Long> {
    List<StudentGrupi> findByStudentId(Long id);
}
