package com.projekti.sistemimenaxhimittefakulltetit.entities;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name = "salla")
@NoArgsConstructor
@AllArgsConstructor
public class Salla {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String numriSalles;
    private String lokacioni;

}
