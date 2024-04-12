package com.projekti.sistemimenaxhimittefakulltetit.repository;

import com.projekti.sistemimenaxhimittefakulltetit.entities.Lenda;
import com.projekti.sistemimenaxhimittefakulltetit.entities.ProfesoriLenda;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProfesoriLendaRepository extends JpaRepository<ProfesoriLenda, Long> {

    List<ProfesoriLenda> findAllByProfessorId(Long professorId);
    ProfesoriLenda findByLendaId(Long id);
}
