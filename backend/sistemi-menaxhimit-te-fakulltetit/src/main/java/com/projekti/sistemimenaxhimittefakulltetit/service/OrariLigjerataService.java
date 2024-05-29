package com.projekti.sistemimenaxhimittefakulltetit.service;

import com.projekti.sistemimenaxhimittefakulltetit.entities.*;
import com.projekti.sistemimenaxhimittefakulltetit.repository.OrariLigjerataRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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
    private final StudentSemesterRegistrationService studentSemesterRegistrationService;

    public List<OrariLigjerata> getByOrariId(Long id){
        return orariLigjerataRepository.findByOrariId(id);
    }

//    public List<OrariLigjerata> getOrariLigjertaByDita(String jwt, String dita) throws Exception {
//        StudentSemester studentSemester = studentSemesterRegistrationService.findSemesterByStudent(jwt);
//        Grupi grupi = (Grupi) grupiService.getGrupiBySemesterId(studentSemester.getSemester().getId());
//        Orari orari = (Orari) orariService.findByGrupiId(grupi.getId());
//        List<OrariLigjerata> orariLigjerata = orariLigjerataRepository.findByOrariId(orari.getId());
//
//        List<OrariLigjerata> orariLigjeratat = new ArrayList<>();
//
//        for(OrariLigjerata orariLigjerata1 : orariLigjerata){
//            if(orariLigjerata1.getDita().equals(dita)){
//                orariLigjeratat.add(orariLigjerata1);
//            }
//        }
//        return orariLigjeratat;
//    }


    public List<OrariLigjerata> getOrariByDita(String dita, String jwt) throws Exception {
        Long studentId = userService.findUserByJwtToken(jwt).getId();

        Student student = studentService.findStudentByUserId(studentId);


        return orariLigjerataRepository.findByDita(dita, student.getId());
    }
}
