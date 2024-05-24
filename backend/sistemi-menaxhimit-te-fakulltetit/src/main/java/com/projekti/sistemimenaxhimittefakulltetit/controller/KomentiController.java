package com.projekti.sistemimenaxhimittefakulltetit.controller;


import com.projekti.sistemimenaxhimittefakulltetit.entities.Komenti;
import com.projekti.sistemimenaxhimittefakulltetit.entities.Postimi;
import com.projekti.sistemimenaxhimittefakulltetit.entities.Salla;
import com.projekti.sistemimenaxhimittefakulltetit.service.KomentiService;
import com.projekti.sistemimenaxhimittefakulltetit.service.PostimiService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/komenti")
public class KomentiController {
    private final KomentiService komentiService;
    private final PostimiService postimiService;

    @GetMapping("/postimi/{postID}")
    public ResponseEntity<List<Komenti>> findAllKomentet(@PathVariable Long postID){
        Postimi postimi = postimiService.findPostimiById(postID);
        return ResponseEntity.ok().body(postimi.getKomentet());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Komenti> findKomentiByID(@PathVariable Long id) throws Exception {
        Optional<Komenti> komenti = komentiService.getKomentiByID(id);
        return ResponseEntity.ok().body(komenti.get());
    }

    @PostMapping("/create")
    public ResponseEntity<Komenti> createKomenti(@RequestBody Komenti komenti) throws Exception {
        Komenti createdKomenti = komentiService.createKomenti(komenti);
        return ResponseEntity.ok().body(createdKomenti);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Komenti> updateKomenti(@PathVariable Long id, @RequestBody Komenti komenti) {
        Komenti updatedKomenti = komentiService.updateKomenti(id, komenti);
        if (updatedKomenti != null) {
            return new ResponseEntity<>(updatedKomenti, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/delete/{id}")
    public void deleteKomentiByID(@PathVariable Long id){
        komentiService.deleteKomenti(id);
    }
}
