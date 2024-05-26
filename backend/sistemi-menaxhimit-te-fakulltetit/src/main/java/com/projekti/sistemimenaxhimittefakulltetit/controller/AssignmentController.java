package com.projekti.sistemimenaxhimittefakulltetit.controller;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.projekti.sistemimenaxhimittefakulltetit.entities.*;
import com.projekti.sistemimenaxhimittefakulltetit.repository.AssignmentRepository;
import com.projekti.sistemimenaxhimittefakulltetit.repository.PostimiRepository;
import com.projekti.sistemimenaxhimittefakulltetit.repository.ProfesoriLendaRepository;
import com.projekti.sistemimenaxhimittefakulltetit.request.AssignmentResponse;
import com.projekti.sistemimenaxhimittefakulltetit.service.AssignmentService;
import com.projekti.sistemimenaxhimittefakulltetit.service.FileStorageService;
import com.projekti.sistemimenaxhimittefakulltetit.service.ProfesoriLendaService;
import com.projekti.sistemimenaxhimittefakulltetit.service.UserService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.expression.spel.ast.Assign;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
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
    @Autowired
    private AssignmentRepository assignmentRepository;
    @Autowired
    private FileStorageService fileStorageService;

    @GetMapping
    public List<Assignment> getAllAssignments() {
        return assignmentService.getAllAssignments();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Assignment> getAssignmentById(@PathVariable Long id) throws Exception {
        Assignment assignment = assignmentService.getAssignmentById(id);

        return new ResponseEntity<>(assignment, HttpStatus.FOUND);
    }

    @PostMapping("/create/{id}")
    public ResponseEntity<Assignment> createAssignment(@PathVariable Long id,
                                                       @RequestBody AssignmentResponse assignment,
                                                       @RequestHeader("Authorization") String token ) throws Exception {

        Optional<ProfesoriLenda> profesoriLendaOptional = profesoriLendaService.findById(id);

        if (profesoriLendaOptional.isEmpty()) {
            throw new EntityNotFoundException("Ligjerata nuk ekziston!");
        }

        User user = userService.findUserByJwtToken(token);

        Assignment created = assignmentService.createAssignment(assignment, user, id);

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
        fileStorageService.deleteAssignmentFiles(id, "Assignments");


        return ResponseEntity.status(HttpStatus.OK).body("Assignment Removed!");
    }
    @GetMapping("/get/ligjerata/{id}")
    public ResponseEntity<List<Assignment>> getAssignmentsOfLigjerata(@PathVariable Long id) {
        return ResponseEntity.status(HttpStatus.OK).body(assignmentService.getAssignmentsOfLigjerata(id));
    }

    @GetMapping("/get/submissions/{id}")
    public ResponseEntity<List<AssignmentSubmission>> getSubmissionsOfAssignment(@PathVariable Long id) {
        return ResponseEntity.status(HttpStatus.OK).body(assignmentService.getSubmissions(id));
    }


    @PostMapping("/{assignmentId}/upload")
    public ResponseEntity<String> uploadFile(
            @PathVariable Long assignmentId,
            @RequestParam("assignment") String assignmentJson,
            @RequestParam("files") List<MultipartFile> files) {

        Assignment assignment = parseAssignmentJson(assignmentJson);

        Optional<Assignment> assignmentOptional = assignmentRepository.findById(assignmentId);
        if (!assignmentOptional.isPresent()) {
            throw new RuntimeException("Assignment not found");
        }
        Assignment existingAssignment = assignmentOptional.get();

        if (!files.isEmpty()) {
            fileStorageService.deleteAssignmentFiles(assignmentId, "Assignments");

            List<String> fileNames = new ArrayList<>();
            for (MultipartFile file : files) {
                String fileName = fileStorageService.storeFile(file, "Assignments", assignmentId);
                fileNames.add(fileName);
            }
            existingAssignment.setFileNames(fileNames);
            assignmentRepository.save(existingAssignment);
        }

        return ResponseEntity.ok("Files uploaded successfully");
    }


    private Assignment parseAssignmentJson(String assignmentJson) {
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        try {
            return objectMapper.readValue(assignmentJson, Assignment.class);
        } catch (IOException e) {
            throw new RuntimeException("Error parsing assignment JSON", e);
        }
    }


}
