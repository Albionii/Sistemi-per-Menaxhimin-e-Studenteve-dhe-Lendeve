package com.projekti.sistemimenaxhimittefakulltetit.controller;

import com.projekti.sistemimenaxhimittefakulltetit.entities.*;
import com.projekti.sistemimenaxhimittefakulltetit.request.CreateStudentProvimRequest;
import com.projekti.sistemimenaxhimittefakulltetit.service.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/professor")
@RequiredArgsConstructor
public class ProfessorController {

    private final VleresimiService vleresimiService;
    private final ProvimiService provimiService;
    private final StudentService studentService;
    private final UserService userService;
    private final LendaService lendaService;
    private final ProfessorService professorService;
    private final StudentPrvService studentPrvService;
    private final ProfesoriLendaService profesoriLendaService;

    @PutMapping("/{id}")
    public Optional<Vleresimi> updateNota(@RequestBody Vleresimi updatedVleresimi,
                                          @PathVariable Long oldVleresimiId){
        return vleresimiService.updateNota(updatedVleresimi, oldVleresimiId);
    }

    @PostMapping("/provimi/")
    public StudentProvimi addNota(@RequestBody CreateStudentProvimRequest request){

        StudentProvimi paraqitja = studentPrvService.findById(request.getId());

        return studentPrvService.noto(paraqitja, request.getNota());
    }

    @GetMapping("/paraqitjet/{lendaId}")
    public List<StudentProvimi> getParaqitjet(@PathVariable Long lendaId,
                                        @RequestHeader("Authorization") String token) throws Exception {
        Lenda lenda = lendaService.findLendaById(lendaId);
        User user = userService.findUserByJwtToken(token);
        Professor professor = professorService.findProfessorByUserId(user.getId());

        ProfesoriLenda profesoriLenda = profesoriLendaService.findByProfessorAndLenda(professor, lenda);

        System.out.println(profesoriLenda.getId());

        Provimi provimi = provimiService.findProvimiByLigjerataId(profesoriLenda.getId());

        System.out.println(provimi.getId());

        return studentPrvService.findAllStudentProvimiByProvimiId(provimi.getId());
    }
    @GetMapping("/get/provimi/{id}")
    public StudentProvimi getProvimi(@PathVariable Long id) {
        return studentPrvService.findById(id);
    }

    @GetMapping("")
    public ResponseEntity<List<Professor>> getProfessors(){
        List<Professor> professors = professorService.getProfessors();
        return new ResponseEntity<>(professors, HttpStatus.OK);
    }


    @GetMapping("/getProfessor/{id}")
    public Optional<Professor> getProfessor(@PathVariable Long id){
        return professorService.findProfById(id);
    }

    @PostMapping("/create")
    public ResponseEntity<Professor> createProfessor(@RequestBody Professor p) throws Exception {
        Professor professor = professorService.createProfessor(p);
        return ResponseEntity.ok().body(professor);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteProfessorByID(@PathVariable Long id){
        professorService.deleteProfessorByID(id);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Professor> updateProfessor(@PathVariable Long id, @RequestBody Professor p) {
        Professor professor = professorService.updateProfessor(id, p);
        if (professor != null) {
            return new ResponseEntity<>(professor, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }



}
