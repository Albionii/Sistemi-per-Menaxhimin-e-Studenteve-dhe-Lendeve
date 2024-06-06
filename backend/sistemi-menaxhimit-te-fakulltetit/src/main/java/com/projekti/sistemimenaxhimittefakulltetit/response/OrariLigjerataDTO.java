package com.projekti.sistemimenaxhimittefakulltetit.response;

import lombok.AllArgsConstructor;
import lombok.Data;


@Data
@AllArgsConstructor
public class OrariLigjerataDTO {
    String ligjerata;
    String salla;
    String ora;
    String emri;
}
