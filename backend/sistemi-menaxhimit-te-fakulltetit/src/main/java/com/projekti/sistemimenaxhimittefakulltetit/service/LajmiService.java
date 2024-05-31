package com.projekti.sistemimenaxhimittefakulltetit.service;

import com.projekti.sistemimenaxhimittefakulltetit.entities.*;
import com.projekti.sistemimenaxhimittefakulltetit.repository.LajmiRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class LajmiService {
    private final LajmiRepository lajmiRepository;
    private final StudentSemesterRegistrationService studentSemesterRegistrationService;


    public List<Lajmi> findByDepartmentId(String jwt) throws Exception {
        StudentSemester studentSemester = studentSemesterRegistrationService.findSemesterByStudent(jwt);

        Departamenti departamenti = studentSemester.getSemester().getDepartamenti();

        return lajmiRepository.findByDepartamenti_Id(departamenti.getId());
    }

    public Optional<Lajmi> getLajmiById(Long id){
        return lajmiRepository.findById(id);
    }

    public void deleteLajmiById(Long id){
        lajmiRepository.deleteById(id);
    }

    public List<Lajmi> getAllLajmet(){
        return lajmiRepository.findAll();
    }

    public Lajmi createLajmi(Lajmi newLajmi) throws Exception {
        if(newLajmi == null){
            throw new Exception("Lajmi nuk duhet te jete null");
        }
        Lajmi lajmi = new Lajmi();
        lajmi.setDepartamenti(newLajmi.getDepartamenti());
        lajmi.setMesazhi(newLajmi.getMesazhi());
        return lajmiRepository.save(lajmi);
    }

    public Lajmi updateLajmiById(Long id, Lajmi updatedLajmi) throws  Exception{
        if(updatedLajmi == null){
            throw new Exception("Lajmi nuk mund te jete null");
        }
        Lajmi lajmi = lajmiRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Nuk u gjet lajmi me id: "+id));
        lajmi.setMesazhi(updatedLajmi.getMesazhi());
        lajmi.setDepartamenti(updatedLajmi.getDepartamenti());
        return lajmiRepository.save(lajmi);
    }
}
