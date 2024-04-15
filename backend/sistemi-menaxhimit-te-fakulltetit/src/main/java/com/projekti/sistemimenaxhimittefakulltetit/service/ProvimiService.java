package com.projekti.sistemimenaxhimittefakulltetit.service;

import com.projekti.sistemimenaxhimittefakulltetit.entities.Provimi;
import com.projekti.sistemimenaxhimittefakulltetit.repository.ProvimiRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProvimiService {

    @Autowired
    private final ProvimiRepository provimiRepository;

    public List<Provimi> findAllProvimet(){
        return provimiRepository.findAll();
    };

    public Optional<Provimi> findProvimiById(Long id){
        return provimiRepository.findById(id);
    }

    public void saveProvimi(Provimi p){
        provimiRepository.save(p);
    }

    public void deleteProvimi(Long id) {
        provimiRepository.deleteById(id);
    }

    public void removeNota(Long id){
        provimiRepository.deleteById(id);
    }
}
