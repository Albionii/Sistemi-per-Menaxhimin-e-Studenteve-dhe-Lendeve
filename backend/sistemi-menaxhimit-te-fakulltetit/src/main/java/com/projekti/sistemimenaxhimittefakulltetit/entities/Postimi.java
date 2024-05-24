package com.projekti.sistemimenaxhimittefakulltetit.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.antlr.v4.runtime.misc.NotNull;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Postimi {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private User user;

    @NotNull
    private String titulli;

    @NotNull
    private String mesazhi;

    @NotNull
    private LocalDateTime data_Postimit;

    @OneToMany
    private List<Assignment> assignments;

    @OneToMany
    private List<Komenti> komentet;

}
