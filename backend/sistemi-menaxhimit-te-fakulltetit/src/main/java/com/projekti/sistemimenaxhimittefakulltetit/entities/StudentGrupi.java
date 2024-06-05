package com.projekti.sistemimenaxhimittefakulltetit.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@RequiredArgsConstructor
@Table(
        uniqueConstraints = @UniqueConstraint(columnNames = {"student_id", "grupi_id", "afati_id"})
)
public class StudentGrupi {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    @ManyToOne
    @JoinColumn(name="grupi_id", nullable = false)
    private Grupi grupi;

    private LocalDateTime registrationDate;

    @ManyToOne
    @JoinColumn(name="afati_id", nullable = false)
    private Afati afati;

    @PrePersist
    protected void onCreateDataParaqitjes() {
        registrationDate = LocalDateTime.now();
    }
}
