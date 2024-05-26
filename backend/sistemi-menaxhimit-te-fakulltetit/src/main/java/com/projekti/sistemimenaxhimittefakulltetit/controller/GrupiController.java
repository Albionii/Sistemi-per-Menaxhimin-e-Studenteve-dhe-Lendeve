package com.projekti.sistemimenaxhimittefakulltetit.controller;

import com.projekti.sistemimenaxhimittefakulltetit.entities.Grupi;
import com.projekti.sistemimenaxhimittefakulltetit.service.GrupiService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/grupi")
public class GrupiController {
    private final GrupiService grupiService;

    @GetMapping("/{id}")
    public Optional<Grupi> getGrupiById(@PathVariable Long id){
        return grupiService.getGrupiById(id);
    }

    @GetMapping
    public List<Grupi> getGrupet(){
        return grupiService.getAllGrupet();
    }

    @GetMapping("/semester/{semesterId}")
    public List<Grupi> getGrupetBySemesterId(@PathVariable Long semesterId){
        return grupiService.getGrupiBySemesterId(semesterId);
    }
}
