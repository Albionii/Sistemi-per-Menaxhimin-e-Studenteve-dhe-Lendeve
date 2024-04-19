package com.projekti.sistemimenaxhimittefakulltetit.controller;

import com.projekti.sistemimenaxhimittefakulltetit.entities.Fakulteti;
import com.projekti.sistemimenaxhimittefakulltetit.entities.User;
import com.projekti.sistemimenaxhimittefakulltetit.service.FakultetiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/fakulteti")
public class FakultetiController {

    @Autowired
    private FakultetiService fakultetiService;

    @GetMapping("/{id}")
    public Optional<Fakulteti> getFakulteti(@PathVariable Long id){
        return fakultetiService.findFakultetiById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteFakulteti(@PathVariable Long id){
        fakultetiService.deleteFakultetiById(id);
    }

    @PostMapping
    public void createFakulteti(@RequestBody Fakulteti f){
        fakultetiService.createFakulteti(f);
    }

    @PutMapping("/{id}")
    public void updateDrejtori(@RequestBody User u,@PathVariable Long id){
        fakultetiService.updateDrejtori(u,id);
    }



}
