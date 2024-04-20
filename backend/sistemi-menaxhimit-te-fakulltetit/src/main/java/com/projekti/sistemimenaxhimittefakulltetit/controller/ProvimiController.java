package com.projekti.sistemimenaxhimittefakulltetit.controller;

import com.projekti.sistemimenaxhimittefakulltetit.entities.*;
import com.projekti.sistemimenaxhimittefakulltetit.request.ProvimiReq;
import com.projekti.sistemimenaxhimittefakulltetit.service.LendaService;
import com.projekti.sistemimenaxhimittefakulltetit.service.ProfesoriProvimiService;
import com.projekti.sistemimenaxhimittefakulltetit.service.ProfessorService;
import com.projekti.sistemimenaxhimittefakulltetit.service.ProvimiService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/admin/")
@AllArgsConstructor
public class ProvimiController {
    private final ProvimiService provimiService;
    private final LendaService lendaService;
    private final ProfessorService professorService;
    private final ProfesoriProvimiService profesoriProvimiService;

//    @PostMapping("provimi/create")
//    public ResponseEntity<Provimi> createProvimi(@RequestBody ProvimiReq request) throws Exception {
//
//
//        Lenda lenda = lendaService.findLendaById(request.getLenda_Id());
//
//
//        Provimi provimi = provimiService.createProvimi(lenda, request);
//
//        return ResponseEntity.status(HttpStatus.CREATED).body(provimi);
//    }
//
//    @PostMapping("provimi/profesori/{prov}/{prof}")
//    public ResponseEntity<ProfesoriProvimi> provimiProfesori(@PathVariable Long prov,
//                                 @PathVariable Long prof) throws Exception {
//        Optional<Provimi> provimi = provimiService.findProvimiById(prov);
//        Professor professor = professorService.findProfessorById(prof);
//
//        ProfesoriProvimi profesoriProvimi = profesoriProvimiService.add(professor, provimi);
//
//        return ResponseEntity.status(HttpStatus.OK).body(profesoriProvimi);
//    }

    @GetMapping("/{profId}")
    public ResponseEntity<List<ProfesoriProvimi>> getProvimet(@PathVariable Long profId) {
        Professor professor = professorService.findProfessorById(profId);
        List<ProfesoriProvimi> provimet = profesoriProvimiService.getProvimet(professor.getId());

        return ResponseEntity.status(HttpStatus.OK).body(provimet);
    }

    @DeleteMapping("provimi/delete/{id}")
    public void deleteProvimi(@PathVariable Long id) {
        provimiService.deleteProvimi(id);
    }
}
