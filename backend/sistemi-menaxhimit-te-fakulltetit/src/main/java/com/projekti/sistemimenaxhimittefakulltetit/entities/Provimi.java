package com.projekti.sistemimenaxhimittefakulltetit.entities;

import com.projekti.sistemimenaxhimittefakulltetit.service.ProvimiService;
import com.projekti.sistemimenaxhimittefakulltetit.service.StudentSemesterRegistrationService;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Set;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Table(name="Provimet")
public class Provimi {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "lenda_id", unique = true)
    private Lenda lenda;

    @Temporal(TemporalType.TIMESTAMP)
    private Date data;

    private String location;

}
