package com.projekti.sistemimenaxhimittefakulltetit.request;

import lombok.Data;

@Data
public class CreateStudentProvimRequest {
    private Long id;
    private Long provimi;
    private Long student;
}
