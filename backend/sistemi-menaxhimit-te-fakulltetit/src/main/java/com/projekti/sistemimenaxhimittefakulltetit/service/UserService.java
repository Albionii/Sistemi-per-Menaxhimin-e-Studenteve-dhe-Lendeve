package com.projekti.sistemimenaxhimittefakulltetit.service;

import com.projekti.sistemimenaxhimittefakulltetit.entities.User;

import java.util.List;

public interface UserService {

    User findUserById(Long id) throws Exception;

    List<User> findAll();

    User findUserByJwtToken(String jwt) throws Exception;

    User findUserByEmail(String email) throws Exception;
}
