package com.projekti.sistemimenaxhimittefakulltetit.service;

import com.projekti.sistemimenaxhimittefakulltetit.entities.ProfesoriLenda;
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

    public Professor createProfessor(Professor p) {
        if (p != null) {
            return null;
        }
        return professorRepository.save(p);
    }

    public void deleteProfessorByID(Long id) {
        professorRepository.deleteById(id);
    }

    public Professor updateProfessor(Long id, Professor newProfessor){
        Optional<Professor> professor = professorRepository.findById(id);
        if (professor.isPresent()) {
            Professor p = professor.get();
            p.setId(newProfessor.getId());
            p.setUser(newProfessor.getUser());
            return professorRepository.save(p);
        } else {
            return null; // Or handle the case where the product with the given id is not found
        }

    }
}
