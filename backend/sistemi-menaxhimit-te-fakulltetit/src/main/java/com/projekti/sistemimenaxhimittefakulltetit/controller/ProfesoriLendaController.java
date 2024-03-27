package com.projekti.sistemimenaxhimittefakulltetit.controller;

import com.projekti.sistemimenaxhimittefakulltetit.entities.Lenda;
import com.projekti.sistemimenaxhimittefakulltetit.entities.ProfesoriLenda;
import com.projekti.sistemimenaxhimittefakulltetit.service.ProfesoriLendaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
public class ProfesoriLendaController {

    private final ProfesoriLendaService profesoriLendaService;

    @GetMapping("/{id}")
    public ResponseEntity<ProfesoriLenda> findLendaByProfesoriId(@PathVariable Long id){
        Optional<ProfesoriLenda> profesoriLenda = profesoriLendaService.findLendaByProfesoriId(id);
        return profesoriLenda.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("abc/{id}")
    public List<ProfesoriLenda> findLendaByProfesoriIdaa(@PathVariable Long id){
        return profesoriLendaService.findLendaByProfesoriIdaaaaaaaa(id);
//        \return profesoriLenda.map(ResponseEntity::ok)
//                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
