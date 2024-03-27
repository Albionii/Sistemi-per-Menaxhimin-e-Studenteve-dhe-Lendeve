package com.projekti.sistemimenaxhimittefakulltetit.controller;

import com.projekti.sistemimenaxhimittefakulltetit.entities.StudentLigjerata;
import com.projekti.sistemimenaxhimittefakulltetit.entities.User;
import com.projekti.sistemimenaxhimittefakulltetit.service.StudentLigjerataService;
import com.projekti.sistemimenaxhimittefakulltetit.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/student")
@RequiredArgsConstructor
public class StudentLigjerataController {
    private final StudentLigjerataService studentLigjerataService;
    private final UserService userService;

    @GetMapping("{id}")
    public List<StudentLigjerata> findLendetByStudentId(@PathVariable Long id){
        return studentLigjerataService.findLendetByStudentId(id);
    }

    @PostMapping("enroll/{id}")
    public ResponseEntity<StudentLigjerata> enrollment(
            @RequestHeader("Authorization") String jwt,
            @PathVariable Long id
    )throws Exception{
        User student = userService.findUserByJwtToken(jwt);

        StudentLigjerata sl = studentLigjerataService.enroll(id, student);
        return new ResponseEntity<>(sl, HttpStatus.OK);
    }

}
