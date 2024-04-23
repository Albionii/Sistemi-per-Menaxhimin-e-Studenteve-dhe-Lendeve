package com.projekti.sistemimenaxhimittefakulltetit.repository;

import com.projekti.sistemimenaxhimittefakulltetit.entities.Lenda;
import com.projekti.sistemimenaxhimittefakulltetit.entities.Postimi;
import com.projekti.sistemimenaxhimittefakulltetit.entities.ProfesoriLenda;
import com.projekti.sistemimenaxhimittefakulltetit.entities.Professor;
import org.hibernate.dialect.PostgreSQLInetJdbcType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProfesoriLendaRepository extends JpaRepository<ProfesoriLenda, Long> {

    List<ProfesoriLenda> findAllByProfessorId(Long professorId);
    List<ProfesoriLenda> findAllByLendaId(Long id);

    ProfesoriLenda findByProfessorAndLenda(Professor professor, Lenda lenda);

    ProfesoriLenda findByPostimetContaining(Postimi postimi);
    ProfesoriLenda findByLendaId(Long id);
}
