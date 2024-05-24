package com.projekti.sistemimenaxhimittefakulltetit.request;

import lombok.Data;
import org.springframework.cglib.core.Local;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class AssignmentResponse {

    private String titulli;
    private String mesazhi;
    private LocalDateTime expireAt;
    private List<String> fileNames;
}
