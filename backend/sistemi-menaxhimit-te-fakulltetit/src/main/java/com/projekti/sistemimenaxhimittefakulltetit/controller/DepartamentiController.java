package com.projekti.sistemimenaxhimittefakulltetit.controller;

import com.projekti.sistemimenaxhimittefakulltetit.entities.Departamenti;
import com.projekti.sistemimenaxhimittefakulltetit.entities.User;
import com.projekti.sistemimenaxhimittefakulltetit.service.DepartamentiService;
import com.projekti.sistemimenaxhimittefakulltetit.service.FakultetiService;
import com.projekti.sistemimenaxhimittefakulltetit.service.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
    public Optional<Departamenti> getDepartamenti(@PathVariable Long id){
        return departamentiService.findByDepartamentiId(id);
    }
    @DeleteMapping("/{id}")
    public void deleteDepartamenti(@PathVariable Long id){
        Optional<Departamenti> d = departamentiService.findByDepartamentiId(id);
        d.get().setUser(null);
        departamentiService.deleteDepartamentiById(d.get().getId());
    }


    @PostMapping("/{fakultetiId}/{dekaniId}")
    public void createDepartamenti(@RequestBody Departamenti d,@PathVariable("fakultetiId") Long fkId,@PathVariable("dekaniId") Long dekId) throws Exception {
        d.setFakulteti(fakultetiService.findFakultetiById(fkId).get());
        d.setUser(userService.findUserById(dekId));
        departamentiService.createDepartamenti(d);
    }
    @PutMapping("/{id}")
    public void updateDepartamenti(@RequestBody Departamenti d ,@PathVariable Long id){
        Optional<Departamenti> dSave = departamentiService.findByDepartamentiId(id);

        dSave.get().setEmri(d.getEmri());
        dSave.get().setLokacioni(d.getLokacioni());
        dSave.get().setEmail(d.getEmail());

        departamentiService.updateDepartamenti(d);
    }


}
