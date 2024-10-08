package com.projekti.sistemimenaxhimittefakulltetit.entities;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Orari {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @ManyToOne
    private Grupi grupi;
}
