package com.projekti.sistemimenaxhimittefakulltetit.entities;

import jakarta.persistence.*;
import lombok.Data;
import org.springframework.cglib.core.Local;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Entity
@Data
@Table(name="assignments")
public class Assignment {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(nullable = false)
    private String titulli;

    private String mesazhi = null;

    @CreatedDate
    private LocalDateTime createdAt;
    @Column(nullable = false)
    private LocalDateTime expireAt;

    @ElementCollection
    @Column(length = 500)
    private List<String> fileNames;

    @ManyToOne
    @JoinColumn(name = "lenda_id")
    private Lenda lenda;

    @ManyToOne
    @JoinColumn(name = "created_by")
    @CreatedBy
    private User createdBy;

    @ManyToOne
    @JoinColumn(name = "updated_by")
    @LastModifiedBy
    private User updatedBy;

    @LastModifiedDate
    private LocalDateTime updatedAt = null;

}
