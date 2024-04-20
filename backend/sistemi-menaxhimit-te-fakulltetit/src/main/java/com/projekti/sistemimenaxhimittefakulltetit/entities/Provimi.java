package com.projekti.sistemimenaxhimittefakulltetit.entities;


import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.util.Set;

@Entity
@Data
public class Provimi {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long p_ID;
    private LocalDate data_paraqitjes;
    private LocalDate data_e_vendosjes;
    private int nota;

    @OneToOne
    private ProfesoriLenda profesoriLenda;



}
