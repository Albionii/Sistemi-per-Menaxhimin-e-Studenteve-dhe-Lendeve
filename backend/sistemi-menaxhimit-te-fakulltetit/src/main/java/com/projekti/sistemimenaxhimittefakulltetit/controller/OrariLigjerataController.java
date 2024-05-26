package com.projekti.sistemimenaxhimittefakulltetit.controller;

import com.projekti.sistemimenaxhimittefakulltetit.entities.OrariLigjerata;
import com.projekti.sistemimenaxhimittefakulltetit.service.OrariLigjerataService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
}
