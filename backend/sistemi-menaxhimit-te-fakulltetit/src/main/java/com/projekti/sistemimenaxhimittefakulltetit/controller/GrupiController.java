package com.projekti.sistemimenaxhimittefakulltetit.controller;

import com.projekti.sistemimenaxhimittefakulltetit.entities.Grupi;
import com.projekti.sistemimenaxhimittefakulltetit.service.GrupiService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/grupi")
public class GrupiController {
    private final GrupiService grupiService;

    @GetMapping("/{id}")
    public Grupi getGrupiById(@PathVariable Long id){
        return grupiService.getGrupiById(id);
    }

    @GetMapping("/get")
    public List<Grupi> getGrupet(){
        return grupiService.getAllGrupet();
    }

    @GetMapping("/semester/{semesterId}")
    public List<Grupi> getGrupetBySemesterId(@PathVariable Long semesterId){
        return grupiService.getGrupiBySemesterId(semesterId);
    }

    @PutMapping("/update/{id}")
    public Grupi updateGrupi(@PathVariable Long id, @RequestBody Grupi newGrupi){
        return grupiService.updateGrupiById(id, newGrupi);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteGrupiById(@PathVariable Long id){
        grupiService.deleteGrupiById(id);
    }

    @PostMapping("/create")
    public Grupi createGrupi(@RequestBody Grupi grupi) throws Exception {
        return grupiService.createGrupi(grupi);
    }

    @GetMapping
    public List<Grupi> grupiByAfatiId(){
        return grupiService.findGrupetByAfatiId();
    }
}
