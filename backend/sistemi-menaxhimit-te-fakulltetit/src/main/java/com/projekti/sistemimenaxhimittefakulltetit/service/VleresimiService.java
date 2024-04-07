package com.projekti.sistemimenaxhimittefakulltetit.service;

import com.projekti.sistemimenaxhimittefakulltetit.repository.VleresimiRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class VleresimiService {

    private final VleresimiRepository vleresimiRepository;

    public Double notaMesatare(Long studentId){
        return vleresimiRepository.findAverageNotaByStudentId(studentId);
    }

    public void refuzoNoten(Long vleresimiId){
        vleresimiRepository.deleteById(vleresimiId);
    }
}
