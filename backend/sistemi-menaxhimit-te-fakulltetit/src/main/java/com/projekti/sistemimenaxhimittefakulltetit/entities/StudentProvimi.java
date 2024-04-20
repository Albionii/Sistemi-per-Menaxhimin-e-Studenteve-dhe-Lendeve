package com.projekti.sistemimenaxhimittefakulltetit.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
public class StudentProvimi {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "provimi_id")
    private ProfesoriProvimi provimi;

    @ManyToOne
    @JoinColumn(name = "student_id")
    private Student student;

    @OneToOne
    private Vleresimi vleresimi;

}
