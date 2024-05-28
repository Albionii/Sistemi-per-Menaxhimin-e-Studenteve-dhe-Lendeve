package com.projekti.sistemimenaxhimittefakulltetit.repository;

import com.projekti.sistemimenaxhimittefakulltetit.entities.Lajmi;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LajmiRepository extends JpaRepository<Lajmi, Long> {
    List<Lajmi> findByDepartamenti_Id(Long departamentiId);
}
