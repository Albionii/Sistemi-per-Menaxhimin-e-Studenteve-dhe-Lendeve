package com.projekti.sistemimenaxhimittefakulltetit.service;

import com.projekti.sistemimenaxhimittefakulltetit.entities.Fakulteti;
import com.projekti.sistemimenaxhimittefakulltetit.entities.User;
import com.projekti.sistemimenaxhimittefakulltetit.repository.FakultetiRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

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

    public void updateDrejtori(User drejtori,Long fakultetiId){
        Optional<Fakulteti> f = fakultetiRepository.findById(fakultetiId);
        f.get().setUser(drejtori);
        Fakulteti fSave = f.get();
        fakultetiRepository.save(fSave);
    }
}
