package com.projekti.sistemimenaxhimittefakulltetit.controller;

import com.projekti.sistemimenaxhimittefakulltetit.entities.*;
import com.projekti.sistemimenaxhimittefakulltetit.repository.LendaRepository;
import com.projekti.sistemimenaxhimittefakulltetit.repository.SemesterRepository;
import com.projekti.sistemimenaxhimittefakulltetit.repository.StudentRepository;
import com.projekti.sistemimenaxhimittefakulltetit.service.StudentSemesterRegistrationService;
import com.projekti.sistemimenaxhimittefakulltetit.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/student/semester")
@RequiredArgsConstructor
public class StudentSemesterRC {

    private final StudentSemesterRegistrationService registrationService;
    private final StudentRepository studentRepository;
    private final SemesterRepository semesterRepository;
    private final LendaRepository lendaRepository;
    private final UserService userService;


    @PostMapping("/register")
    public ResponseEntity<?> registerStudentSemester(@RequestBody StudentSemester studentSemester,
                                                     @RequestHeader("Authorization") String token) throws Exception {
        StudentSemester reg = registrationService.registerStudentForSemester(token, studentSemester);

        return new ResponseEntity<>(reg, HttpStatus.OK);
    }

    @GetMapping("/byAfati/{afatiId}")
    public ResponseEntity<List<StudentSemester>> getStudentSemestersByAfatiId(@PathVariable Long afatiId) {
        List<StudentSemester> studentSemesters = registrationService.getStudentSemestersByAfatiId(afatiId);
        return ResponseEntity.ok(studentSemesters);
    }

    @GetMapping("/exists")
    public List<StudentSemester> getByAfatiAndStudentId(@RequestHeader("Authorization")String jwt) throws Exception{
        return registrationService.getStudentByAfati(jwt);
    }

    @DeleteMapping
    public void deleteStudentGrypi(@RequestHeader("Authorization")String jwt) throws Exception{
        registrationService.deleteByStudentId(jwt);
    }


}
