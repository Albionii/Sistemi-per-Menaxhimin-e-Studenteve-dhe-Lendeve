package com.projekti.sistemimenaxhimittefakulltetit.request;

import lombok.Data;

@Data
public class CreateLendaReq {
    private String emri;
    private String ects;
    private boolean isObligative;
}

