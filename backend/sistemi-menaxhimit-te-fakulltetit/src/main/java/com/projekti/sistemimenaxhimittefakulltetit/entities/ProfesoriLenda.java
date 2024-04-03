package com.projekti.sistemimenaxhimittefakulltetit.entities;

import com.projekti.sistemimenaxhimittefakulltetit.repository.ProfesoriLendaRepository;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table
public class ProfesoriLenda {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Professor professor;
    @ManyToOne
    private Lenda lenda;

    @OneToMany
    private List<Assignment> assignments;

    public ProfesoriLenda(Professor professor, Lenda lenda) {
        this.professor = professor;
        this.lenda = lenda;
    }
}
