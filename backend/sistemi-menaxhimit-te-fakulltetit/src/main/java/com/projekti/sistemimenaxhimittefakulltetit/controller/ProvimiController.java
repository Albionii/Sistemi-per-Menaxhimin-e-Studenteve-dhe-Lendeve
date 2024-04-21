package com.projekti.sistemimenaxhimittefakulltetit.controller;

import com.projekti.sistemimenaxhimittefakulltetit.entities.*;
import com.projekti.sistemimenaxhimittefakulltetit.request.ProvimiReq;
import com.projekti.sistemimenaxhimittefakulltetit.service.*;
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
    private final ProfesoriLendaService profesoriLendaService;

    @PostMapping("provimi/create")
    public ResponseEntity<Provimi> createProvimi(@RequestBody ProvimiReq request) throws Exception {


//        Lenda lenda = lendaService.findLendaById(request.getLenda_Id());

        Optional<ProfesoriLenda> profesoriLenda = profesoriLendaService.findById(request.getLenda_Id());

        Provimi provimi = provimiService.createProvimi(profesoriLenda.get(), request);

        return ResponseEntity.status(HttpStatus.CREATED).body(provimi);
    }



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
