package com.projekti.sistemimenaxhimittefakulltetit.request;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class PostimiReq {
    private String titulli;
    private LocalDateTime data_Postimit;
}
