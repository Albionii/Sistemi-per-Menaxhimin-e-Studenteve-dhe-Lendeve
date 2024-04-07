package com.projekti.sistemimenaxhimittefakulltetit.repository;

import com.projekti.sistemimenaxhimittefakulltetit.entities.Vleresimi;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface VleresimiRepository extends JpaRepository<Vleresimi, Long> {
    @Query("SELECT AVG(v.nota) FROM Vleresimi v WHERE v.studentLigjerata.student.id = :studentId")
    Double findAverageNotaByStudentId(@Param("studentId") Long studentId);
}
