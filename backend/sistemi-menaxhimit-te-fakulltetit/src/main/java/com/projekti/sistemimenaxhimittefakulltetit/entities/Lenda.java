package com.projekti.sistemimenaxhimittefakulltetit.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name = "lendet")
@NoArgsConstructor
@AllArgsConstructor
public class Lenda {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String emri;
    private String ects;
    private boolean isObligative;

//    @OneToMany(mappedBy = "lenda")
//    private List<ProfesoriLenda> profesoriLendaList = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "semester_id")
    private Semester semester;

}
