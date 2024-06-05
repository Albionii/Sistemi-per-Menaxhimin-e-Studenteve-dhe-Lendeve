package com.projekti.sistemimenaxhimittefakulltetit.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
@Table(
        uniqueConstraints = @UniqueConstraint(columnNames = {"student_id", "semester_id", "afati_id"})
)
public class StudentSemester{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    @ManyToOne
    @JoinColumn(name="semester_id", nullable = false)
    private Semester semester;

    private String lokacioni;

    private String nderrimiOrarit;

    private LocalDateTime registrationDate;

    @ManyToOne
    @JoinColumn(name="afati_id", nullable = false)
    private Afati afati;
    @Override
    public String toString() {
        return "StudentSemester{id=" + id + ", lokacioni='" + lokacioni + "', nderrimiOrarit='" + nderrimiOrarit + "', registrationDate=" + registrationDate + "}";
    }
}
