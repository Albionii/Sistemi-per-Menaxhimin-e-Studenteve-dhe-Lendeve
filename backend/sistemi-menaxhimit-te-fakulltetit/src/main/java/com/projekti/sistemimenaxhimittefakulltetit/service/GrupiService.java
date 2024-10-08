package com.projekti.sistemimenaxhimittefakulltetit.service;

import com.projekti.sistemimenaxhimittefakulltetit.entities.Afati;
import com.projekti.sistemimenaxhimittefakulltetit.entities.Grupi;
import com.projekti.sistemimenaxhimittefakulltetit.entities.StudentSemester;
import com.projekti.sistemimenaxhimittefakulltetit.repository.GrupiRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class GrupiService {
    private final GrupiRepository grupiRepository;
    private final AfatiService afatiService;
    private final StudentSemesterRegistrationService studentSemesterRegistrationService;

    public Grupi getGrupiById(Long id){
        return grupiRepository.findById(id).orElse(null);
    }

    public List<Grupi> getAllGrupet() {
        return grupiRepository.findAll();
    }

    public List<Grupi> getGrupiBySemesterId(Long semesterId){
        return grupiRepository.findBySemesterId(semesterId);
    }

    public Grupi updateGrupiById(Long id, Grupi newGrupi){
        Grupi grupi = getGrupiById(id);
        grupi.setEmri(newGrupi.getEmri());
        grupi.setSemester(newGrupi.getSemester());

        return grupiRepository.save(newGrupi);
    }

    public Grupi createGrupi(Grupi grupi) throws Exception {
        if(grupi == null){
            throw new Exception("Ankesat can't be null");
        }
        return grupiRepository.save(grupi);
    }



    public void deleteGrupiById(Long id){
        grupiRepository.deleteById(id);
    }

    public List<Grupi> findGrupetByAfatiId(){
        Afati currentAfati = afatiService.findByCurrent().get(0);

        StudentSemester studentSemester = studentSemesterRegistrationService.getStudentSemestersByAfatiId(currentAfati.getId()).get(0);

        if (studentSemester == null) {
            return Collections.emptyList();
        }

        return grupiRepository.findBySemesterId(studentSemester.getSemester().getId());
    }
}
