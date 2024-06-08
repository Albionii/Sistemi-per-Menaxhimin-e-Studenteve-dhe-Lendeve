package com.projekti.sistemimenaxhimittefakulltetit.controller;

import com.projekti.sistemimenaxhimittefakulltetit.entities.Lajmi;
import com.projekti.sistemimenaxhimittefakulltetit.service.LajmiService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/lajmet")
public class LajmiController {
    private final LajmiService lajmiService;
    @GetMapping
    public List<Lajmi> lajmetByDepartment(@RequestHeader("Authorization")String jwt) throws Exception {
        return lajmiService.findByDepartmentId(jwt);
    }
    @GetMapping("/lajmet/get")
    public List<Lajmi> getAllLajmet(){
        return lajmiService.getAllLajmet();
    }


}
