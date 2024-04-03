package com.projekti.sistemimenaxhimittefakulltetit.controller;

import com.projekti.sistemimenaxhimittefakulltetit.entities.*;
import com.projekti.sistemimenaxhimittefakulltetit.repository.ProfessorRepository;
import com.projekti.sistemimenaxhimittefakulltetit.repository.UserRepository;
import com.projekti.sistemimenaxhimittefakulltetit.request.CreateLendaReq;
import com.projekti.sistemimenaxhimittefakulltetit.request.LigjerataReq;
import com.projekti.sistemimenaxhimittefakulltetit.service.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final UserService userService;
    private final ProfessorService professorService;
    private final LendaService lendaService;
    private final ProfesoriLendaService profesoriLendaService;

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

        User user = userService.findUserById(userDetails.getId());

        if(user.getRole() == USER_ROLE.ROLE_PROFESSOR) {
            Professor professor = new Professor();

            professor.setUser(user);
        }

        return ResponseEntity.ok(updateUser);
    }

    @PostMapping("/add-lenda")
    public ResponseEntity<Lenda> createLenda(@RequestBody CreateLendaReq lenda,
                                             @RequestHeader("Authorization") String jwt) throws Exception{
        Lenda savedLenda = lendaService.createLenda(lenda);

        return ResponseEntity.status(HttpStatus.CREATED).body(savedLenda);
    }

    @PostMapping("add-ligjerata")
    public ResponseEntity<ProfesoriLenda> createLenda(@RequestBody LigjerataReq ligjerataReq,// Json merr => { "profesor":"id", "lenda":"id"}
                                                      @RequestHeader("Authorization") String jwt) throws Exception {

        // Identik dren veq tash i merr Id-te si json, jo me shkru komplet aty gjeth at sen.
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
}
