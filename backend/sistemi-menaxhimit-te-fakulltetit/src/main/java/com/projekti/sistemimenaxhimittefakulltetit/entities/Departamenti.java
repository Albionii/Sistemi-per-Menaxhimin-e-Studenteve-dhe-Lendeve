package com.projekti.sistemimenaxhimittefakulltetit.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.antlr.v4.runtime.misc.NotNull;


@Entity
@Table(name = "departamenti")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Departamenti {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotNull
    private String emri;
    @NotNull
    private String lokacioni;
    @NotNull
    private String email;

    @ManyToOne
    @JoinColumn(name = "fakulteti_id")
    private Fakulteti fakulteti;

    @OneToOne
    @JoinColumn(name = "dekani_id")
    private User user;




}
