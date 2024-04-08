package com.projekti.sistemimenaxhimittefakulltetit.controller;

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

import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api/student")
@RequiredArgsConstructor
public class StudentLigjerataController {
    private final StudentLigjerataService studentLigjerataService;
    private final UserService userService;
    private final StudentService studentService;
    private final VleresimiService vleresimiService;

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

    @GetMapping("mesataret/{id}")
    public List<Double[]> mesataretPerNote(@PathVariable Long id){
        return Collections.singletonList(vleresimiService.mesateretPerNote(id));
    }


}
