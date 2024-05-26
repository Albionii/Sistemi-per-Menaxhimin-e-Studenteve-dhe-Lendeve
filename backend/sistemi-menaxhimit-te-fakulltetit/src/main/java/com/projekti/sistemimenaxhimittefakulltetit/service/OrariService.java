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

    public List<Orari> findByGrupiId(Long id){
        return orariRepository.findByGrupiId(id);
    }
}
