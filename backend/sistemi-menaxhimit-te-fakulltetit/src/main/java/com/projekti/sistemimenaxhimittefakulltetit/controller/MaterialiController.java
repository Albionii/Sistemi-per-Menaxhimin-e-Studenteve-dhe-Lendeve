package com.projekti.sistemimenaxhimittefakulltetit.controller;

import com.projekti.sistemimenaxhimittefakulltetit.entities.Materiali;
import com.projekti.sistemimenaxhimittefakulltetit.entities.ProfesoriLenda;
import com.projekti.sistemimenaxhimittefakulltetit.service.MaterialiService;
import com.projekti.sistemimenaxhimittefakulltetit.service.ProfesoriLendaService;
import com.projekti.sistemimenaxhimittefakulltetit.service.ProfesoriProvimiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/professor/materiali/")
public class MaterialiController {
    @Autowired
    private MaterialiService materialiService;
    @Autowired
    private ProfesoriLendaService profesoriLendaService;

    @PostMapping("create/{ligjerataId}")
    public ResponseEntity<Materiali> createMateriali(@PathVariable Long ligjerataId, @RequestBody Materiali materiali) {

        Optional<ProfesoriLenda> profesoriLenda = profesoriLendaService.findById(ligjerataId);

        if (profesoriLenda.isPresent()) {
            return ResponseEntity.status(HttpStatus.OK).body(materialiService.createMateriali(profesoriLenda.get(), materiali));
        }

        return  ResponseEntity.status(HttpStatus.NOT_FOUND).body(materiali);
    }

    @PutMapping("update")
    public ResponseEntity<Materiali> updateMateriali(@RequestBody Materiali materiali) {

        return ResponseEntity.status(HttpStatus.OK).body(materialiService.updateMateriali(materiali));
    }

    @DeleteMapping("delete/{materialId}")
    public void deleteMateriali(@PathVariable Long materialId) {
        materialiService.deleteMateriali(materialId);
    }

    @GetMapping("get/{ligjerataId}")
    public ResponseEntity<List<Materiali>> getMaterialiOfLenda(@PathVariable Long ligjerataId) {
        Optional<ProfesoriLenda> profesoriLenda =profesoriLendaService.findById(ligjerataId);

        if (profesoriLenda.isPresent()) {
            return ResponseEntity.status(HttpStatus.OK).body(profesoriLenda.get().getMateriali());
        }
        return  ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }


}

