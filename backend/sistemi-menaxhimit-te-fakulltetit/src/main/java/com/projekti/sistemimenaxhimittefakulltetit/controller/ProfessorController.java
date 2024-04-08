package com.projekti.sistemimenaxhimittefakulltetit.controller;

import com.projekti.sistemimenaxhimittefakulltetit.entities.Vleresimi;
import com.projekti.sistemimenaxhimittefakulltetit.service.VleresimiService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/professor")
@RequiredArgsConstructor
public class ProfessorController {

    private final VleresimiService vleresimiService;

    @PutMapping("/{id}")
    public Optional<Vleresimi> updateNota(@RequestBody Vleresimi updatedVleresimi,
                                          @PathVariable Long oldVleresimiId){
        return vleresimiService.updateNota(updatedVleresimi, oldVleresimiId);
    }

    @PostMapping
    public Vleresimi addNota(@RequestBody Vleresimi vleresimi){
        return vleresimiService.addNota(vleresimi);
    }
}
