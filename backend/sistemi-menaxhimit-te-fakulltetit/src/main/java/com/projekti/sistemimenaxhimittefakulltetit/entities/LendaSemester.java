package com.projekti.sistemimenaxhimittefakulltetit.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.antlr.v4.runtime.misc.NotNull;

import java.util.Objects;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LendaSemester {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "lenda_id")
    private Lenda lenda;

    @ManyToOne
    @JoinColumn(name = "semester_id")
    private Semester semester;

    @NotNull
    private String ects;

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (!(obj instanceof LendaSemester)) return false;
        LendaSemester other = (LendaSemester) obj;
        return Objects.equals(id, other.id) &&
                Objects.equals(lenda, other.lenda) &&
                Objects.equals(semester, other.semester) &&
                Objects.equals(ects, other.ects);
    }
}
