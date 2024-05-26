package com.projekti.sistemimenaxhimittefakulltetit.repository;

import com.projekti.sistemimenaxhimittefakulltetit.entities.Orari;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrariRepository extends JpaRepository<Orari, Long> {
    List<Orari> findByGrupiId(Long id);
}
