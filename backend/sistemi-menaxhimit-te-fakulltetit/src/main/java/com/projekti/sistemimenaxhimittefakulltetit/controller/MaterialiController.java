package com.projekti.sistemimenaxhimittefakulltetit.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.projekti.sistemimenaxhimittefakulltetit.entities.Assignment;
import com.projekti.sistemimenaxhimittefakulltetit.entities.Materiali;
import com.projekti.sistemimenaxhimittefakulltetit.entities.ProfesoriLenda;
import com.projekti.sistemimenaxhimittefakulltetit.repository.MaterialiRepository;
import com.projekti.sistemimenaxhimittefakulltetit.service.FileStorageService;
import com.projekti.sistemimenaxhimittefakulltetit.service.MaterialiService;
import com.projekti.sistemimenaxhimittefakulltetit.service.ProfesoriLendaService;
import com.projekti.sistemimenaxhimittefakulltetit.service.ProfesoriProvimiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/professor/materiali/")
public class MaterialiController {
    @Autowired
    private MaterialiService materialiService;
    @Autowired
    private ProfesoriLendaService profesoriLendaService;

    @Autowired
    private FileStorageService fileStorageService;

    @Autowired
    private MaterialiRepository materialiRepository;

    @PostMapping("create/{ligjerataId}")
    public ResponseEntity<Materiali> createMateriali(@PathVariable Long ligjerataId, @RequestBody Materiali materiali) {

        Optional<ProfesoriLenda> profesoriLenda = profesoriLendaService.findById(ligjerataId);

        if (profesoriLenda.isPresent()) {
            return ResponseEntity.status(HttpStatus.OK).body(materialiService.createMateriali(profesoriLenda.get(), materiali));
        }

        return  ResponseEntity.status(HttpStatus.NOT_FOUND).body(materiali);
    }

    @PutMapping("update")
    public ResponseEntity<Materiali> updateMateriali(@RequestBody Materiali materiali) {

        return ResponseEntity.status(HttpStatus.OK).body(materialiService.updateMateriali(materiali));
    }

    @DeleteMapping("delete/{materialId}")
    public void deleteMateriali(@PathVariable Long materialId) {
        materialiService.deleteMateriali(materialId);
        fileStorageService.deleteAssignmentFiles(materialId, "Materiali");
    }



    @PostMapping("/{materialId}/upload")
    public ResponseEntity<String> uploadFile(
            @PathVariable Long materialId,
            @RequestParam("assignment") String materialiJson,
            @RequestParam("files") List<MultipartFile> files) {

        Materiali materiali = parseMaterialiJson(materialiJson);

        Optional<Materiali> assignmentOptional = materialiRepository.findById(materialId);
        if (!assignmentOptional.isPresent()) {
            throw new RuntimeException("Assignment not found");
        }
        Materiali existingMaterial = assignmentOptional.get();



        if (!files.isEmpty()) {
            fileStorageService.deleteAssignmentFiles(materialId, "Materiali");

            List<String> fileNames = new ArrayList<>();
            for (MultipartFile file : files) {
                String fileName = fileStorageService.storeFile(file, "Materiali", materialId);
                fileNames.add(fileName);
            }

            existingMaterial.setFileNames(fileNames);
            materialiRepository.save(existingMaterial);
        }



        return ResponseEntity.ok("Files uploaded successfully");
    }

    private Materiali parseMaterialiJson(String materialiJson) {
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        try {
            return objectMapper.readValue(materialiJson, Materiali.class);
        } catch (IOException e) {
            throw new RuntimeException("Error parsing assignment JSON", e);
        }
    }


}

