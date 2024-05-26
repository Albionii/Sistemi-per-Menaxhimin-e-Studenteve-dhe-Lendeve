package com.projekti.sistemimenaxhimittefakulltetit.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Comparator;
import java.util.UUID;

@Service
public class FileStorageService {

    private final Path fileStorageLocation;

    public FileStorageService() {
        this.fileStorageLocation = Paths.get("file_storage").toAbsolutePath().normalize();
        try {
            Files.createDirectories(this.fileStorageLocation);
        } catch (Exception e) {
            throw new RuntimeException("Could not create the directory where the uploaded files will be stored.", e);
        }
    }

    public String storeFile(MultipartFile file, String folderType, Long parentId) {
        String originalFileName = StringUtils.cleanPath(file.getOriginalFilename());
        String fileName = UUID.randomUUID().toString() + "_" + originalFileName;
        try {
            if (fileName.contains("..")) {
                throw new RuntimeException("Sorry! Filename contains invalid path sequence " + fileName);
            }

            Path fileTypeFolder = this.fileStorageLocation.resolve(folderType);
            if (!Files.exists(fileTypeFolder)) {
                Files.createDirectories(fileTypeFolder);
            }

            Path parentFolder = fileTypeFolder.resolve(String.valueOf(parentId));
            if (!Files.exists(parentFolder)) {
                Files.createDirectories(parentFolder);
            }

            Path targetLocation = parentFolder.resolve(fileName);
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

            return fileName;
        } catch (IOException ex) {
            throw new RuntimeException("Could not store file " + fileName + ". Please try again!", ex);
        }
    }

    public String storeSubmission(MultipartFile file, String folderType, Long assignmentId, Long submissionId) {
        String originalFileName = StringUtils.cleanPath(file.getOriginalFilename());
        String fileName = UUID.randomUUID().toString() + "_" + originalFileName;
        try {
            if (fileName.contains("..")) {
                throw new RuntimeException("Sorry! Filename contains invalid path sequence " + fileName);
            }

            // Create the folder structure: Assignments/{assignmentId}/Submissions/{submissionId}
            Path fileTypeFolder = this.fileStorageLocation.resolve(folderType);
            if (!Files.exists(fileTypeFolder)) {
                Files.createDirectories(fileTypeFolder);
            }

            Path assignmentFolder = fileTypeFolder.resolve(String.valueOf(assignmentId));
            if (!Files.exists(assignmentFolder)) {
                Files.createDirectories(assignmentFolder);
            }

            Path submissionsFolder = assignmentFolder.resolve("Submissions");
            if (!Files.exists(submissionsFolder)) {
                Files.createDirectories(submissionsFolder);
            }

            Path submissionIdFolder = submissionsFolder.resolve(String.valueOf(submissionId));
            if (!Files.exists(submissionIdFolder)) {
                Files.createDirectories(submissionIdFolder);
            }

            // Store the file in the submissionId folder
            Path targetLocation = submissionIdFolder.resolve(fileName);
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

            return fileName;
        } catch (IOException ex) {
            throw new RuntimeException("Could not store file " + fileName + ". Please try again!", ex);
        }
    }


    public Resource loadFileAsResource(String mother, String fileName, Long parentId) {
        try {
            Path filePath = this.fileStorageLocation.resolve(mother).resolve(String.valueOf(parentId)).resolve(fileName).normalize();
            Resource resource = new UrlResource(filePath.toUri());
            if (resource.exists()) {
                return resource;
            } else {
                throw new RuntimeException("File not found: " + fileName);
            }
        } catch (MalformedURLException ex) {
            throw new RuntimeException("File not found " + fileName, ex);
        }
    }

    public void deleteAssignmentFiles(Long assignmentId, String folderName) {
        try {
            String assignmentFolderName =  folderName + "/" + assignmentId;
            Path assignmentFolder = this.fileStorageLocation.resolve(assignmentFolderName);
            System.out.println("File Path: " + assignmentFolder);
            if (Files.exists(assignmentFolder)) {
                Files.walk(assignmentFolder)
                        .sorted(Comparator.reverseOrder())
                        .map(Path::toFile)
                        .forEach(File::delete);
            }
        } catch (IOException ex) {
            throw new RuntimeException("Failed to delete " + folderName + " files for " + folderName + "id" + ": " + assignmentId, ex);
        }
    }

    public void deleteSubmissionFiles(Long assignmentId, Long submissionId) {
        try {
            Path submissionFolder = this.fileStorageLocation
                    .resolve("Assignments")
                    .resolve(String.valueOf(assignmentId))
                    .resolve("Submissions")
                    .resolve(String.valueOf(submissionId));

            System.out.println("Submission Folder Path: " + submissionFolder);

            if (Files.exists(submissionFolder)) {
                Files.walk(submissionFolder)
                        .sorted(Comparator.reverseOrder())
                        .map(Path::toFile)
                        .forEach(File::delete);
            }
        } catch (IOException ex) {
            throw new RuntimeException("Failed to delete submission files for submissionId: " + submissionId + " under assignmentId: " + assignmentId, ex);
        }
    }




}