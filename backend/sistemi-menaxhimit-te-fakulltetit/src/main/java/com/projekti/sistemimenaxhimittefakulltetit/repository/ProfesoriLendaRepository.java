package com.projekti.sistemimenaxhimittefakulltetit.repository;

import com.projekti.sistemimenaxhimittefakulltetit.entities.*;
import org.hibernate.dialect.PostgreSQLInetJdbcType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProfesoriLendaRepository extends JpaRepository<ProfesoriLenda, Long> {

    List<ProfesoriLenda> findAllByProfessorId(Long professorId);
    List<ProfesoriLenda> findAllByLendaId(Long id);

    ProfesoriLenda findByProfessorAndLenda(Professor professor, Lenda lenda);

    ProfesoriLenda findByAssignmentsContaining(Assignment assignment);

    ProfesoriLenda findByMaterialiContaining(Materiali materiali);
    ProfesoriLenda findByPostimetContaining(Postimi postimi);


    List<ProfesoriLenda> findBySemesterId(Long id);
}
