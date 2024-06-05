package com.projekti.sistemimenaxhimittefakulltetit.service;

import com.projekti.sistemimenaxhimittefakulltetit.entities.*;
import com.projekti.sistemimenaxhimittefakulltetit.repository.OrariLigjerataRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class OrariLigjerataService {
    private final OrariLigjerataRepository orariLigjerataRepository;
    private final OrariService orariService;
    private final GrupiService grupiService;
    private final StudentGrupiService studentGrupiService;
    private final StudentService studentService;
    private final UserService userService;
    private final StudentSemesterRegistrationService studentSemesterRegistrationService;

    public List<OrariLigjerata> getByOrariId(Long id){
        List<Orari> byGrupiId = orariService.findByGrupiId(id);
        return orariLigjerataRepository.findByOrariId(byGrupiId.get(0).getId());
    }

//    public List<OrariLigjerata> getOrariLigjertaByDita(String jwt, String dita) throws Exception {
//        StudentSemester studentSemester = studentSemesterRegistrationService.findSemesterByStudent(jwt);
//        Grupi grupi = (Grupi) grupiService.getGrupiBySemesterId(studentSemester.getSemester().getId());
//        Orari orari = (Orari) orariService.findByGrupiId(grupi.getId());
//        List<OrariLigjerata> orariLigjerata = orariLigjerataRepository.findByOrariId(orari.getId());
//
//        List<OrariLigjerata> orariLigjeratat = new ArrayList<>();
//
//        for(OrariLigjerata orariLigjerata1 : orariLigjerata){
//            if(orariLigjerata1.getDita().equals(dita)){
//                orariLigjeratat.add(orariLigjerata1);
//            }
//        }
//        return orariLigjeratat;
//    }


    public List<OrariLigjerata> getOrariByDita(String dita, String jwt) throws Exception {
        Long studentId = userService.findUserByJwtToken(jwt).getId();

        Student student = studentService.findStudentByUserId(studentId);


        return orariLigjerataRepository.findByDita(dita, student.getId());
    }

    public List<OrariLigjerata> findAll(){
        return orariLigjerataRepository.findAll();
    }

    public void deleteById(Long id){
        orariLigjerataRepository.deleteById(id);
    }

    public Optional<OrariLigjerata> findById(Long id){
        return orariLigjerataRepository.findById(id);
    }

    public OrariLigjerata create(OrariLigjerata orariLigjerata) throws Exception {
        if(orariLigjerata == null){
            throw new Exception("OrariLigjerata nuk duhet te jete null!");
        }
        OrariLigjerata orariLigjerata1 = new OrariLigjerata();

        orariLigjerata1.setLigjerata(orariLigjerata.getLigjerata());
        orariLigjerata1.setOrari(orariLigjerata.getOrari());
        orariLigjerata1.setOra(orariLigjerata.getOra());
        orariLigjerata1.setDita(orariLigjerata.getDita());
        orariLigjerata1.setSalla(orariLigjerata.getSalla());

        return orariLigjerataRepository.save(orariLigjerata1);
    }

    public OrariLigjerata updateById(Long id, OrariLigjerata orariLigjerata) throws Exception{
        if(orariLigjerata == null){
            throw new Exception("OrariLigjerata nuk duhet te jete null!");
        }
        OrariLigjerata orariLigjerata1 = orariLigjerataRepository.findById(id).orElseThrow(ChangeSetPersister.NotFoundException::new);

        orariLigjerata1.setLigjerata(orariLigjerata.getLigjerata());
        orariLigjerata1.setOrari(orariLigjerata.getOrari());
        orariLigjerata1.setOra(orariLigjerata.getOra());
        orariLigjerata1.setDita(orariLigjerata.getDita());
        orariLigjerata1.setSalla(orariLigjerata.getSalla());

        return orariLigjerataRepository.save(orariLigjerata1);
    }
}
