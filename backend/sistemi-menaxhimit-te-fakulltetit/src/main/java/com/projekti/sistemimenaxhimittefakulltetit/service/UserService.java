package com.projekti.sistemimenaxhimittefakulltetit.service;

import com.projekti.sistemimenaxhimittefakulltetit.entities.User;

import java.util.List;

public interface UserService {

    User findUserById(Long id) throws Exception;

    List<User> findAll();
}
