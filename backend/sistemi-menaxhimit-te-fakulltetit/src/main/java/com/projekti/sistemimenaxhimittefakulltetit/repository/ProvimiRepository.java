package com.projekti.sistemimenaxhimittefakulltetit.repository;

import com.projekti.sistemimenaxhimittefakulltetit.entities.Provimi;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProvimiRepository extends JpaRepository<Provimi, Long> {

    public Provimi findProvimiByLendaId(Long Id);
}
