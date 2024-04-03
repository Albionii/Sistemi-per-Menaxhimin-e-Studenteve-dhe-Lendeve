package com.projekti.sistemimenaxhimittefakulltetit.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "Assignment_Submissions")
public class AssignmentSubmission {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @ManyToOne(cascade = CascadeType.ALL)
    private User submiter;

    @JsonIgnore
    @ManyToOne(cascade = CascadeType.ALL)
    private Assignment assignment;

    private String mesazhi;

    private LocalDateTime submitedAt;

    @ElementCollection
    @Column(length = 500)
    private List<String> fileNames;

}
