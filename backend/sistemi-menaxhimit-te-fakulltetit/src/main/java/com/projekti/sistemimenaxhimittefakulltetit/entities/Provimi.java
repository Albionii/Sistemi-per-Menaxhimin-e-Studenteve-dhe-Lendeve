package com.projekti.sistemimenaxhimittefakulltetit.entities;


import com.fasterxml.jackson.annotation.JsonBackReference;
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
    private ProfesoriLenda ligjerata;

    private String data;

    private String location;

//    @OneToMany(mappedBy = "provimi", cascade = CascadeType.ALL)
//    private List<StudentProvimi> studentProvimet;
}
