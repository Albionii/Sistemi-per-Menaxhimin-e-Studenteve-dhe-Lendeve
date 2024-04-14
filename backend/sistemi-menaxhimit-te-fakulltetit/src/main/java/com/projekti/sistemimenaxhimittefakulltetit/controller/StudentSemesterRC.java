package com.projekti.sistemimenaxhimittefakulltetit.controller;

import com.projekti.sistemimenaxhimittefakulltetit.entities.*;
import com.projekti.sistemimenaxhimittefakulltetit.repository.LendaRepository;
import com.projekti.sistemimenaxhimittefakulltetit.repository.SemesterRepository;
import com.projekti.sistemimenaxhimittefakulltetit.repository.StudentRepository;
import com.projekti.sistemimenaxhimittefakulltetit.request.SemesterRegistrationReq;
import com.projekti.sistemimenaxhimittefakulltetit.service.StudentSemesterRegistrationService;
import com.projekti.sistemimenaxhimittefakulltetit.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user/semester")
@RequiredArgsConstructor
public class StudentSemesterRC {

    private final StudentSemesterRegistrationService registrationService;
    private final StudentRepository studentRepository;
    private final SemesterRepository semesterRepository;
    private final LendaRepository lendaRepository;
    private final UserService userService;


    @PostMapping("/register")
    public ResponseEntity<?> registerStudentSemester(@RequestBody SemesterRegistrationReq req,
                                                     @RequestHeader("Authorization") String token) throws Exception {
        User user = userService.findUserByJwtToken(token);
        Student student = studentRepository.findStudentByUserId(user.getId());
        Semester semester = semesterRepository.findSemesterById(req.getSemester_id());

        if(student == null || semester == null) {
            return ResponseEntity.badRequest().build();
        }


        StudentSemesterRegistration registration = registrationService.registerStudentForSemester(student, semester);

        return ResponseEntity.ok(registration);
    }


}
