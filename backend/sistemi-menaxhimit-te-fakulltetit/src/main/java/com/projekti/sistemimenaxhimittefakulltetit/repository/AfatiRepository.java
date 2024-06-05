package com.projekti.sistemimenaxhimittefakulltetit.repository;

import com.projekti.sistemimenaxhimittefakulltetit.entities.Afati;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;

public interface AfatiRepository extends JpaRepository<Afati, Long> {
    List<Afati> findByDataFillimitLessThanEqualAndDataMbarimitGreaterThanEqual(
            Date currentDate1, Date currentDate2
    );
}
