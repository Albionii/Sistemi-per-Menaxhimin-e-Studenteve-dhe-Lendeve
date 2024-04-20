package com.projekti.sistemimenaxhimittefakulltetit.controller;


import com.projekti.sistemimenaxhimittefakulltetit.entities.Provimi;
import com.projekti.sistemimenaxhimittefakulltetit.entities.StudentProvim;
import com.projekti.sistemimenaxhimittefakulltetit.repository.StudentProvimRepository;
import com.projekti.sistemimenaxhimittefakulltetit.request.CreateLendaReq;
import com.projekti.sistemimenaxhimittefakulltetit.request.CreateStudentProvimRequest;
import com.projekti.sistemimenaxhimittefakulltetit.service.ProvimiService;
import com.projekti.sistemimenaxhimittefakulltetit.service.StudentProvimiService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/notat")
@RequiredArgsConstructor
public class StudentProvimiController {
    @Autowired
    private final StudentProvimiService studentProvimiService;
    private final ProvimiService provimiService;

    @GetMapping
    public ResponseEntity<List<StudentProvim>> getAllStudentExams() {
        List<StudentProvim> list = studentProvimiService.findAllStudentAndProvimet();
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @PatchMapping("/refuzo/{provimiID}")
    public void removeNota(@PathVariable Long provimiID) {
        Optional<Provimi> provimiOptional = provimiService.findProvimiById(provimiID);
        if (provimiOptional.isPresent()) {
            Provimi provimi = provimiOptional.get();
            provimi.setNota(0); // Set the new value
            provimiService.saveProvimi(provimi); // Save the updated entity back to the database
        }
    }

    @DeleteMapping("/delete/{studentProvimiID}")
    public void deleteProvimi(@PathVariable Long studentProvimiID) {
        studentProvimiService.deleteStudentAndProvimiByID(studentProvimiID);
    }


    @PostMapping("/create")
    public ResponseEntity<?> createStudentProvim(@RequestBody CreateStudentProvimRequest request) throws Exception{
        StudentProvim studentProvim = studentProvimiService.createStudentProvim(request);
        System.out.println(studentProvim.toString());
        return ResponseEntity.ok(studentProvim);

    }
}
