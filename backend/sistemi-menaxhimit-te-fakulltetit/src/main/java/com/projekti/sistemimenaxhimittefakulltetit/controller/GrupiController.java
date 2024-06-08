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



    @GetMapping("/semester/{semesterId}")
    public List<Grupi> getGrupetBySemesterId(@PathVariable Long semesterId){
        return grupiService.getGrupiBySemesterId(semesterId);
    }



    @GetMapping
    public List<Grupi> grupiByAfatiId(){
        return grupiService.findGrupetByAfatiId();
    }
}
