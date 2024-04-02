package com.projekti.sistemimenaxhimittefakulltetit.entities;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table
public class ProfesoriLenda {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Professor professor;
    @ManyToOne
    private Lenda lenda;
}
