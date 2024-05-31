package com.projekti.sistemimenaxhimittefakulltetit.service;

import com.projekti.sistemimenaxhimittefakulltetit.entities.Orari;
import com.projekti.sistemimenaxhimittefakulltetit.repository.OrariRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class OrariService {

    private final OrariRepository orariRepository;

    public Optional<Orari> findOrariById(Long id){
        return orariRepository.findById(id);
    }

    public List<Orari> getAllOraret(){
        return orariRepository.findAll();
    }

    public Orari createOrari(Orari newOrari) throws Exception {
        if(newOrari == null){
            throw new Exception("Nuk lejohen vlera null!");
        }
        Orari orari = new Orari();
        orari.setGrupi(newOrari.getGrupi());
        orari.setName(newOrari.getName());
        return orariRepository.save(orari);
    }

    public Orari updateOrari(Long id, Orari newOrari){

        Orari orari = findOrariById(id).orElseThrow(() ->
                new IllegalArgumentException("Nuk eshte gjetur orari me id: "+id));

        orari.setName(newOrari.getName());
        orari.setGrupi(newOrari.getGrupi());
        return orariRepository.save(orari);
    }

    public void deleteOrari(Long id){
        orariRepository.deleteById(id);
    }

    public List<Orari> findByGrupiId(Long id){
        return orariRepository.findByGrupiId(id);
    }
}
