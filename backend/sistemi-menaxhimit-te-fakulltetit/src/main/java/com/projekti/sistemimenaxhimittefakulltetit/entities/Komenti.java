package com.projekti.sistemimenaxhimittefakulltetit.entities;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name = "komenti")
@NoArgsConstructor
@AllArgsConstructor
public class Komenti {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String teksti;

    @ManyToOne
    private User userID;

    @ManyToOne
    private Postimi postimi;
}
