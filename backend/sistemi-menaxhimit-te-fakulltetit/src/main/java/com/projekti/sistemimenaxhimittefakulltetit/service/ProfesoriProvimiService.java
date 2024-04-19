package com.projekti.sistemimenaxhimittefakulltetit.service;

import com.projekti.sistemimenaxhimittefakulltetit.entities.ProfesoriProvimi;
import com.projekti.sistemimenaxhimittefakulltetit.entities.Professor;
import com.projekti.sistemimenaxhimittefakulltetit.entities.Provimi;
import com.projekti.sistemimenaxhimittefakulltetit.repository.ProfesoriProvimiRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class ProfesoriProvimiService {
    private ProfesoriProvimiRepository profesoriProvimiRepository;
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
