package com.projekti.sistemimenaxhimittefakulltetit.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Lajmi {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String mesazhi;

    @ManyToOne
    @JoinColumn(name = "departamenti_id")
    private Departamenti departamenti;
}
