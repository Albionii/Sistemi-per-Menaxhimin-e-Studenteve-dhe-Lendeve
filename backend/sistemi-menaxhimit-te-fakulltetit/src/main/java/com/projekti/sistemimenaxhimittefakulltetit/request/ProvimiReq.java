package com.projekti.sistemimenaxhimittefakulltetit.request;

import lombok.Data;

import java.util.Date;

@Data
public class ProvimiReq {
    public Long lenda_Id;
    public Date data;
    public String location;
}
