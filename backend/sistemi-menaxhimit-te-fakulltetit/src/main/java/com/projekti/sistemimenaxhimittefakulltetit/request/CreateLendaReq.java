package com.projekti.sistemimenaxhimittefakulltetit.request;

import com.projekti.sistemimenaxhimittefakulltetit.entities.Semester;
import lombok.Data;

@Data
public class CreateLendaReq {
    private String emri;
    private String ects;
    private boolean isObligative;
    private Long semester_id;
}

