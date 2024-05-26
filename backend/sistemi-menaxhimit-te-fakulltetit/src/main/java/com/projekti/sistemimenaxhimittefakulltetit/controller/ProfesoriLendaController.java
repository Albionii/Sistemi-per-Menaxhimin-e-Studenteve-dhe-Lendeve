package com.projekti.sistemimenaxhimittefakulltetit.controller;

import com.projekti.sistemimenaxhimittefakulltetit.entities.Lenda;
import com.projekti.sistemimenaxhimittefakulltetit.entities.ProfesoriLenda;
import com.projekti.sistemimenaxhimittefakulltetit.service.ProfesoriLendaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/professorLenda")
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

    @GetMapping("semester/{semesterId}")
    public List<ProfesoriLenda> findBySemesterId(@PathVariable Long semesterId){
        return profesoriLendaService.getBySemesterId(semesterId);
    }

    @PostMapping("/createLigjerata")
    public ResponseEntity<ProfesoriLenda> createLigjerate(@RequestBody ProfesoriLenda p) throws Exception {
        ProfesoriLenda profesoriLenda = profesoriLendaService.createLigjerata(p);
        return ResponseEntity.ok().body(profesoriLenda);
    }

    @GetMapping
    public ResponseEntity<List<ProfesoriLenda>> getAllProfesoriLenda(){
        List<ProfesoriLenda> p = profesoriLendaService.getAllProfessorLenda();
        return ResponseEntity.ok().body(p);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteProfesoriLendaByID(@PathVariable Long id){
        profesoriLendaService.deleteProfessorLendaByID(id);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<ProfesoriLenda> updateProfessorLenda(@PathVariable Long id, @RequestBody ProfesoriLenda pl) {
        ProfesoriLenda profesoriLenda = profesoriLendaService.updateProfessorLenda(id, pl);
        if (profesoriLenda != null) {
            return new ResponseEntity<>(profesoriLenda, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
