package com.projekti.sistemimenaxhimittefakulltetit.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;

@Entity
@Table(name="semesters")
@Data
public class Semester {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private Date startDate;

    private Date endDate;

    @OneToMany(mappedBy = "semester")
    @JsonIgnore
    private Set<Grupi> grupet;

    @ManyToOne
    private Departamenti departamenti;


    @OneToMany(mappedBy = "semester")
    @JsonIgnore
    private Set<StudentSemester> studentSemester;


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
    @Override
    public String toString() {
        return "Semester{id=" + id + ", name='" + name + "', startDate=" + startDate + ", endDate=" + endDate + "}";
    }
}
