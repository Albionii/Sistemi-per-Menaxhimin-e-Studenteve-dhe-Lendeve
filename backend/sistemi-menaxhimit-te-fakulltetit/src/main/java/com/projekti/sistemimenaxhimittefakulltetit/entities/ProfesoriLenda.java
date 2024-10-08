package com.projekti.sistemimenaxhimittefakulltetit.entities;

import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

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

    @OneToMany(mappedBy = "ligjerata", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    @ToString.Exclude
    private List<Provimi> provimet;

    @ManyToOne
    private Semester semester;

}

