package com.projekti.sistemimenaxhimittefakulltetit.controller;

import com.projekti.sistemimenaxhimittefakulltetit.entities.*;
import com.projekti.sistemimenaxhimittefakulltetit.repository.LendaSemesterRepository;
import com.projekti.sistemimenaxhimittefakulltetit.repository.ProfessorRepository;
import com.projekti.sistemimenaxhimittefakulltetit.repository.UserRepository;
import com.projekti.sistemimenaxhimittefakulltetit.request.CreateLendaReq;
import com.projekti.sistemimenaxhimittefakulltetit.request.LigjerataReq;
import com.projekti.sistemimenaxhimittefakulltetit.service.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final UserService userService;
    private final ProfessorService professorService;
    private final LendaService lendaService;
    private final ProfesoriLendaService profesoriLendaService;
    private final SemesterService semesterService;
    private final LendaSemesterService lendaSemesterService;

    @DeleteMapping("/{id}")
    public void deleteUserById(
            @RequestHeader("Authorization") String jwt,
            @PathVariable Long id){
        userService.deleteUserById(id);
    }

    @PutMapping("/role/{id}")
    public ResponseEntity<User> updateRole(@PathVariable Long id,
                                           @RequestBody User userDetails,
                                           @RequestHeader("Authorization") String jwt) throws Exception {

        User updateUser = userService.updateRole(id, userDetails);

        return ResponseEntity.ok(updateUser);
    }

    @PostMapping("/add-lenda")
    public ResponseEntity<Lenda> createLenda(@RequestBody Lenda lenda,
                                             @RequestHeader("Authorization") String jwt) throws Exception{
        Lenda savedLenda = lendaService.createLenda(lenda);

        return ResponseEntity.status(HttpStatus.CREATED).body(savedLenda);
    }

    @PostMapping("add-ligjerata")
    public ResponseEntity<ProfesoriLenda> createLenda(@RequestBody LigjerataReq ligjerataReq,
                                                      @RequestHeader("Authorization") String jwt) throws Exception {

        Professor professor = professorService.findProfessorById(ligjerataReq.getProfessor());

        Lenda created_lenda = lendaService.findLendaById(ligjerataReq.getLenda());

        ProfesoriLenda ligjerata = new ProfesoriLenda(professor, created_lenda);

        ProfesoriLenda savedLigjerata = profesoriLendaService.createLigjerata(ligjerata);

        return ResponseEntity.status(HttpStatus.CREATED).body(savedLigjerata);
    }

    @DeleteMapping("/lenda/{id}")
    public void deleteLenda(@PathVariable Long id,
                            @RequestHeader("Authorization") String jwt){
        lendaService.deleteLenda(id);
    }


    @PostMapping("/semester/create")
    public ResponseEntity<Semester> createSemester(@RequestBody Semester req,
                               @RequestHeader("Authorization")String jwt) {

        Semester created = semesterService.createSemester(req);

        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PostMapping("/semester/shtoLenda")
    public ResponseEntity<LendaSemester> shtoLendaSemester(@RequestBody LendaSemester lendaSemester) {

        LendaSemester  created = lendaSemesterService.shto(lendaSemester);

        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @DeleteMapping("/semester/delete/{id}")
    public void deleteSemester(@PathVariable Long id) {
        semesterService.deleteSemester(id);
    }
    @DeleteMapping("/semester/delete/Lenda/{id}")
    public void deleteLendaSemester(@PathVariable Long id) throws Exception {
        lendaSemesterService.delete(id);
    }

    @GetMapping("/lendaSemester/{id}")
    public LendaSemester getLendaSemester(@PathVariable Long id) {
        return lendaSemesterService.getLendaSemesterById(id);
    }


    @GetMapping("/semester/get/{id}")
    public ResponseEntity<Semester> getSemester(@PathVariable Long id) {
        Semester semester = semesterService.getSemester(id);
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(semester);
    }



}
