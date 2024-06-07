package com.projekti.sistemimenaxhimittefakulltetit.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.projekti.sistemimenaxhimittefakulltetit.entities.Assignment;
import com.projekti.sistemimenaxhimittefakulltetit.entities.AssignmentSubmission;
import com.projekti.sistemimenaxhimittefakulltetit.entities.User;
import com.projekti.sistemimenaxhimittefakulltetit.repository.AssignmentRepository;
import com.projekti.sistemimenaxhimittefakulltetit.repository.AssignmentSubmissionRepository;
import com.projekti.sistemimenaxhimittefakulltetit.repository.UserRepository;
import com.projekti.sistemimenaxhimittefakulltetit.service.AssignmentService;
import com.projekti.sistemimenaxhimittefakulltetit.service.FileStorageService;

import com.projekti.sistemimenaxhimittefakulltetit.service.UserService;
import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

@RestController
@RequestMapping("api/storage")
public class FileStorageController {

    @Autowired
    private FileStorageService fileStorageService;

    @Autowired
    private AssignmentRepository assignmentRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AssignmentSubmissionRepository assignmentSubmissionRepository;

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

    @GetMapping("/{assignmentId}/{submissionId}")
    public ResponseEntity<byte[]> downloadSubmission(
            @PathVariable Long assignmentId,
            @PathVariable Long submissionId
    ) {
        String mother = "Assignments/" + assignmentId + "/Submissions";

        Optional<AssignmentSubmission> submissionOpt = assignmentSubmissionRepository.findById(submissionId);

        if (!submissionOpt.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        AssignmentSubmission submission = submissionOpt.get();
        Long submitterId = submission.getSubmiter().getId();
        String submitterName = submission.getSubmiter().getFirstName();
        String submitterSurname = submission.getSubmiter().getLastName();

        List<Resource> resources = fileStorageService.loadFilesAsResources(mother, submissionId);

        if (resources.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        try (ZipOutputStream zos = new ZipOutputStream(baos)) {
            for (Resource resource : resources) {
                ZipEntry entry = new ZipEntry(resource.getFilename());
                zos.putNextEntry(entry);
                IOUtils.copy(resource.getInputStream(), zos);
                zos.closeEntry();
            }
        } catch (IOException e) {
            // Handle exception
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

        String fileName = submitterId + "." + submitterName + submitterSurname + ".zip";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        headers.setContentDispositionFormData("attachment", fileName);

        return ResponseEntity.ok()
                .headers(headers)
                .body(baos.toByteArray());
    }


    @PostMapping("/profile/upload")
    public ResponseEntity<User> uploadFile(
            @RequestHeader("Authorization") String token,
            @RequestParam("files") MultipartFile file) throws Exception {

        System.out.println("Upload request received");
        System.out.println("File name: " + file.getOriginalFilename());

        User user = userService.findUserByJwtToken(token);
        if (user == null) {
            System.out.println("User not found");
            return ResponseEntity.badRequest().body(null);
        }

        System.out.println("User found: " + user.getId());

        if (file != null && !file.isEmpty()) {
            try {
                System.out.println("Deleting user files");
                fileStorageService.deleteUserFiles(user.getId());

                System.out.println("Storing new profile picture");
                String fileName = fileStorageService.storeProfile(file, "Users", user.getId());

                user.setProfile(fileName);

                userRepository.save(user);

                System.out.println(user);

                return ResponseEntity.ok().body(user);
            } catch (Exception ex) {
                ex.printStackTrace();
                System.out.println("Failed to upload file: " + ex.getMessage());
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
            }
        } else {
            System.out.println("No file to upload");
            return ResponseEntity.badRequest().body(null);
        }
    }

    @GetMapping("/profile/exists")
    public boolean profileExists(@RequestHeader("Authorization")String token) throws Exception {
        User user = userService.findUserByJwtToken(token);
        return fileStorageService.profileExists(user.getId());
    }

    @DeleteMapping("/profile/delete")
    public void deleteProfilePicture(@RequestHeader("Authorization")String token) throws Exception {
        User user = userService.findUserByJwtToken(token);
        fileStorageService.deleteUserFiles(user.getId());
    }

    
}
