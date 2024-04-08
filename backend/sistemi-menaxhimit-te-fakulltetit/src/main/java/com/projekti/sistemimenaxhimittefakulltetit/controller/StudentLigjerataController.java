package com.projekti.sistemimenaxhimittefakulltetit.controller;

import com.projekti.sistemimenaxhimittefakulltetit.entities.*;
import com.projekti.sistemimenaxhimittefakulltetit.repository.StudentSemesterRegistrationRepository;
import com.projekti.sistemimenaxhimittefakulltetit.service.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/student")
@RequiredArgsConstructor
public class StudentLigjerataController {
    private final StudentLigjerataService studentLigjerataService;
    private final UserService userService;
    private final StudentService studentService;
    private final LendaService lendaService;
    private final StudentSemesterRegistrationService studentSemesterRegistrationService;

    @GetMapping("{id}")
    public List<StudentLigjerata> findLendetByStudentId(
            @RequestHeader("Authorization") String jwt,
            @PathVariable Long id){
        return studentLigjerataService.findLendetByStudentId(id);
    }

    @PostMapping("enroll/{id}")
    public ResponseEntity<StudentLigjerata> enrollment(
            @RequestHeader("Authorization") String jwt,
            @PathVariable Long id
    )throws Exception{

        User student1 = userService.findUserByJwtToken(jwt);
        Student student = studentService.findStudentByUserId(student1.getId());

        StudentLigjerata sl = studentLigjerataService.enroll(id, student);
        return new ResponseEntity<>(sl, HttpStatus.OK);
    }

    @PostMapping("course/enroll/{id}")
    public ResponseEntity<StudentSemesterRegistration> registerStudentForCourse(@PathVariable Long id,
                                                      @RequestHeader("Authorization")String token) throws Exception {

        User user = userService.findUserByJwtToken(token);
        System.out.println(user == null);

        Student student = studentService.findStudentByUserId(user.getId());
        System.out.println(student == null);

        Lenda lenda = lendaService.findLendaById(id);
        System.out.println(lenda == null);


        StudentSemesterRegistration enrollments = studentSemesterRegistrationService.EnrollStudent(lenda, student.getId());


        return new ResponseEntity<>(enrollments, HttpStatus.CREATED);
    }
}
