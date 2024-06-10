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

    @GetMapping
    public ResponseEntity<List<Departamenti>> getAllDepartamenti()
    {
        return ResponseEntity.ok().body(departamentiService.findAll());
    }




}
