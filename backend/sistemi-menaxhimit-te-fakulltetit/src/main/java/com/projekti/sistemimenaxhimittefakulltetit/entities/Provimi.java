package com.projekti.sistemimenaxhimittefakulltetit.entities;


import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Set;

@Entity
@Data
public class Provimi {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
//    @JoinColumn(name = "lenda_id")
    private ProfesoriLenda ligjerata;

    private String data;

    private String location;

//    @OneToMany(mappedBy = "provimi", cascade = CascadeType.ALL)
//    private List<StudentProvimi> studentProvimet;
}
