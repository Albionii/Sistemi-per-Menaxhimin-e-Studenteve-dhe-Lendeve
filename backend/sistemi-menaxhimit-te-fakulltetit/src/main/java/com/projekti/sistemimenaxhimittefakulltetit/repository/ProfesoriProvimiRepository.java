package com.projekti.sistemimenaxhimittefakulltetit.repository;

import com.projekti.sistemimenaxhimittefakulltetit.entities.ProfesoriProvimi;
import com.projekti.sistemimenaxhimittefakulltetit.entities.Professor;
import com.projekti.sistemimenaxhimittefakulltetit.entities.Provimi;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProfesoriProvimiRepository extends JpaRepository<ProfesoriProvimi, Long> {

    boolean existsByProfessorAndProvimi(Professor professor, Provimi provimi);
}
