package com.projekti.sistemimenaxhimittefakulltetit.entities;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class StudentProvim {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "s_id")
    private Student student;

    @ManyToOne
    @JoinColumn(name = "p_id")
    private Provimi provim;
}
