package com.projekti.sistemimenaxhimittefakulltetit.repository;

import com.projekti.sistemimenaxhimittefakulltetit.entities.Lenda;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LendaRepository extends JpaRepository<Lenda, Long> {

    Lenda getLendaById(Long id);

}
