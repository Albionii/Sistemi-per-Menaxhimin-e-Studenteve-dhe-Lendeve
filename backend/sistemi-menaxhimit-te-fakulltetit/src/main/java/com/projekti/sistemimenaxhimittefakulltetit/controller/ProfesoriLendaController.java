package com.projekti.sistemimenaxhimittefakulltetit.controller;

import com.projekti.sistemimenaxhimittefakulltetit.entities.*;
import com.projekti.sistemimenaxhimittefakulltetit.service.ProfesoriLendaService;
import com.projekti.sistemimenaxhimittefakulltetit.service.ProfessorService;
import com.projekti.sistemimenaxhimittefakulltetit.service.SemesterService;
import com.projekti.sistemimenaxhimittefakulltetit.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/professorLenda")
public class ProfesoriLendaController {

    private final ProfesoriLendaService profesoriLendaService;
    private final UserService userService;
    private final ProfessorService professorService;
    private final SemesterService semesterService;

    @GetMapping("/{id}")
    public ResponseEntity<ProfesoriLenda> findLendaByProfesoriId(@PathVariable Long id){
        Optional<ProfesoriLenda> profesoriLenda = profesoriLendaService.findLendaByProfesoriId(id);
        return profesoriLenda.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("abc/{id}")
    public List<ProfesoriLenda> findLendaByProfesoriIdaa(@PathVariable Long id){
        return profesoriLendaService.findLendaByProfesoriIdaaaaaaaa(id);
//        \return profesoriLenda.map(ResponseEntity::ok)
//                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("semester/{semesterId}")
    public List<ProfesoriLenda> findBySemesterId(@PathVariable Long semesterId){
        return profesoriLendaService.getBySemesterId(semesterId);
    }

    @GetMapping("/ligjeratat/{semesterId}")
    public List<ProfesoriLenda> findLigjeratat(@PathVariable Long semesterId,
                                               @RequestHeader("Authorization")String token) throws Exception {
        User user = userService.findUserByJwtToken(token);
        Professor professor = professorService.findProfessorByUserId(user.getId());
        Semester semester = semesterService.getSemester(semesterId);

        return  profesoriLendaService.getAllLigjerataBySemester(professor, semester);
    }

    @GetMapping("/professor/semestret/")
    public List<Semester> findSemesters(@RequestHeader("Authorization")String token) throws Exception {
        User user = userService.findUserByJwtToken(token);
        Professor professor = professorService.findProfessorByUserId(user.getId());
        return profesoriLendaService.findSemesters(professor);
    }

    @PostMapping("/createLigjerata")
    public ResponseEntity<ProfesoriLenda> createLigjerate(@RequestBody ProfesoriLenda p) throws Exception {
        ProfesoriLenda profesoriLenda = profesoriLendaService.createLigjerata(p);
        return ResponseEntity.ok().body(profesoriLenda);
    }

    @GetMapping
    public ResponseEntity<List<ProfesoriLenda>> getAllProfesoriLenda(){
        List<ProfesoriLenda> p = profesoriLendaService.getAllProfessorLenda();
        return ResponseEntity.ok().body(p);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteProfesoriLendaByID(@PathVariable Long id){
        profesoriLendaService.deleteProfessorLendaByID(id);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<ProfesoriLenda> updateProfessorLenda(@PathVariable Long id, @RequestBody ProfesoriLenda pl) {
        ProfesoriLenda profesoriLenda = profesoriLendaService.updateProfessorLenda(id, pl);
        if (profesoriLenda != null) {
            return new ResponseEntity<>(profesoriLenda, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

}
