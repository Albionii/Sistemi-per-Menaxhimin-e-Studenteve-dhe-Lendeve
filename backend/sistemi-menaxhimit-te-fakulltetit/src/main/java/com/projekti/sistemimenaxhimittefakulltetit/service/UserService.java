package com.projekti.sistemimenaxhimittefakulltetit.service;

import com.projekti.sistemimenaxhimittefakulltetit.entities.Assignment;
import com.projekti.sistemimenaxhimittefakulltetit.entities.User;

import java.util.List;

public interface UserService {

    User findUserById(Long id) throws Exception;

    List<User> findAll();

    User findUserByJwtToken(String token) throws Exception;
    Assignment deleteAssignmentSubmission(Long id, String token) throws Exception;

    User findUserByEmail(String email);

    void deleteUserById(Long id);

    User updateRole(Long id, User user) throws Exception;

}
