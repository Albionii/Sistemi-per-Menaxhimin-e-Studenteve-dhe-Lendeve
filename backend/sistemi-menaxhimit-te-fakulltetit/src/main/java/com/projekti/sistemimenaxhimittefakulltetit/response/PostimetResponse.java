package com.projekti.sistemimenaxhimittefakulltetit.response;

import com.projekti.sistemimenaxhimittefakulltetit.entities.Postimi;
import lombok.Data;

import java.util.List;

@Data
public class PostimetResponse {
    private List<Postimi> postimet;
    private int start;
    private int end;
    private boolean hasMore;
}