package com.projekti.sistemimenaxhimittefakulltetit.controller;

import com.projekti.sistemimenaxhimittefakulltetit.entities.Departamenti;
import com.projekti.sistemimenaxhimittefakulltetit.entities.Fakulteti;
import com.projekti.sistemimenaxhimittefakulltetit.entities.User;
import com.projekti.sistemimenaxhimittefakulltetit.service.DepartamentiService;
import com.projekti.sistemimenaxhimittefakulltetit.service.FakultetiService;
import com.projekti.sistemimenaxhimittefakulltetit.service.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/departamenti")

public class DepartamentiController {
    @Autowired
    private DepartamentiService departamentiService;

    @Autowired
    private FakultetiService fakultetiService;

    @Autowired
    private UserServiceImpl userService;

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Departamenti>> getDepartamenti(@PathVariable Long id){
        return ResponseEntity.ok().body(departamentiService.findByDepartamentiId(id));
    }

    @GetMapping()
    public ResponseEntity<List<Departamenti>> getAllDepartamenti()
    {
        return ResponseEntity.ok().body(departamentiService.findAll());
    }


//    @PostMapping("/{fakultetiId}/{dekaniId}")
//    public void createDepartamenti(@RequestBody Departamenti d,@PathVariable("fakultetiId") Long fkId,@PathVariable("dekaniId") Long dekId) throws Exception {
//        d.setFakulteti(fakultetiService.findFakultetiById(fkId).get());
//        d.setUser(userService.findUserById(dekId));
//        departamentiService.createDepartamenti(d);
//    }


    @PutMapping("/update/{id}")
    public ResponseEntity<Departamenti> updateDepartamenti(@PathVariable Long id, @RequestBody Departamenti d) {
        Departamenti departamenti = departamentiService.updateDepartamenti(id, d);
        if (departamenti != null) {
            return new ResponseEntity<>(departamenti, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/delete/{id}")
    public void deleteDepartamentiByID(@PathVariable Long id){
        departamentiService.deleteDepartamentiById(id);
    }

    @PostMapping("/create")
    public ResponseEntity<Departamenti> createDepartamenti(@RequestBody Departamenti departamenti) throws Exception {
        Departamenti createdDepartamenti = departamentiService.createDepartamenti(departamenti);
        return ResponseEntity.ok().body(createdDepartamenti);
    }



}
