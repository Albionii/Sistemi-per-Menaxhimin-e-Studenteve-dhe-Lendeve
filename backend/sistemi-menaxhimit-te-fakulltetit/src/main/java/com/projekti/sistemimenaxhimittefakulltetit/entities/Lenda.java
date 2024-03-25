package com.projekti.sistemimenaxhimittefakulltetit.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name = "lendet")
public class Lenda {
    @Id
    private Long id;
    private String emri;
    private String ects;
    private boolean isObligative;

//    @OneToMany(mappedBy = "lenda")
//    private List<ProfesoriLenda> profesoriLendaList = new ArrayList<>();



}
