package com.projekti.sistemimenaxhimittefakulltetit.repository;

import com.projekti.sistemimenaxhimittefakulltetit.entities.OrariLigjerata;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

public interface OrariLigjerataRepository extends JpaRepository<OrariLigjerata, Long> {
    List<OrariLigjerata> findByOrariId(Long id);
//    @Query("SELECT ol FROM OrariLigjerata ol " +
//            "JOIN ol.orari o " +
//            "JOIN StudentGrupi sg ON sg.grupi.id = ol.grupi.id " +
//            "JOIN sg.student s " +
//            "WHERE s.id = :studentId")
//    List<OrariLigjerata> findOrariLigjerataByStudentId(@Param("studentId")Long studentId);

//    List<OrariLigjerata> findByDita(String dita);
@Query("SELECT ol " +
        "FROM OrariLigjerata ol " +
        "JOIN ol.orari o " +
        "JOIN o.grupi g " +
        "JOIN g.semester s " +
        "JOIN s.studentSemester ss " +
        "WHERE ss.student.id = :studentId AND ol.dita = :dita")
List<OrariLigjerata> findByDita(@Param("dita") String dita, @Param("studentId") Long studentId);


}


