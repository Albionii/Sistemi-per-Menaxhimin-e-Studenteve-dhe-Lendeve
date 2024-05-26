package com.projekti.sistemimenaxhimittefakulltetit.service;

import com.projekti.sistemimenaxhimittefakulltetit.entities.Fakulteti;
import com.projekti.sistemimenaxhimittefakulltetit.entities.User;
import com.projekti.sistemimenaxhimittefakulltetit.repository.FakultetiRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor

public class FakultetiService {

    private final FakultetiRepository fakultetiRepository;

    public Optional<Fakulteti> findFakultetiById(Long id) {
        return fakultetiRepository.findById(id);
    }

    public void deleteFakultetiById(Long id){
        fakultetiRepository.deleteById(id);
    }

    public void createFakulteti(Fakulteti f){
        fakultetiRepository.save(f);
    }

    public void updateDrejtori(Fakulteti f){
        fakultetiRepository.save(f);
    }

    public List<Fakulteti> getAllFakulteti(){return fakultetiRepository.findAll();}
}
