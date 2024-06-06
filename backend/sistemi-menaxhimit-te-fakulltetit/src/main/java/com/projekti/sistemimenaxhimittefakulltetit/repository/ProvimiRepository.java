package com.projekti.sistemimenaxhimittefakulltetit.repository;

import com.projekti.sistemimenaxhimittefakulltetit.entities.Provimi;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProvimiRepository extends JpaRepository<Provimi, Long> {

    Provimi findProvimiByLigjerataId(Long Id);
    List<Provimi> findAllByLigjerataId(Long id);

    List<Provimi> findByLigjerata_Professor_Id(Long professorId);


}
