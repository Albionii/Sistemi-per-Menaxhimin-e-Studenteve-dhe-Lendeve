package com.projekti.sistemimenaxhimittefakulltetit.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import org.antlr.v4.runtime.misc.NotNull;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Data
@Entity
@Table(name = "lendet")
@NoArgsConstructor
@AllArgsConstructor
public class Lenda {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @NotNull
    private String emri;
    @NotNull
    private String ects;
    @NotNull
    private boolean isObligative;

//    @OneToMany(mappedBy = "lenda")
//    private List<ProfesoriLenda> profesoriLendaList = new ArrayList<>();

    @ManyToOne
    @JsonIgnore
    private Semester semester;

    @Override
    public int hashCode() {
        return Objects.hash(id, emri, ects, isObligative);
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (!(obj instanceof Lenda)) return false;
        Lenda other = (Lenda) obj;
        return Objects.equals(id, other.id) &&
                Objects.equals(emri, other.emri) &&
                Objects.equals(ects, other.ects) &&
                isObligative == other.isObligative;
    }

}
