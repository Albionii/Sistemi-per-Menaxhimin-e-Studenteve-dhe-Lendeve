package com.projekti.sistemimenaxhimittefakulltetit.controller;

import com.projekti.sistemimenaxhimittefakulltetit.entities.Assignment;
import com.projekti.sistemimenaxhimittefakulltetit.entities.Postimi;
import com.projekti.sistemimenaxhimittefakulltetit.entities.ProfesoriLenda;
import com.projekti.sistemimenaxhimittefakulltetit.entities.User;
import com.projekti.sistemimenaxhimittefakulltetit.repository.PostimiRepository;
import com.projekti.sistemimenaxhimittefakulltetit.repository.ProfesoriLendaRepository;
import com.projekti.sistemimenaxhimittefakulltetit.request.AssignmentResponse;
import com.projekti.sistemimenaxhimittefakulltetit.service.AssignmentService;
import com.projekti.sistemimenaxhimittefakulltetit.service.ProfesoriLendaService;
import com.projekti.sistemimenaxhimittefakulltetit.service.UserService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.expression.spel.ast.Assign;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/professor/assignment")
public class AssignmentController {

    @Autowired
    private AssignmentService assignmentService;

    @Autowired
    private UserService userService;
    @Autowired
    private PostimiRepository postimiRepository;

    @Autowired
    private ProfesoriLendaService profesoriLendaService;
    @Autowired
    private ProfesoriLendaRepository profesoriLendaRepository;


    @GetMapping
    public List<Assignment> getAllAssignments() {
        return assignmentService.getAllAssignments();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Assignment> getAssignmentById(@PathVariable Long id) throws Exception {
        Assignment assignment = assignmentService.getAssignmentById(id);

        return new ResponseEntity<>(assignment, HttpStatus.FOUND);
    }

    @PostMapping("/create")
    public ResponseEntity<Assignment> createAssignment(@RequestParam(name="id")Long id,
                                                       @RequestBody AssignmentResponse assignment,
                                                    @RequestHeader("Authorization") String token ) throws Exception {

        Optional<ProfesoriLenda> profesoriLenda = profesoriLendaService.findById(id);

        User user = userService.findUserByJwtToken(token);

        List<Assignment> assignments = new ArrayList<>();


        Assignment created = assignmentService.createAssignment(assignment, user);

        assignments.add(created);


        if (profesoriLenda.isEmpty()) {
            throw new EntityNotFoundException("Ligjerata nuk ekziston!");
        }

        profesoriLenda.get().setAssignments(assignments);
        profesoriLendaRepository.save(profesoriLenda.get());

        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Assignment> updateAssignment(@RequestBody AssignmentResponse assignment,
                                                        @RequestHeader("Authorization") String token,
                                                        @PathVariable Long id) throws Exception {

        User user = userService.findUserByJwtToken(token);
        Assignment updated = assignmentService.updateAssignment(assignment, user, id);

        return new ResponseEntity<>(updated, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteAssignment(@PathVariable Long id) throws Exception {
        assignmentService.deleteAssignment(id);

        return ResponseEntity.status(HttpStatus.OK).body("Assignment Removed!");
    }
    @GetMapping("/get/ligjerata/{id}")
    public ResponseEntity<List<Assignment>> getAssignmentsOfLigjerata(@PathVariable Long id) {
        return ResponseEntity.status(HttpStatus.OK).body(assignmentService.getAssignmentsOfLigjerata(id));
    }
}
