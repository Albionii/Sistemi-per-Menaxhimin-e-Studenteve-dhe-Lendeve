package com.projekti.sistemimenaxhimittefakulltetit.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "Student_Semester_Registration")
@Data
public class StudentSemesterRegistration {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "student_id")
    private Student student;

    @ManyToOne
    @JoinColumn(name="semester_id")
    private Semester semester;


    @ManyToMany
    @JoinTable (
            name = "student_course_registration",
            joinColumns = @JoinColumn(name="registration_id"),
            inverseJoinColumns = @JoinColumn(name="lenda_id")
    )
    private Set<Lenda> lendet = new HashSet<>();

    private LocalDateTime registrationDate;
}
