package com.projekti.sistemimenaxhimittefakulltetit.response;

import com.projekti.sistemimenaxhimittefakulltetit.entities.Provimi;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class ProvimiResponse {
    private String emriLendes;
    private List<Provimi> provimet = new ArrayList<>();
}
