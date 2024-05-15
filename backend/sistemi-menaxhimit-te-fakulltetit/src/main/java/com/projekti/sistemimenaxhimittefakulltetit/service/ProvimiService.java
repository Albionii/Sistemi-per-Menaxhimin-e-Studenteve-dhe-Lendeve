package com.projekti.sistemimenaxhimittefakulltetit.service;

import com.projekti.sistemimenaxhimittefakulltetit.entities.Lenda;
import com.projekti.sistemimenaxhimittefakulltetit.entities.ProfesoriLenda;
import com.projekti.sistemimenaxhimittefakulltetit.entities.Professor;
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

    private final ProfesoriLendaService profesoriLendaService;

    public List<Provimi> findAllProvimet(){
        return provimiRepository.findAll();
    };

    public Optional<Provimi> findProvimiById(Long id){
        return provimiRepository.findById(id);
    }


    public Provimi createProvimi(Provimi provimi) throws Exception{

        if(provimi == null){
            throw new Exception("Provimi can't be null");
        }
        return provimiRepository.save(provimi);
    }

    public List<Provimi> getAllProvimet(){
        return provimiRepository.findAll();
    }

    public Provimi updateProvimiByID(Long id, Provimi newProvimi){
        Optional<Provimi> provimi = provimiRepository.findById(id);
        if (provimi.isPresent()) {
            Provimi p = provimi.get();
            p.setId(newProvimi.getId());
            p.setLigjerata(newProvimi.getLigjerata());
            p.setData(newProvimi.getData());
            p.setLocation(newProvimi.getLocation());
//            p.setStudentProvimet(newProvimi.getStudentProvimet());
            return provimiRepository.save(p);
        } else {
            return null; // Or handle the case where the product with the given id is not found
        }

    }


//    public Provimi createProvimi(ProfesoriLenda lenda, ProvimiReq request) throws Exception {
//
//        if (lenda != null) {
//            Provimi provimi = new Provimi();
//
//            Optional<ProfesoriLenda> ligjerata = profesoriLendaService.findById(lenda.getId());
//
//
//            provimi.setLigjerata(ligjerata.get());
//            provimi.setData(request.getData());
//            provimi.setLocation(request.getLocation());
//
//            provimiRepository.save(provimi);
//
//
//            return provimi;
//        } else {
//            throw new Exception("Something went wrong while creating Provimi");
//        }
//    }


    public void deleteProvimi(Long id) {
        provimiRepository.deleteById(id);
    }

    public Provimi findProvimiByLigjerataId(Long id) {
        return provimiRepository.findProvimiByLigjerataId(id);
    }

    public List<Provimi> findProvimetByLigjerataId(ProfesoriLenda profesoriLenda) {
        return provimiRepository.findAllByLigjerataId(profesoriLenda.getId());
    }

    public void removeNota(Long id){
        provimiRepository.deleteById(id);
    }
}
