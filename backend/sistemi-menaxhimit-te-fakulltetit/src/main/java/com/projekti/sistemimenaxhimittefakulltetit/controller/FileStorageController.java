package com.projekti.sistemimenaxhimittefakulltetit.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.projekti.sistemimenaxhimittefakulltetit.entities.Assignment;
import com.projekti.sistemimenaxhimittefakulltetit.repository.AssignmentRepository;
import com.projekti.sistemimenaxhimittefakulltetit.service.FileStorageService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("api/storage")
public class FileStorageController {

    @Autowired
    private FileStorageService fileStorageService;

    @Autowired
    private AssignmentRepository assignmentRepository;

    @GetMapping("/{folderType}/{parentId}/download/{fileName}")
    public ResponseEntity<Resource> downloadFile(
            @PathVariable String folderType,
            @PathVariable Long parentId,
            @PathVariable String fileName) {

        String folderName = folderType + "_" + parentId;

        Resource resource = fileStorageService.loadFileAsResource(folderType, fileName, parentId);

        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
    }



}
