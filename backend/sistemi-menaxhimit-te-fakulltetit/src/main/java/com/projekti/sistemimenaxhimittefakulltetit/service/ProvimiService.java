package com.projekti.sistemimenaxhimittefakulltetit.service;

import com.projekti.sistemimenaxhimittefakulltetit.entities.Lenda;
import com.projekti.sistemimenaxhimittefakulltetit.entities.Provimi;
import com.projekti.sistemimenaxhimittefakulltetit.repository.ProvimiRepository;
import com.projekti.sistemimenaxhimittefakulltetit.request.ProvimiReq;
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


    public Provimi findProvimiByLendaId(Long id)throws Exception {
        Provimi provimi = provimiRepository.findProvimiByLendaId(id);

        if(provimi == null)
            throw new Exception("Provimi per nuk u gjet!" );

        return  provimi;
    }

    public Provimi createProvimi(Lenda lenda, ProvimiReq request) throws Exception {

        if (lenda != null) {
            Provimi provimi = new Provimi();

            provimi.setLenda(lenda);
            provimi.setData(request.getData());
            provimi.setLocation(request.getLocation());

            provimiRepository.save(provimi);


            return provimi;
        } else {
            throw new Exception("Something went wrong while creating Provimi");
        }
    }


    public void deleteProvimi(Long id) {
        provimiRepository.deleteById(id);
    }

    public void removeNota(Long id){
        provimiRepository.deleteById(id);
    }
}
