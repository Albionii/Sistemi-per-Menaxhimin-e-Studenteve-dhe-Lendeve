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

    @GetMapping("/dita/{dita}")
    public List<OrariLigjerata> getByDita(@PathVariable String dita, @RequestHeader("Authorization")String jwt) throws Exception {
        return orariLigjerataService.getOrariByDita(dita, jwt);
    }

    @GetMapping("/getById/{id}")
    public Optional<OrariLigjerata> findById(@PathVariable Long id){
        return orariLigjerataService.findById(id);
    }

    @PostMapping("/create")
    public OrariLigjerata create(@RequestBody OrariLigjerata orariLigjerata) throws Exception {
        return orariLigjerataService.create(orariLigjerata);
    }

    @PutMapping("/update/{id}")
    public OrariLigjerata update(@PathVariable Long id, @RequestBody OrariLigjerata orariLigjerata) throws Exception {
        return orariLigjerataService.updateById(id, orariLigjerata);
    }

    @GetMapping("/get")
    public List<OrariLigjerata> getAll(){
        return orariLigjerataService.findAll();
    }

    @DeleteMapping("/delete/{id}")
    public void deleteById(@PathVariable Long id){
        orariLigjerataService.deleteById(id);
    }
}
