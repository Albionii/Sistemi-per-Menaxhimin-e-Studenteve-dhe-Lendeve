package com.projekti.sistemimenaxhimittefakulltetit.entities;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Entity
@Table(name = "ankesat")
@NoArgsConstructor
@AllArgsConstructor
public class Ankesat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String permbajtja;
    private LocalDate data;

    @ManyToOne
    private User userID;


}
