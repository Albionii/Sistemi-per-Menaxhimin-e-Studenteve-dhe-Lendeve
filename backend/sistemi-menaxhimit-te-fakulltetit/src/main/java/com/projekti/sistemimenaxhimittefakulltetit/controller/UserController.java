package com.projekti.sistemimenaxhimittefakulltetit.controller;

import com.projekti.sistemimenaxhimittefakulltetit.entities.*;

import com.projekti.sistemimenaxhimittefakulltetit.repository.AssignmentRepository;
import com.projekti.sistemimenaxhimittefakulltetit.repository.AssignmentSubmissionRepository;
import com.projekti.sistemimenaxhimittefakulltetit.service.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.expression.spel.ast.Assign;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Iterator;
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
    @Autowired
    private AssignmentRepository assignmentRepository;
    private StudentService studentService;
    private ProvimiService provimiService;
    private ProfesoriProvimiService profesoriProvimiService;


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


    @PostMapping()
    public User findUserByJWT(@RequestHeader("Authorization") String token) throws Exception {
        return userService.findUserByJwtToken(token);
    }


    @PostMapping("/submit/{id}")
    public List<AssignmentSubmission> submitAssignment(@PathVariable Long id,
                                                       @RequestBody AssignmentSubmission submitedAssignment,
                                                       @RequestHeader("Authorization") String token) throws Exception {

        User user = userService.findUserByJwtToken(token);

        List<AssignmentSubmission> list = assignmentService.submit(id, submitedAssignment, user);

        return list;
    }

    @DeleteMapping("/submit/delete/{id}")
    public Assignment deleteSubmission(@PathVariable Long id,
                                    @RequestHeader("Authorization") String token) throws Exception {

        User user = userService.findUserByJwtToken(token);

        return assignmentService.deleteAssignmentSubmission(id, user);
    }

    @PutMapping("/submit/update/{id}")
    public AssignmentSubmission updateSubmission(@PathVariable Long id,
                                                 @RequestBody AssignmentSubmission submission) {
        return assignmentService.updateAssignmentSubmission(id, submission);
    }


    @GetMapping("/get/postimi/{id}")
    public ResponseEntity<List<Assignment>> getAssignmentsOfPostimi(@PathVariable Long id) {
        return ResponseEntity.status(HttpStatus.OK).body(assignmentService.getAssignmentsOfPostimi(id));
    }

}
