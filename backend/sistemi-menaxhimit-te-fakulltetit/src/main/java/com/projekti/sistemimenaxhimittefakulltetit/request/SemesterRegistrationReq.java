package com.projekti.sistemimenaxhimittefakulltetit.request;

import lombok.Data;
import org.antlr.v4.runtime.misc.NotNull;

import java.util.Set;

@Data
public class SemesterRegistrationReq {

    @NotNull
    private Long semester_id;

}
