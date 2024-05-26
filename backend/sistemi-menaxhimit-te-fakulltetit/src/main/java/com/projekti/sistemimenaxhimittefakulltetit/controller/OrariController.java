package com.projekti.sistemimenaxhimittefakulltetit.controller;

import com.projekti.sistemimenaxhimittefakulltetit.entities.Orari;
import com.projekti.sistemimenaxhimittefakulltetit.service.OrariService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

    @GetMapping
    public List<Orari> allOraret(){
        return orariService.getAllOraret();
    }
}
