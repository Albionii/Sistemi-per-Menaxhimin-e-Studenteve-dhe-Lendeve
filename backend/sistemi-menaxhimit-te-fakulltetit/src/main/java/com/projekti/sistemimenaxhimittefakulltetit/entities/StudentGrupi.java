package com.projekti.sistemimenaxhimittefakulltetit.entities;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class StudentGrupi {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "student_id")
    private Student student;

    @ManyToOne
    @JoinColumn(name="grupi_id")
    private Grupi grupi;

    private LocalDateTime registrationDate;
}
