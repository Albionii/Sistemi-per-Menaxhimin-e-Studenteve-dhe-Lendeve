package com.projekti.sistemimenaxhimittefakulltetit.controller;

import com.projekti.sistemimenaxhimittefakulltetit.entities.StudentLigjerata;
import com.projekti.sistemimenaxhimittefakulltetit.service.StudentLigjerataService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("lendet")
@RequiredArgsConstructor
public class StudentLigjerataController {
    private final StudentLigjerataService studentLigjerataService;

    @GetMapping("{id}")
    public List<StudentLigjerata> findLendetByStudentId(@PathVariable Long id){
        return studentLigjerataService.findLendetByStudentId(id);
    }
}
