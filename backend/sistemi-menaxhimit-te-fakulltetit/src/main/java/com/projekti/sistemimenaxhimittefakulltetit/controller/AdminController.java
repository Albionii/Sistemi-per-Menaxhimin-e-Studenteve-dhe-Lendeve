package com.projekti.sistemimenaxhimittefakulltetit.controller;

import com.projekti.sistemimenaxhimittefakulltetit.entities.*;
import com.projekti.sistemimenaxhimittefakulltetit.request.CreateLendaReq;
import com.projekti.sistemimenaxhimittefakulltetit.service.LendaService;
import com.projekti.sistemimenaxhimittefakulltetit.service.ProfesoriLendaService;
import com.projekti.sistemimenaxhimittefakulltetit.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final UserService userService;
    private final LendaService lendaService;
    private final ProfesoriLendaService profesoriLendaService;

    @DeleteMapping("/{id}")
    public void deleteUserById(
            @RequestHeader("Authorization") String jwt,
            @PathVariable Long id){
        userService.deleteUserById(id);
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> updateRole(@PathVariable Long id,
                                           @RequestBody User userDetails,
                                           @RequestHeader("Authorization") String jwt) throws Exception {
        User updateUser = userService.updateRole(id, userDetails);

        return ResponseEntity.ok(updateUser);
    }

    @PostMapping("/add-lenda")
    public ResponseEntity<Lenda> createLenda(@RequestBody CreateLendaReq lenda) throws Exception{
        Lenda savedLenda = lendaService.createLenda(lenda);

        return ResponseEntity.status(HttpStatus.CREATED).body(savedLenda);
    }

    @PostMapping("add-ligjerata")
    public ResponseEntity<ProfesoriLenda> createLenda(@RequestBody ProfesoriLenda ligjerata) throws Exception {
        ProfesoriLenda savedLigjerata = profesoriLendaService.createLigjerata(ligjerata);

        return ResponseEntity.status(HttpStatus.CREATED).body(savedLigjerata);
    }

    @DeleteMapping("/lenda/{id}")
    public void deleteLenda(@PathVariable Long id,
                            @RequestHeader("Authorization") String jwt){
        lendaService.deleteLenda(id);
    }
}
