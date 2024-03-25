package com.projekti.sistemimenaxhimittefakulltetit.controller;

import com.projekti.sistemimenaxhimittefakulltetit.entities.Lenda;
import com.projekti.sistemimenaxhimittefakulltetit.service.LendaService;
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

    @GetMapping("/{id}")
    public ResponseEntity<Lenda> findLendaById(@RequestParam Long id) throws Exception {
        Lenda lenda = lendaService.findLendaById(id);
        return new ResponseEntity<>(lenda, HttpStatus.FOUND);
    }

    @GetMapping
    public ResponseEntity<List<Lenda>> getLendet(){
        List<Lenda> lendet = lendaService.getLendet();
        return new ResponseEntity<>(lendet, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteLendaById(@RequestParam Long id){
        lendaService.deleteLenda(id);
    }
}
