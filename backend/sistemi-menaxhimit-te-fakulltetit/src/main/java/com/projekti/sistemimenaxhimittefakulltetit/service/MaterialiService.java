package com.projekti.sistemimenaxhimittefakulltetit.service;

import com.projekti.sistemimenaxhimittefakulltetit.entities.Materiali;
import com.projekti.sistemimenaxhimittefakulltetit.entities.ProfesoriLenda;
import com.projekti.sistemimenaxhimittefakulltetit.repository.MaterialiRepository;
import com.projekti.sistemimenaxhimittefakulltetit.repository.ProfesoriLendaRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class MaterialiService {

    private MaterialiRepository materialiRepository;
    private ProfesoriLendaRepository profesoriLendaRepository;


    public Materiali createMateriali(ProfesoriLenda profesoriLenda, Materiali materiali) {

        if (profesoriLenda == null) {
            throw new EntityNotFoundException("Ligjerata me profesorin nuk u gjete!");
        }

        materialiRepository.save(materiali);

        profesoriLenda.getMateriali().add(materiali);
        profesoriLendaRepository.save(profesoriLenda);

        return materiali;
    }

    public Materiali updateMateriali(Materiali updated) {

        Optional<Materiali> materiali = materialiRepository.findById(updated.getId());

        materiali.ifPresent((material) -> {
            material.setTitulli(updated.getTitulli());
            material.setMesazhi(updated.getMesazhi());
             material.setFileNames(updated.getFileNames());

             materialiRepository.save(material);
        });

        return null;
    }

    public void deleteMateriali(Long materialId) {
        Optional<Materiali> materiali = materialiRepository.findById(materialId);

        materiali.ifPresent((material) -> {
            ProfesoriLenda profesoriLenda = profesoriLendaRepository.findByMaterialiContaining(material);

            profesoriLenda.getMateriali().remove(material);
            materialiRepository.delete(material);

        });
    }
}
