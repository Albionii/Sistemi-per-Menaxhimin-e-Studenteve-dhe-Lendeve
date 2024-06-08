package com.projekti.sistemimenaxhimittefakulltetit.controller;

import com.projekti.sistemimenaxhimittefakulltetit.entities.OrariLigjerata;
import com.projekti.sistemimenaxhimittefakulltetit.service.OrariLigjerataService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/orariLigjerata")
public class OrariLigjerataController {
    private final OrariLigjerataService orariLigjerataService;

    @GetMapping("/{id}")
    public List<OrariLigjerata> getByOrariId(@PathVariable Long id){
        return orariLigjerataService.getByOrariId(id);
    }

//    @GetMapping
//    public List<OrariLigjerata> getByStudentId(@RequestHeader("Authorization") String jwt) throws Exception {
//        return orariLigjerataService.getOrariByStudentId(jwt);
//    }

//    @GetMapping("/dita/{dita}")
//    public List<OrariLigjerata> getByDita(@PathVariable String dita, @RequestHeader("Authorization") String jwt) throws Exception {
//        return orariLigjerataService.getOrariLigjertaByDita(jwt, dita);
//    }

//    @GetMapping("/{id}")
//    public

    @GetMapping("/dita/{dita}")
    public List<OrariLigjerata> getByDita(@PathVariable String dita, @RequestHeader("Authorization")String jwt) throws Exception {
        return orariLigjerataService.getOrariByDita(dita, jwt);
    }
}
