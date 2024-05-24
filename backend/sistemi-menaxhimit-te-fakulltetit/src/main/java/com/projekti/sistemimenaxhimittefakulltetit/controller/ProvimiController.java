package com.projekti.sistemimenaxhimittefakulltetit.controller;

import com.projekti.sistemimenaxhimittefakulltetit.entities.*;
import com.projekti.sistemimenaxhimittefakulltetit.service.*;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/admin/provimi")
@AllArgsConstructor
public class ProvimiController {
    private final ProvimiService provimiService;
    private final LendaService lendaService;
    private final ProfessorService professorService;
    private final ProfesoriProvimiService profesoriProvimiService;
    private final ProfesoriLendaService profesoriLendaService;

//    @PostMapping("/create")
//    public ResponseEntity<Provimi> createProvimi(@RequestBody ProvimiReq request) throws Exception {
//
//        Optional<ProfesoriLenda> profesoriLenda = profesoriLendaService.findById(request.getLenda_Id());
//
//        Provimi provimi = provimiService.createProvimi(profesoriLenda.get(), request);
//
//        return ResponseEntity.status(HttpStatus.CREATED).body(provimi);
//    }

    @PostMapping("/create")
    public ResponseEntity<Provimi> createProvimi(@RequestBody Provimi p) throws Exception {
        Provimi provimi = provimiService.createProvimi(p);
        return ResponseEntity.ok().body(provimi);
    }

    @GetMapping
    public ResponseEntity<List<Provimi>> getAllProvimet(){
        List<Provimi> p = provimiService.getAllProvimet();
        return ResponseEntity.ok().body(p);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Provimi>> findProvimiByID(@PathVariable Long id) throws Exception {
        Optional<Provimi> provimi = provimiService.findProvimiById(id);
        return ResponseEntity.ok().body(provimi);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteByProvimiID(@PathVariable Long id){
        provimiService.deleteProvimi(id);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Provimi> updateProvimiByID(@PathVariable Long id, @RequestBody Provimi p) {
        Provimi provimi = provimiService.updateProvimiByID(id, p);
        if (provimi != null) {
            return new ResponseEntity<>(provimi, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/mockForm")
    public ResponseEntity<Provimi> getProvimet(){
        Provimi p = new Provimi();
        return ResponseEntity.ok().body(p);
    }





//    @GetMapping("/{profId}")
//    public ResponseEntity<List<ProfesoriProvimi>> getProvimet(@PathVariable Long profId) {
//        Professor professor = professorService.findProfessorById(profId);
//        List<ProfesoriProvimi> provimet = profesoriProvimiService.getProvimet(professor.getId());
//
//        return ResponseEntity.status(HttpStatus.OK).body(provimet);
//    }
//
//    @DeleteMapping("provimi/delete/{id}")
//    public void deleteProvimi(@PathVariable Long id) {
//        provimiService.deleteProvimi(id);
//    }
}
