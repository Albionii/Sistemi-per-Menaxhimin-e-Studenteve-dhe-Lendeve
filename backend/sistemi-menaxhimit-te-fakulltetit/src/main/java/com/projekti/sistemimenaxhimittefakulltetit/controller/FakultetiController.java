package com.projekti.sistemimenaxhimittefakulltetit.controller;

import com.projekti.sistemimenaxhimittefakulltetit.entities.Fakulteti;
import com.projekti.sistemimenaxhimittefakulltetit.entities.Lenda;
import com.projekti.sistemimenaxhimittefakulltetit.entities.User;
import com.projekti.sistemimenaxhimittefakulltetit.service.FakultetiService;
import com.projekti.sistemimenaxhimittefakulltetit.service.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
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

//    @DeleteMapping("delete/{id}")
//    public void deleteFakulteti(@PathVariable Long id){
//        Optional<Fakulteti> f = fakultetiService.findFakultetiById(id);
//        f.get().setUser(null);
//        fakultetiService.deleteFakultetiById(f.get().getId());
//    }

    @GetMapping()
    public List<Fakulteti> getAllFakulteti(){return fakultetiService.getAllFakulteti();}

    @PostMapping("/create/{id}")
    public void createFakulteti(@RequestBody Fakulteti f,@PathVariable Long id) throws Exception {
        f.setUser(userService.findUserById(id));
        fakultetiService.createFakulteti(f);
    }
    @PostMapping("/create")
    public ResponseEntity<Fakulteti> createFakulteti(@RequestBody Fakulteti fakulteti) throws Exception {
        Fakulteti createdFakulteti = fakultetiService.createFakulteti(fakulteti);
        return ResponseEntity.ok().body(createdFakulteti);
    }

    @PutMapping("/{id}/{drejtoriId}")
    public void updateDrejtori(@PathVariable("id") Long id,@PathVariable("drejtoriId") Long idD) throws Exception {
        Optional<Fakulteti> f1 = fakultetiService.findFakultetiById(id);
        f1.get().setUser(userService.findUserById(idD));
        fakultetiService.updateDrejtori(f1.get());

    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Fakulteti> updateFakulteti(@PathVariable Long id, @RequestBody Fakulteti f) {
        Fakulteti fakulteti = fakultetiService.updateFakulteti(id, f);
        if (fakulteti != null) {
            return new ResponseEntity<>(fakulteti, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/delete/{id}")
    public void deleteFakultetiByID(@PathVariable Long id){
        fakultetiService.deleteFakultetiById(id);
    }



}
