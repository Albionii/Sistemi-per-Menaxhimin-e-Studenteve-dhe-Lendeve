package com.projekti.sistemimenaxhimittefakulltetit.repository;

import com.projekti.sistemimenaxhimittefakulltetit.entities.Semester;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository

public interface SemesterRepository extends JpaRepository<Semester, Long> {

    public Semester findSemesterById(Long id);
    public List<Semester> findByDepartamentiId(Long id);
}

