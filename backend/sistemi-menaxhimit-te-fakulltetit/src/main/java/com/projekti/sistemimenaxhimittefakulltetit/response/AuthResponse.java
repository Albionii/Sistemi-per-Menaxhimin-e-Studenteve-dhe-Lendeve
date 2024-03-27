package com.projekti.sistemimenaxhimittefakulltetit.response;

import com.projekti.sistemimenaxhimittefakulltetit.entities.USER_ROLE;
import lombok.Data;

@Data
public class AuthResponse {
    private String jwt;
    private String message;
    private USER_ROLE role;
}
