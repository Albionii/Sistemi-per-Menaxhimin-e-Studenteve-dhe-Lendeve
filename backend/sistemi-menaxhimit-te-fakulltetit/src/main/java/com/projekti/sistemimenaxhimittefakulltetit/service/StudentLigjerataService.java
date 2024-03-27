package com.projekti.sistemimenaxhimittefakulltetit.service;

import com.projekti.sistemimenaxhimittefakulltetit.entities.StudentLigjerata;
import com.projekti.sistemimenaxhimittefakulltetit.repository.StudentLigjerataRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StudentLigjerataService {

    private final StudentLigjerataRepository studentLigjerataRepository;

    public List<StudentLigjerata> findLendetByStudentId(Long id){
        return studentLigjerataRepository.findByStudentId(id);
    }
}
