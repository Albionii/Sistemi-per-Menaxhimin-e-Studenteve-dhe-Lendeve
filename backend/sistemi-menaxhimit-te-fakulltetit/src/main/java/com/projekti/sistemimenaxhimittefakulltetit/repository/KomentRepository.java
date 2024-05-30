package com.projekti.sistemimenaxhimittefakulltetit.repository;

import com.projekti.sistemimenaxhimittefakulltetit.entities.Komenti;
import com.projekti.sistemimenaxhimittefakulltetit.entities.Salla;
import com.projekti.sistemimenaxhimittefakulltetit.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface KomentRepository extends JpaRepository<Komenti, Long> {

}
