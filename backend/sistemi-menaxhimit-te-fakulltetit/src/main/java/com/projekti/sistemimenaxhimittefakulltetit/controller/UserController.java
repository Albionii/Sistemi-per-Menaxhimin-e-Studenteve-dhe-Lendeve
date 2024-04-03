package com.projekti.sistemimenaxhimittefakulltetit.controller;

import com.projekti.sistemimenaxhimittefakulltetit.entities.Assignment;
import com.projekti.sistemimenaxhimittefakulltetit.entities.AssignmentSubmission;
import com.projekti.sistemimenaxhimittefakulltetit.entities.User;
import com.projekti.sistemimenaxhimittefakulltetit.repository.AssignmentSubmissionRepository;
import com.projekti.sistemimenaxhimittefakulltetit.service.AssignmentService;
import com.projekti.sistemimenaxhimittefakulltetit.service.UserService;
import org.antlr.v4.runtime.Token;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private AssignmentService assignmentService;

    @Autowired
    private AssignmentSubmissionRepository assignmentSubmissionRepository;


    @GetMapping("/{id}")
    public ResponseEntity<User> findUserById(@PathVariable Long id) throws Exception {
        User user = userService.findUserById(id);

        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<User>> allUsers(){
        List<User> users = userService.findAll();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @PostMapping("/submit/{id}")
    public List<AssignmentSubmission> submitAssignment(@PathVariable Long id,
                                                       @RequestBody AssignmentSubmission submitedAssignment,
                                                       @RequestHeader("Authorization") String token) throws Exception {

        List<AssignmentSubmission> list = assignmentService.submit(id, submitedAssignment, token);

        return list;

    }

    @DeleteMapping("/submit/delete/{id}")
    public void deleteSubmission(@PathVariable Long id,
                                    @RequestHeader("Authorization") String token) {
        assignmentSubmissionRepository.deleteById(id);

    }
}
