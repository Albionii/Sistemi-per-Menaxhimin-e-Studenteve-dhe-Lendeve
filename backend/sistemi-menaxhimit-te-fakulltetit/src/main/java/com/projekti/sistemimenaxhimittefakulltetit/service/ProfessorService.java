package com.projekti.sistemimenaxhimittefakulltetit.service;

import com.projekti.sistemimenaxhimittefakulltetit.entities.Professor;
import com.projekti.sistemimenaxhimittefakulltetit.repository.ProfessorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProfessorService {

    private final ProfessorRepository professorRepository;

    public Professor findProfessorByUserId(Long id){
        return professorRepository.findProfessorByUserId(id);
    }

    public Professor findProfessorById(Long id) {
        return professorRepository.findProfessorById(id);
    }

    public Optional<Professor> findProfById(Long id) {
        return professorRepository.findById(id);
    }

    public List<Professor> getProfessors(){
        return professorRepository.findAll();
    }
}
