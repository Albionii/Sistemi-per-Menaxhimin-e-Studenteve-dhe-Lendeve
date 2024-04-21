package com.projekti.sistemimenaxhimittefakulltetit.entities;


import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.util.Date;
import java.util.Set;

@Entity
@Data
public class Provimi {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "lenda_id", unique = true)
    private ProfesoriLenda ligjerata;

    @Temporal(TemporalType.TIMESTAMP)
    private Date data;

    private String location;

}
