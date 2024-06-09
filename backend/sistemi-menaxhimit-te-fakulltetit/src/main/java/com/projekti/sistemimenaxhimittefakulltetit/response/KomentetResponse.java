package com.projekti.sistemimenaxhimittefakulltetit.response;

import com.projekti.sistemimenaxhimittefakulltetit.entities.Komenti;
import com.projekti.sistemimenaxhimittefakulltetit.entities.Postimi;
import lombok.Data;

import java.util.List;

@Data
public class KomentetResponse {
    private List<Komenti> komentet;
    private int start;
    private int end;
    private boolean hasMore;
}