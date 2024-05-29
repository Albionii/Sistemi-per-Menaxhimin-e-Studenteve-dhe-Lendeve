package com.projekti.sistemimenaxhimittefakulltetit.service;

import com.projekti.sistemimenaxhimittefakulltetit.entities.ProfesoriLenda;
import com.projekti.sistemimenaxhimittefakulltetit.entities.Professor;
import com.projekti.sistemimenaxhimittefakulltetit.entities.User;
import com.projekti.sistemimenaxhimittefakulltetit.repository.ProfessorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProfessorService {

    private final ProfessorRepository professorRepository;
    private final UserService userService;


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
            User existingUser = p.getUser();
            User updatedUser = newProfessor.getUser();
            if (updatedUser != null) {
                if (updatedUser.getFirstName() != null) existingUser.setFirstName(updatedUser.getFirstName());
                if (updatedUser.getLastName() != null) existingUser.setLastName(updatedUser.getLastName());
                if (updatedUser.getEmail() != null) existingUser.setEmail(updatedUser.getEmail());
                if (updatedUser.getDateLindja() != null) existingUser.setDateLindja(updatedUser.getDateLindja());
                if (updatedUser.getGjinia() != null) existingUser.setGjinia(updatedUser.getGjinia());
                if (updatedUser.getNrTelefonit() != null) existingUser.setNrTelefonit(updatedUser.getNrTelefonit());
                if (updatedUser.getQyteti() != null) existingUser.setQyteti(updatedUser.getQyteti());
                if (updatedUser.getZipcode() != null) existingUser.setZipcode(updatedUser.getZipcode());
                if (updatedUser.getShteti() != null) existingUser.setShteti(updatedUser.getShteti());
                if (updatedUser.getRruga() != null) existingUser.setRruga(updatedUser.getRruga());
                if (updatedUser.getRole() != null) existingUser.setRole(updatedUser.getRole());
            }
            p.setId(newProfessor.getId());
            p.setUser(existingUser);
            return professorRepository.save(p);
        } else {
            return null; // Or handle the case where the product with the given id is not found
        }

    }
}
