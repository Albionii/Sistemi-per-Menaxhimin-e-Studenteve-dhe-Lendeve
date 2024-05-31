package com.projekti.sistemimenaxhimittefakulltetit.repository;

import com.projekti.sistemimenaxhimittefakulltetit.entities.ProfesoriProvimi;
import com.projekti.sistemimenaxhimittefakulltetit.entities.Provimi;
import com.projekti.sistemimenaxhimittefakulltetit.entities.Student;
import com.projekti.sistemimenaxhimittefakulltetit.entities.StudentProvimi;
import org.apache.logging.log4j.message.LoggerNameAwareMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface StudentPrvRepository extends JpaRepository<StudentProvimi, Long> {

    StudentProvimi findByProvimiAndStudent(Provimi provimi, Student student);

    boolean existsByProvimiAndStudent(Provimi provimi, Student student);

    List<StudentProvimi> findByProvimi(Provimi provimi);

    List<StudentProvimi> findAllByStudentId(Long id);
    List<StudentProvimi> findAllStudentProvimiByProvimiId(Long provimiId);

    boolean existsByEmriLendes(String emriLendes);

    @Query("SELECT sp.nota, COUNT(sp) FROM StudentProvimi sp WHERE sp.student.id = :student_id GROUP BY sp.nota")
    List<Object[]> countGrades(Long student_id);


}
