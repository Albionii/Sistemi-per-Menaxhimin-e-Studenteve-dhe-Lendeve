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

import java.util.List;
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


    @GetMapping("/semester/{departamentiId}")
    public List<Semester> getByDepartamentiId(@PathVariable Long departamentiId){
        return semesterService.getByDepartamentiId(departamentiId);
    }

    @DeleteMapping("/lenda/{id}")
    public void deleteLenda(@PathVariable Long id,
                            @RequestHeader("Authorization") String jwt){
        lendaService.deleteLenda(id);
    }


    @PostMapping("/semester/create")
    public ResponseEntity<Semester> createSemester(@RequestBody Semester req) {

        Semester created = semesterService.createSemester(req);

        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PostMapping("/semester/shtoLenda")
    public ResponseEntity<LendaSemester> shtoLendaSemester(@RequestBody LendaSemester lendaSemester) {

        LendaSemester  created = lendaSemesterService.shto(lendaSemester);

        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @GetMapping("/semesters")
    public ResponseEntity<List<Semester>> semesters() {
        List<Semester> sm = semesterService.getSemesters();
        return ResponseEntity.status(HttpStatus.OK).body(sm);
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

    @PutMapping("/semester/update/{id}")
    public ResponseEntity<Semester> updateSemester(@PathVariable Long id, @RequestBody Semester semester) {
        return ResponseEntity.status(HttpStatus.OK).body(semesterService.updateSemester(id, semester));
    }



}
