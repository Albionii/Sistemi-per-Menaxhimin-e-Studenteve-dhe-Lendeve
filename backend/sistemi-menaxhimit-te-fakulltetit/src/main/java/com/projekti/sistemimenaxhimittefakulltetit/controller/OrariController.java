package com.projekti.sistemimenaxhimittefakulltetit.controller;

import com.projekti.sistemimenaxhimittefakulltetit.entities.Orari;
import com.projekti.sistemimenaxhimittefakulltetit.service.OrariService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/orari")
public class OrariController {
    private final OrariService orariService;

    @GetMapping("/{id}")
    public Optional<Orari> findOrariById(@PathVariable Long id){
        return orariService.findOrariById(id);
    }

    @GetMapping("/get")
    public List<Orari> allOraret(){
        return orariService.getAllOraret();
    }

    @DeleteMapping("/delete/{id}")
    public void deleteOrari(@PathVariable Long id){
        orariService.deleteOrari(id);
    }

    @PostMapping("/create")
    public Orari createOrari(@RequestBody Orari orari) throws Exception {
        return orariService.createOrari(orari);
    }

    @PutMapping("/update/{id}")
    public Orari updateOrari(@PathVariable Long id, @RequestBody Orari orari){
        return orariService.updateOrari(id, orari);
    }
}
