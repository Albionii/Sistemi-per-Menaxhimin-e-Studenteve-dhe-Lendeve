package com.projekti.sistemimenaxhimittefakulltetit.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Grupi {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String emri;

    @ManyToOne
    private Semester semester;

    private int hapesira;

    public void decreaseAvailableSpaces() {
        if (hapesira > 0) {
            hapesira--;
        } else {
            throw new IllegalStateException("No available spaces left in the group.");
        }
    }
}
