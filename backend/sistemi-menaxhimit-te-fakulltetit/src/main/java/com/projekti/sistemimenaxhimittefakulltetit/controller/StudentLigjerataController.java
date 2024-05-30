package com.projekti.sistemimenaxhimittefakulltetit.controller;
import com.projekti.sistemimenaxhimittefakulltetit.entities.*;
import com.projekti.sistemimenaxhimittefakulltetit.service.*;
import com.projekti.sistemimenaxhimittefakulltetit.entities.Student;
import com.projekti.sistemimenaxhimittefakulltetit.entities.StudentLigjerata;
import com.projekti.sistemimenaxhimittefakulltetit.entities.User;
import com.projekti.sistemimenaxhimittefakulltetit.entities.Vleresimi;
import com.projekti.sistemimenaxhimittefakulltetit.service.StudentLigjerataService;
import com.projekti.sistemimenaxhimittefakulltetit.service.StudentService;
import com.projekti.sistemimenaxhimittefakulltetit.service.UserService;
import com.projekti.sistemimenaxhimittefakulltetit.service.VleresimiService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api/student")
@RequiredArgsConstructor
public class StudentLigjerataController {
    private final StudentLigjerataService studentLigjerataService;
    private final UserService userService;
    private final StudentService studentService;
    private final LendaService lendaService;
    private final StudentSemesterRegistrationService studentSemesterRegistrationService;
    private final VleresimiService vleresimiService;
    private final SemesterService semesterService;


    @GetMapping("{id}")
    public List<StudentLigjerata> findLendetByStudentId(
            @RequestHeader("Authorization") String jwt,
            @PathVariable Long id){
        return studentLigjerataService.findLendetByStudentId(id);
    }

    @GetMapping("/mesatarja/{id}")
    public Double notaMesatare(@PathVariable Long id){
        return vleresimiService.notaMesatare(id);
    }

    @GetMapping("/notat/{id}")
    public List<Vleresimi> getAllNotat(@PathVariable Long id){
        return vleresimiService.getAllNotat(id);
    }

    @DeleteMapping("{id}")
    public void refuzoNoten(@PathVariable Long id){
        vleresimiService.refuzoNoten(id);
    }

    @PostMapping("/enroll/{id}")
    public ResponseEntity<StudentLigjerata> enrollment(
            @PathVariable Long id,
            @RequestHeader("Authorization") String jwt

    )throws Exception{

        User student1 = userService.findUserByJwtToken(jwt);
        Student student = studentService.findStudentByUserId(student1.getId());

        StudentLigjerata sl = studentLigjerataService.enroll(id, student);
        return new ResponseEntity<>(sl, HttpStatus.OK);
    }

    @DeleteMapping("/unenroll/{id}")
    public void unEnroll(@PathVariable Long id,
                                     @RequestHeader("Authorization")String token) throws Exception {
        User user = userService.findUserByJwtToken(token);
        Student student = studentService.findStudentByUserId(user.getId());
        studentLigjerataService.unEnroll(id, student);
    }

    @GetMapping("/get/enrollments/{semesterId}")
    public List<StudentLigjerata> getEnrollments(@PathVariable Long semesterId,
                                                 @RequestHeader("Authorization")String token) throws Exception {
        User user = userService.findUserByJwtToken(token);
        Semester semester = semesterService.getSemester(semesterId);

        List<StudentLigjerata> enrollments =  studentLigjerataService.findLendetByStudentId(user.getId());

        List<StudentLigjerata> response = new ArrayList<>();

        for (StudentLigjerata enroll : enrollments) {
            if(enroll.getLigjerata().getSemester().getId() == semester.getId()) {
                response.add(enroll);
            }
        }
        return response;
    }


    @GetMapping("mesataret/{id}")
    public List<Double[]> mesataretPerNote(@PathVariable Long id){
        return Collections.singletonList(vleresimiService.mesateretPerNote(id));
    }



}
