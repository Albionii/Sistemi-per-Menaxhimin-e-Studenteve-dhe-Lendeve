package com.projekti.sistemimenaxhimittefakulltetit.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.projekti.sistemimenaxhimittefakulltetit.entities.*;

import com.projekti.sistemimenaxhimittefakulltetit.repository.AssignmentRepository;
import com.projekti.sistemimenaxhimittefakulltetit.repository.AssignmentSubmissionRepository;
import com.projekti.sistemimenaxhimittefakulltetit.service.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.AutoConfigureOrder;
import org.springframework.expression.spel.ast.Assign;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;

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

    @Autowired
    private ProfesoriLendaService profesoriLendaService;

    @Autowired
    private StudentService studentService;
    private ProvimiService provimiService;
    private ProfesoriProvimiService profesoriProvimiService;

    @Autowired
    private SemesterService semesterService;

    @Autowired
    private FileStorageService fileStorageService;


    @GetMapping("/{id}")
    public ResponseEntity<User> findUserById(@PathVariable Long id) throws Exception {
        User user = userService.findUserById(id);

        return new ResponseEntity<>(user, HttpStatus.OK);
    }



    @PostMapping()
    public User findUserByJWT(@RequestHeader("Authorization") String token) throws Exception {
        return userService.findUserByJwtToken(token);
    }




    @GetMapping("/get/user/info")
    public Student getUserInfo(@RequestHeader("Authorization")String token) throws Exception {

        Student student = studentService.findStudentByUserId(userService.findUserByJwtToken(token).getId());
        return student;
    }


    @GetMapping("assignment/get/ligjerata/{id}")
    public ResponseEntity<List<Assignment>> getAssignmentsOfLigjerata(@PathVariable Long id) {
        return ResponseEntity.status(HttpStatus.OK).body(assignmentService.getAssignmentsOfLigjerata(id));
    }

    @GetMapping("/get/submission/{assignmentID}")
    public ResponseEntity<AssignmentSubmission> getSubmissionByUser(@PathVariable Long assignmentID,
                                                                    @RequestHeader("Authorization") String token) throws Exception {
        User user = userService.findUserByJwtToken(token);
        return ResponseEntity.status(HttpStatus.OK).body(assignmentService.findSubmissionByUser(user, assignmentID));
    }



    @GetMapping("materiali/get/{ligjerataId}")
    public ResponseEntity<List<Materiali>> getMaterialiOfLenda(@PathVariable Long ligjerataId) {
        Optional<ProfesoriLenda> profesoriLenda =profesoriLendaService.findById(ligjerataId);

        if (profesoriLenda.isPresent()) {
            return ResponseEntity.status(HttpStatus.OK).body(profesoriLenda.get().getMateriali());
        }
        return  ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }

    @GetMapping("/semester/{departamentiId}")
    public List<Semester> getByDepartamentiId(@PathVariable Long departamentiId){
        return semesterService.getByDepartamentiId(departamentiId);
    }


}
