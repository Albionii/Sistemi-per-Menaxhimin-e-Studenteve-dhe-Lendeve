package com.projekti.sistemimenaxhimittefakulltetit.entities;

import jakarta.persistence.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.antlr.v4.runtime.misc.NotNull;

import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Materiali {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    public String titulli;

    @NotNull
    private String mesazhi;

    @NotNull
    @Column(length = 500)
    private List<String> fileNames = new ArrayList<>();

}
