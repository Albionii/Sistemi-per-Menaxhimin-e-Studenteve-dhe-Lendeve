package com.projekti.sistemimenaxhimittefakulltetit.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Date;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
public class StudentProvimi {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int nota;
    private LocalDateTime dataVendosjes;

    private String emriLendes;

    @ManyToOne
    @JoinColumn(name = "provimi_id")
    private Provimi provimi;

    @ManyToOne
    @JoinColumn(name = "student_id")
    private Student student;


}
