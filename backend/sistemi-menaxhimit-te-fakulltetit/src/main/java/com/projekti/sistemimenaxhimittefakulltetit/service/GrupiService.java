package com.projekti.sistemimenaxhimittefakulltetit.service;

import com.projekti.sistemimenaxhimittefakulltetit.entities.Grupi;
import com.projekti.sistemimenaxhimittefakulltetit.entities.Orari;
import com.projekti.sistemimenaxhimittefakulltetit.repository.GrupiRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class GrupiService {
    private final GrupiRepository grupiRepository;

    public Optional<Grupi> getGrupiById(Long id){
        return grupiRepository.findById(id);
    }

    public List<Grupi> getAllGrupet() {
        return grupiRepository.findAll();
    }

    public List<Grupi> getGrupiBySemesterId(Long semesterId){
        return grupiRepository.findBySemesterId(semesterId);
    }
}
