package com.projekti.sistemimenaxhimittefakulltetit.repository;

import com.projekti.sistemimenaxhimittefakulltetit.entities.Assignment;
import com.projekti.sistemimenaxhimittefakulltetit.entities.Postimi;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostimiRepository extends JpaRepository<Postimi, Long> {

    Postimi findPostimiById(Long id);
    Postimi findByAssignmentsContaining(Assignment assignment);
}
