package com.projekti.sistemimenaxhimittefakulltetit.controller;

import com.projekti.sistemimenaxhimittefakulltetit.entities.Lajmi;
import com.projekti.sistemimenaxhimittefakulltetit.service.LajmiService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/lajmet")
public class LajmiController {
    private final LajmiService lajmiService;
    @GetMapping
    public List<Lajmi> lajmetByDepartment(@RequestHeader("Authorization")String jwt) throws Exception {
        return lajmiService.findByDepartmentId(jwt);
    }
}
