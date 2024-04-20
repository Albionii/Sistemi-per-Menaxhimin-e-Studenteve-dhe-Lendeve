package com.projekti.sistemimenaxhimittefakulltetit.controller;

import com.projekti.sistemimenaxhimittefakulltetit.entities.Fakulteti;
import com.projekti.sistemimenaxhimittefakulltetit.entities.User;
import com.projekti.sistemimenaxhimittefakulltetit.service.FakultetiService;
import com.projekti.sistemimenaxhimittefakulltetit.service.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/fakulteti")
public class FakultetiController {

    @Autowired
    private FakultetiService fakultetiService;

    @Autowired
    private UserServiceImpl userService;


    @GetMapping("/{id}")
    public Optional<Fakulteti> getFakulteti(@PathVariable Long id){
        return fakultetiService.findFakultetiById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteFakulteti(@PathVariable Long id){
        fakultetiService.deleteFakultetiById(id);
    }

    @PostMapping("/{id}")
    public void createFakulteti(@RequestBody Fakulteti f,@PathVariable Long id) throws Exception {
        f.setUser(userService.findUserById(id));
        fakultetiService.createFakulteti(f);
    }

    @PutMapping("/{id}/{drejtoriId}")
    public void updateDrejtori(@PathVariable("id") Long id,@PathVariable("drejtoriId") Long idD) throws Exception {
        Optional<Fakulteti> f1 = fakultetiService.findFakultetiById(id);
        f1.get().setUser(userService.findUserById(idD));
        fakultetiService.updateDrejtori(f1.get());

    }



}
