package com.projekti.sistemimenaxhimittefakulltetit.controller;

import com.projekti.sistemimenaxhimittefakulltetit.entities.StudentGrupi;
import com.projekti.sistemimenaxhimittefakulltetit.service.StudentGrupiService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
