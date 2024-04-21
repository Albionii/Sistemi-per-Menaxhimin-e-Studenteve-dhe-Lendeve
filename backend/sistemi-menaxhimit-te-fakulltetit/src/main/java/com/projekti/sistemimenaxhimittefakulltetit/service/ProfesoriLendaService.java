package com.projekti.sistemimenaxhimittefakulltetit.service;

import com.projekti.sistemimenaxhimittefakulltetit.entities.Lenda;
import com.projekti.sistemimenaxhimittefakulltetit.entities.ProfesoriLenda;
import com.projekti.sistemimenaxhimittefakulltetit.entities.ProfesoriProvimi;
import com.projekti.sistemimenaxhimittefakulltetit.entities.Professor;
import com.projekti.sistemimenaxhimittefakulltetit.repository.ProfesoriLendaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProfesoriLendaService {
    private final ProfesoriLendaRepository profesoriLendaRepository;

    public Optional<ProfesoriLenda> findLendaByProfesoriId(Long id){
        return profesoriLendaRepository.findById(id);
    }

    public List<ProfesoriLenda> findLendaByProfesoriIdaaaaaaaa(Long id){
        return profesoriLendaRepository.findAllByProfessorId(id);
    }

    public Optional<ProfesoriLenda> findById(Long id) {
        return profesoriLendaRepository.findById(id);
    }
    public List<ProfesoriLenda> findAllByLendaId(Long id) {
        return profesoriLendaRepository.findAllByLendaId(id);
    }

    public ProfesoriLenda createLigjerata(ProfesoriLenda ligjerata) throws Exception{

        if(ligjerata == null){
            throw new Exception("Ligjerata can't be null");
        }
        ProfesoriLenda ligjerata1 = new ProfesoriLenda(ligjerata.getProfessor(), ligjerata.getLenda());

//        ligjerata1.setLenda(ligjerata.getLenda());
//        ligjerata1.setProfessor(ligjerata.getProfessor());

        return profesoriLendaRepository.save(ligjerata1);
    }

    public ProfesoriLenda findByProfessorAndLenda(Professor professor, Lenda lenda) {
        return profesoriLendaRepository.findByProfessorAndLenda(professor, lenda);
    }
}
