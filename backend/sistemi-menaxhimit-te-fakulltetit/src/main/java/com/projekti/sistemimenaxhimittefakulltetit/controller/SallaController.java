package com.projekti.sistemimenaxhimittefakulltetit.controller;

import com.projekti.sistemimenaxhimittefakulltetit.entities.Lenda;
import com.projekti.sistemimenaxhimittefakulltetit.entities.ProfesoriLenda;
import com.projekti.sistemimenaxhimittefakulltetit.entities.Salla;
import com.projekti.sistemimenaxhimittefakulltetit.service.SallaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/salla")
public class SallaController {
    private final SallaService sallaService;

    @GetMapping
    public ResponseEntity<List<Salla>> findAllSallat(){
        return ResponseEntity.ok().body(sallaService.getAllSallat());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Salla> findSallaByID(@PathVariable Long id) throws Exception {
        Optional<Salla> salla = sallaService.getSallaByID(id);
        return ResponseEntity.ok().body(salla.get());
    }

    @PostMapping("/create")
    public ResponseEntity<Salla> createSalla(@RequestBody Salla salla) throws Exception {
        Salla createdSalla = sallaService.createSalla(salla);
        return ResponseEntity.ok().body(createdSalla);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Salla> updateSalla(@PathVariable Long id, @RequestBody Salla salla) {
        Salla updatedSalla = sallaService.updateSalla(id, salla);
        if (updatedSalla != null) {
            return new ResponseEntity<>(updatedSalla, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/delete/{id}")
    public void deleteSallaByID(@PathVariable Long id){
        sallaService.deleteSalla(id);
    }
}
