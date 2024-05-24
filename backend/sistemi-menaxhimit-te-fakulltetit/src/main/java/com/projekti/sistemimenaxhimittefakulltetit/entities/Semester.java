package com.projekti.sistemimenaxhimittefakulltetit.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Entity
@Table(name="semesters")
@Data
public class Semester {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private LocalDateTime startDate;

    private LocalDateTime endDate;

    @Override
    public int hashCode() {
        return Objects.hash(id, name, startDate, endDate);
    }

    @Override
    public boolean equals(Object obj) {
        if(this == obj) return true;
        if (!(obj instanceof Semester)) return false;
        Semester other = (Semester) obj;
        return Objects.equals(id, other.id) &&
                Objects.equals(name, other.name) &&
                Objects.equals(startDate, other.startDate) &&
                Objects.equals(endDate, other.endDate);
    }
}
