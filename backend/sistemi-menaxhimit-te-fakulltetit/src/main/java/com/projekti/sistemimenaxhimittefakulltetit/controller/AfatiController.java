package com.projekti.sistemimenaxhimittefakulltetit.controller;

import com.projekti.sistemimenaxhimittefakulltetit.entities.Afati;
import com.projekti.sistemimenaxhimittefakulltetit.service.AfatiService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/afati")
@RequiredArgsConstructor
public class AfatiController {
    private final AfatiService afatiService;
    @PostMapping
    public ResponseEntity<Afati> createAfati(@RequestBody Afati afati) {
        Afati createdAfati = afatiService.createAfati(afati);
        return ResponseEntity.ok(createdAfati);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Afati> getAfatiById(@PathVariable Long id) {
        Optional<Afati> afati = afatiService.getAfatiById(id);
        return afati.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<Afati>> getAllAfati() {
        List<Afati> afatiList = afatiService.getAllAfati();
        return ResponseEntity.ok(afatiList);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Afati> updateAfati(@PathVariable Long id, @RequestBody Afati afati) {
        Afati updatedAfati = afatiService.updateAfati(id, afati);
        return ResponseEntity.ok(updatedAfati);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAfati(@PathVariable Long id) {
        afatiService.deleteAfati(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/date")
    public List<Afati> currentDate(){
        return afatiService.findByCurrent();
    }
}
