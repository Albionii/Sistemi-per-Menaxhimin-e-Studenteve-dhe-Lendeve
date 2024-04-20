package com.projekti.sistemimenaxhimittefakulltetit.service;

import com.projekti.sistemimenaxhimittefakulltetit.entities.ProfesoriLenda;
import com.projekti.sistemimenaxhimittefakulltetit.entities.ProfesoriProvimi;
import com.projekti.sistemimenaxhimittefakulltetit.entities.Professor;
import com.projekti.sistemimenaxhimittefakulltetit.entities.Provimi;
import com.projekti.sistemimenaxhimittefakulltetit.repository.ProfesoriProvimiRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ProfesoriProvimiService {
    private ProfesoriProvimiRepository profesoriProvimiRepository;


    public ProfesoriProvimi add(Professor professor, Provimi provimi) throws Exception {

        if (profesoriProvimiRepository.existsByProfessorAndProvimi(professor, provimi)) {
            throw new Exception("Lidhja e profesorit me provimin, ekziston!");
        }

        ProfesoriProvimi profesoriProvimi = new ProfesoriProvimi(professor, provimi);

        return profesoriProvimiRepository.save(profesoriProvimi);
    }

    public ProfesoriProvimi findProvimiById(Long id) {
        Optional<ProfesoriProvimi> provimi = profesoriProvimiRepository.findById(id);
        return provimi.orElse(null);

    }

    public List<ProfesoriProvimi> getProvimet(Long id) {
        return profesoriProvimiRepository.findAllByProfessorId(id);
    }


//
//    public ProfesoriProvimi add(Professor professor, Provimi provimi) throws Exception {
//
//        if (profesoriProvimiRepository.existsByProfessorAndProvimi(professor, provimi)) {
//            throw new Exception("Lidhja e profesorit me provimin, ekziston!");
//        }
//
//        ProfesoriProvimi profesoriProvimi = new ProfesoriProvimi(professor, provimi);
//
//        return profesoriProvimiRepository.save(profesoriProvimi);
//    }
}
