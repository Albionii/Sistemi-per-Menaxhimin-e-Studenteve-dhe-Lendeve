package com.projekti.sistemimenaxhimittefakulltetit.entities;

import com.fasterxml.jackson.annotation.*;
import com.projekti.sistemimenaxhimittefakulltetit.repository.ProfesoriLendaRepository;
import jakarta.persistence.*;
import jdk.jfr.MemoryAddress;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table
public class ProfesoriLenda {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Professor professor;

    @ManyToOne
    private Lenda  lenda;


    @OneToMany
    private List<Assignment> assignments;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Materiali> materiali = new ArrayList<>();

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Postimi> postimet = new ArrayList<>();

    @OneToMany(mappedBy = "ligjerata", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Provimi> provimet;

    @ManyToOne
    private Semester semester;

    public ProfesoriLenda(Professor professor, Lenda lenda) {
        this.professor = professor;
        this.lenda = lenda;
    }
}

