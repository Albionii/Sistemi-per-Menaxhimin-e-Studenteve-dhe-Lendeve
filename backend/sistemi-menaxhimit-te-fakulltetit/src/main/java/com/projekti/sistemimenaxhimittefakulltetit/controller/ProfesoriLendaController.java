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
    private final ProfessorService professorService;
    private final SemesterService semesterService;
    private final UserService userService;

    @GetMapping("/semester/{semesterId}")
    public List<ProfesoriLenda> findBySemesterId(@PathVariable Long semesterId){
        return profesoriLendaService.getBySemesterId(semesterId);
    }

    @GetMapping("/lendet/{semesterId}")
    public Long countLendetBySemesterId(@PathVariable Long semesterId) throws Exception {
        return profesoriLendaService.countLendetBySemester(semesterId);
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
}
