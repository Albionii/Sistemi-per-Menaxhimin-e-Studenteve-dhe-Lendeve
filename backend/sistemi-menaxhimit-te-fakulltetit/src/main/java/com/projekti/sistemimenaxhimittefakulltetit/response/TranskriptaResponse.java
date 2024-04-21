package com.projekti.sistemimenaxhimittefakulltetit.response;

import com.projekti.sistemimenaxhimittefakulltetit.entities.StudentProvimi;
import lombok.Data;

import java.util.List;

@Data
public class TranskriptaResponse {
    private List<StudentProvimi> transkripta;
    private Double mesatarja;
}
