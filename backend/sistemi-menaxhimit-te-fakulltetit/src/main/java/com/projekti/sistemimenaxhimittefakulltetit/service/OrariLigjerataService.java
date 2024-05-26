package com.projekti.sistemimenaxhimittefakulltetit.service;

import com.projekti.sistemimenaxhimittefakulltetit.entities.*;
import com.projekti.sistemimenaxhimittefakulltetit.repository.OrariLigjerataRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OrariLigjerataService {
    private final OrariLigjerataRepository orariLigjerataRepository;
    private final OrariService orariService;
    private final GrupiService grupiService;
    private final StudentGrupiService studentGrupiService;
    private final StudentService studentService;
    private final UserService userService;

    public List<OrariLigjerata> getByOrariId(Long id){
        return orariLigjerataRepository.findByOrariId(id);
    }

//    public List<OrariLigjerata> getOrariByStudentId(String jwt) throws Exception {
//        Long studentId = userService.findUserByJwtToken(jwt).getId();
//
//        Student student = studentService.findStudentByUserId(studentId);
//
////        List<OrariLigjerata> orariLigjerata = orariLigjerataRepository.findOrariLigjerataByStudentId(student.getId());
//
//        return orariLigjerata;
//    }
}
