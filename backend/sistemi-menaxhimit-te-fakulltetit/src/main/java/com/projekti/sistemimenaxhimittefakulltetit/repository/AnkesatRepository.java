package com.projekti.sistemimenaxhimittefakulltetit.repository;

import com.projekti.sistemimenaxhimittefakulltetit.entities.Ankesat;
import com.projekti.sistemimenaxhimittefakulltetit.entities.Salla;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnkesatRepository extends JpaRepository<Ankesat, Long> {
}
