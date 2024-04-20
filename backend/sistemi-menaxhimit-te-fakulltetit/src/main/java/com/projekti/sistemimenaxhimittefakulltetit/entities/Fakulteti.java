package com.projekti.sistemimenaxhimittefakulltetit.entities;


import jakarta.persistence.*;
import lombok.*;
import org.antlr.v4.runtime.misc.NotNull;

@Entity
@Table(name = "fakulteti")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Fakulteti {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private String emri;
    @NotNull
    private String lokacioni;
    @NotNull
    private String email;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "drejtori_id", referencedColumnName = "id")
    private User user;

}
