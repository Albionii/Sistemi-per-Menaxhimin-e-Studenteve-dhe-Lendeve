package com.projekti.sistemimenaxhimittefakulltetit.service;

import com.projekti.sistemimenaxhimittefakulltetit.entities.*;
import com.projekti.sistemimenaxhimittefakulltetit.repository.LajmiRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LajmiService {
    private final LajmiRepository lajmiRepository;
    private final StudentSemesterRegistrationService studentSemesterRegistrationService;


    public List<Lajmi> findByDepartmentId(String jwt) throws Exception {
        StudentSemester studentSemester = studentSemesterRegistrationService.findSemesterByStudent(jwt);

        Departamenti departamenti = studentSemester.getSemester().getDepartamenti();

        return lajmiRepository.findByDepartamenti_Id(departamenti.getId());
    }
}
