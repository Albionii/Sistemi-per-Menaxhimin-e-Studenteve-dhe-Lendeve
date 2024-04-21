package com.projekti.sistemimenaxhimittefakulltetit.request;

import com.projekti.sistemimenaxhimittefakulltetit.entities.StudentProvimi;
import com.projekti.sistemimenaxhimittefakulltetit.entities.Vleresimi;
import lombok.Data;

@Data
public class CreateStudentProvimRequest {
    private Long id;
    private int Nota;
}
