package com.projekti.sistemimenaxhimittefakulltetit.controller;


import com.projekti.sistemimenaxhimittefakulltetit.entities.Ankesat;
import com.projekti.sistemimenaxhimittefakulltetit.entities.Lenda;
import com.projekti.sistemimenaxhimittefakulltetit.service.AnkesatService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/ankesa")
@RequiredArgsConstructor
public class AnkesaController {
    private final AnkesatService ankesatService;
    @GetMapping
    public ResponseEntity<List<Ankesat>> getAllAnkesat(){
        List<Ankesat> ankesat = ankesatService.getAllAnkesat();
        return ResponseEntity.ok().body(ankesat);
    }
    @GetMapping("/{id}")
    public ResponseEntity<Ankesat> getAnkesaByID(@PathVariable Long id){
        Optional<Ankesat> ankesa = ankesatService.getAnkesaByID(id);
        return ResponseEntity.ok().body(ankesa.get());
    }

    @PostMapping("/create")
    public ResponseEntity<Ankesat> createAnkesa(@RequestBody Ankesat ankesat) throws Exception {
        Ankesat createdAnkesa = ankesatService.createAnkesat(ankesat);
        return ResponseEntity.ok().body(createdAnkesa);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Ankesat> updateAnkesa(@PathVariable Long id, @RequestBody Ankesat a) {
        Ankesat ankesa = ankesatService.updateAnkesa(id, a);
        if (ankesa != null) {
            return new ResponseEntity<>(ankesa, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/delete/{id}")
    public void deleteAnkesaByID(@PathVariable Long id){
        ankesatService.deleteAnkesat(id);
    }



}
