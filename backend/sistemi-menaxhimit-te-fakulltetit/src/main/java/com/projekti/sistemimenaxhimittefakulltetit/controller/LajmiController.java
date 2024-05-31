package com.projekti.sistemimenaxhimittefakulltetit.controller;

import com.projekti.sistemimenaxhimittefakulltetit.entities.Lajmi;
import com.projekti.sistemimenaxhimittefakulltetit.service.LajmiService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/lajmet")
public class LajmiController {
    private final LajmiService lajmiService;
    @GetMapping
    public List<Lajmi> lajmetByDepartment(@RequestHeader("Authorization")String jwt) throws Exception {
        return lajmiService.findByDepartmentId(jwt);
    }

    @GetMapping("/get")
    public List<Lajmi> getAllLajmet(){
        return lajmiService.getAllLajmet();
    }

    @GetMapping("/getById/{id}")
    public Optional<Lajmi> getById(Long id){
        return lajmiService.getLajmiById(id);
    }

    @PostMapping("/create")
    public Lajmi createLajmi(@RequestBody Lajmi lajmi) throws Exception {
        return lajmiService.createLajmi(lajmi);
    }

    @PutMapping("/update/{id}")
    public Lajmi updateLajmi(@RequestBody Lajmi lajmi, @PathVariable Long id) throws Exception {
        return lajmiService.updateLajmiById(id, lajmi);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteLajmi(@PathVariable Long id){
        lajmiService.deleteLajmiById(id);
    }
}
