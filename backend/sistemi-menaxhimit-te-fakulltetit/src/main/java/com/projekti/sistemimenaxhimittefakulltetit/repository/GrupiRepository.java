package com.projekti.sistemimenaxhimittefakulltetit.repository;

import com.projekti.sistemimenaxhimittefakulltetit.entities.Grupi;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GrupiRepository extends JpaRepository<Grupi, Long> {
    List<Grupi> findBySemesterId(Long id);

}
