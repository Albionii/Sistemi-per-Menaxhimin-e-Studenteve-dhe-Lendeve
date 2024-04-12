package com.projekti.sistemimenaxhimittefakulltetit.controller;

import com.projekti.sistemimenaxhimittefakulltetit.entities.Lenda;
import com.projekti.sistemimenaxhimittefakulltetit.entities.Semester;
import com.projekti.sistemimenaxhimittefakulltetit.request.CreateLendaReq;
import com.projekti.sistemimenaxhimittefakulltetit.service.LendaService;
import com.projekti.sistemimenaxhimittefakulltetit.service.SemesterService;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/lenda")
public class LendaController {

    @Autowired
    private LendaService lendaService;

    @Autowired
    private SemesterService semesterService;

    @GetMapping("/{id}")
    public ResponseEntity<Lenda> findLendaById(@PathVariable Long id) throws Exception {
        Lenda lenda = lendaService.findLendaById(id);
        return new ResponseEntity<>(lenda, HttpStatus.FOUND);
    }

    @GetMapping
    public ResponseEntity<List<Lenda>> getLendet(){
        List<Lenda> lendet = lendaService.getLendet();
        return new ResponseEntity<>(lendet, HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<?> createLenda(@RequestBody CreateLendaReq request) throws Exception {
        Lenda createdLenda = lendaService.createLenda(request);
        return ResponseEntity.ok(createdLenda);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Lenda> updatelenda(@PathVariable Long id,
                                            @RequestBody CreateLendaReq request) throws Exception {

        Lenda lenda = lendaService.updateLenda(id, request);
        return ResponseEntity.status(HttpStatus.OK).body(lenda);
    }

    @PutMapping("/semester/{lendaId}")
    public ResponseEntity<Lenda> setSemester(@PathVariable Long lendaId,
                                             @RequestBody CreateLendaReq req) throws Exception {

        Lenda lenda = lendaService.updateLenda(lendaId, req);


        return ResponseEntity.status(HttpStatus.OK).body(lenda);
    }

    @DeleteMapping("/{id}")
    public void deleteLendaById(@PathVariable Long id){
        lendaService.deleteLenda(id);
    }
}
