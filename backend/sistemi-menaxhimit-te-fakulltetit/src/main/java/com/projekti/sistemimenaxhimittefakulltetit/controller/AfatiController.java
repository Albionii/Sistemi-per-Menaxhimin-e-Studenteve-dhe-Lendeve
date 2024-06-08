package com.projekti.sistemimenaxhimittefakulltetit.controller;

import com.projekti.sistemimenaxhimittefakulltetit.entities.Afati;
import com.projekti.sistemimenaxhimittefakulltetit.service.AfatiService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/afati")
@RequiredArgsConstructor
public class AfatiController {
    private final AfatiService afatiService;




    @GetMapping("/date")
    public List<Afati> currentDate(){
        return afatiService.findByCurrent();
    }
}
