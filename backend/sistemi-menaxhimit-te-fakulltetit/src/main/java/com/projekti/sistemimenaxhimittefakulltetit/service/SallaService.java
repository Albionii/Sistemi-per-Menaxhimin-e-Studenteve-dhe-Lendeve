package com.projekti.sistemimenaxhimittefakulltetit.service;

import com.projekti.sistemimenaxhimittefakulltetit.entities.ProfesoriLenda;
import com.projekti.sistemimenaxhimittefakulltetit.entities.Salla;
import com.projekti.sistemimenaxhimittefakulltetit.repository.SallaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
@RequiredArgsConstructor
public class SallaService {
    @Autowired
    private SallaRepository sallaRepository;
    public Optional<Salla> getSallaByID(Long id){
        return sallaRepository.findById(id);
    }

    public List<Salla> getAllSallat(){
        return sallaRepository.findAll();
    }

    public Salla updateSalla(Long id, Salla newSalla){
        Optional<Salla> salla = sallaRepository.findById(id);
        if (salla.isPresent()) {
            Salla p = salla.get();
            p.setId(newSalla.getId());
            p.setNumriSalles(newSalla.getNumriSalles());
            p.setLokacioni(newSalla.getLokacioni());
            return sallaRepository.save(p);
        } else {
            return null;
        }
    }

    public Salla createSalla(Salla salla) throws Exception{

        if(salla == null){
            throw new Exception("Salla can't be null");
        }
        return sallaRepository.save(salla);
    }

    public void deleteSalla(Long id){
        sallaRepository.deleteById(id);
    }
}
