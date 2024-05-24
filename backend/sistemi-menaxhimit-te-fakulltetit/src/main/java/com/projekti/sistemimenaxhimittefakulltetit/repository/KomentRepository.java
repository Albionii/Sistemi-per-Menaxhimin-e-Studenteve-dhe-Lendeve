package com.projekti.sistemimenaxhimittefakulltetit.repository;

import com.projekti.sistemimenaxhimittefakulltetit.entities.Komenti;
import com.projekti.sistemimenaxhimittefakulltetit.entities.Salla;
import org.springframework.data.jpa.repository.JpaRepository;

public interface KomentRepository extends JpaRepository<Komenti, Long> {
}
