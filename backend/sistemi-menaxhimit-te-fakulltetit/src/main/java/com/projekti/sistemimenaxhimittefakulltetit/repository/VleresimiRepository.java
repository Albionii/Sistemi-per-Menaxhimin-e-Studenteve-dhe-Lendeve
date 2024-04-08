package com.projekti.sistemimenaxhimittefakulltetit.repository;

import com.projekti.sistemimenaxhimittefakulltetit.entities.Vleresimi;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface VleresimiRepository extends JpaRepository<Vleresimi, Long> {
    @Query("SELECT AVG(v.nota) FROM Vleresimi v WHERE v.studentLigjerata.student.id = :studentId")
    Double findAverageNotaByStudentId(@Param("studentId") Long studentId);

    @Query("SELECT v FROM Vleresimi v WHERE v.studentLigjerata.student.id = :studentId")
    List<Vleresimi> getAllNotat(@Param("studentId") Long studentId);

    @Query("SELECT " +
            "    CAST(SUM(IF(v.nota = 6, 1, 0)) * 100.0 / COUNT(*) AS double), " +
            "    CAST(SUM(IF(v.nota = 7, 1, 0)) * 100.0 / COUNT(*) AS double), " +
            "    CAST(SUM(IF(v.nota = 8, 1, 0)) * 100.0 / COUNT(*) AS double), " +
            "    CAST(SUM(IF(v.nota = 9, 1, 0)) * 100.0 / COUNT(*) AS double), " +
            "    CAST(SUM(IF(v.nota = 10, 1, 0)) * 100.0 / COUNT(*) AS double) " +
            "FROM Vleresimi v WHERE v.studentLigjerata.student.id = :studentId")
    List<Double[]> mesataretPerNote(@Param("studentId") Long studentId);


    Vleresimi findVleresimiById(Long id);
}
