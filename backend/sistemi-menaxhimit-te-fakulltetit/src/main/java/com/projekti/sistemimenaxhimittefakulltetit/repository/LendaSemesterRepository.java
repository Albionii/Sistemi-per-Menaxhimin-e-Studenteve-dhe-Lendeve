package com.projekti.sistemimenaxhimittefakulltetit.repository;

import com.projekti.sistemimenaxhimittefakulltetit.entities.LendaSemester;
import com.projekti.sistemimenaxhimittefakulltetit.service.LendaSemesterService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LendaSemesterRepository extends JpaRepository<LendaSemester, Long> {

    Optional<LendaSemester> findById(Long id);
    List<LendaSemester> findBySemesterId(Long semesterId);
}
