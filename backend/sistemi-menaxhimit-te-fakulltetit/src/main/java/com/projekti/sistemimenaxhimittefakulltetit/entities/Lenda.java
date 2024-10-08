package com.projekti.sistemimenaxhimittefakulltetit.entities;

import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import org.antlr.v4.runtime.misc.NotNull;

import java.util.List;

@Data
@Entity
@Table(name = "lendet")
@NoArgsConstructor
@AllArgsConstructor
//@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Lenda {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotNull
    private String kodi;
    @NotNull
    private String emri;
    @NotNull
    private Integer ects;
    @NotNull
    private boolean isObligative;

    @OneToMany(mappedBy = "lenda", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<ProfesoriLenda> profesoriLendet;



    @Override
    public String toString() {
        return "Lenda{" +
                "id=" + id +
                ", kodi='" + kodi + '\'' +
                ", emri='" + emri + '\'' +
                ", ects='" + ects + '\'' +
                ", isObligative=" + isObligative +
                '}';
    }

}
