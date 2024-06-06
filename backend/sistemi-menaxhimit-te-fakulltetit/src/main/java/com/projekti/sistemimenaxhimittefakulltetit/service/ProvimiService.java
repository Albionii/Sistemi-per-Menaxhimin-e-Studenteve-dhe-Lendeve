package com.projekti.sistemimenaxhimittefakulltetit.service;

import com.projekti.sistemimenaxhimittefakulltetit.entities.*;
import com.projekti.sistemimenaxhimittefakulltetit.repository.ProvimiRepository;
import com.projekti.sistemimenaxhimittefakulltetit.request.ProvimiReq;
import com.projekti.sistemimenaxhimittefakulltetit.response.OrariLigjerataDTO;
import com.projekti.sistemimenaxhimittefakulltetit.response.ProvimiDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProvimiService {

    @Autowired
    private final ProvimiRepository provimiRepository;

    private final ProfesoriLendaService profesoriLendaService;

    private final UserService userService;

    private final ProfessorService professorService;

    public List<Provimi> findAllProvimet(){
        return provimiRepository.findAll();
    };

    public List<Provimi> findAllProvimetByLigjerataId(Long id){return provimiRepository.findAllByLigjerataId(id);}

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

    public List<ProvimiDTO> getProvimetByProfessorId(String jwt) throws Exception{
        Long professorId = userService.findUserByJwtToken(jwt).getId();

        Professor professor = professorService.findProfessorByUserId(professorId);
        List<Provimi> provimiList = provimiRepository.findByLigjerata_Professor_Id(professor.getId());
        return provimiList.stream()
                .map(p -> new ProvimiDTO(p.getLigjerata().getLenda().getEmri(), p.getData()))
                .collect(Collectors.toList());
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

    public List<Provimi> findAllProvimiByLigjerataId(Long id) {
        return provimiRepository.findAllByLigjerataId(id);
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
