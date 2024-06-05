package com.projekti.sistemimenaxhimittefakulltetit.controller;

import com.projekti.sistemimenaxhimittefakulltetit.entities.StudentGrupi;
import com.projekti.sistemimenaxhimittefakulltetit.service.StudentGrupiService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/studentGrupi")
public class StudentGrupiController {

    private final StudentGrupiService studentGrupiService;

    @GetMapping("/{id}")
    public List<StudentGrupi> getGrupiByStudentId(@RequestHeader("Authorization")String jwt, Long id) throws Exception {
        return studentGrupiService.getGrupiByStudentId(jwt, id);
    }

    @PostMapping("/{grupiId}")
    public StudentGrupi studentGrupi(@RequestHeader("Authorization")String jwt,@PathVariable Long grupiId) throws Exception{
        return studentGrupiService.studentGrupi(jwt, grupiId);
    }

    @GetMapping("/byAfati/{afatiId}")
    public ResponseEntity<List<StudentGrupi>> getStudentGrupiByAfatiId(@PathVariable Long afatiId) {
        List<StudentGrupi> studentGrupet = studentGrupiService.getStudentGrupiByAfatiId(afatiId);
        return ResponseEntity.ok(studentGrupet);
    }

    @GetMapping("/exists")
    public List<StudentGrupi> getByAfatiAndStudentId(@RequestHeader("Authorization")String jwt) throws Exception{
        return studentGrupiService.getStudentByAfati(jwt);
    }

    @DeleteMapping
    public void deleteStudentGrypi(@RequestHeader("Authorization")String jwt) throws Exception{
        studentGrupiService.deleteByStudentId(jwt);
    }
}
