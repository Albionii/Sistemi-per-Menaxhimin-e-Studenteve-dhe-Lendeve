package com.projekti.sistemimenaxhimittefakulltetit.service;

import com.projekti.sistemimenaxhimittefakulltetit.entities.Lenda;
import com.projekti.sistemimenaxhimittefakulltetit.entities.Semester;
import com.projekti.sistemimenaxhimittefakulltetit.entities.User;
import com.projekti.sistemimenaxhimittefakulltetit.repository.LendaRepository;
import com.projekti.sistemimenaxhimittefakulltetit.repository.SemesterRepository;
import com.projekti.sistemimenaxhimittefakulltetit.request.CreateLendaReq;
import io.micrometer.observation.annotation.Observed;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class LendaServiceImpl implements LendaService{
    @Autowired
    private final LendaRepository lendaRepository;

    private final SemesterRepository semesterRepository;

    @Override
    public Lenda findLendaById(Long id) throws Exception {
        Optional<Lenda> opt = lendaRepository.findById(id);

        if(opt.isEmpty()){
            throw new Exception("Lenda with id: "+id+" is not found.");
        }

        return opt.get();
    }

    @Override
    public List<Lenda> getLendet() {
        return lendaRepository.findAll();
    }

    @Override
    @Transactional
    public void deleteLenda(Long id) {
        lendaRepository.deleteById(id);
    }

    @Override
    public Lenda findLendaByProfessorId(Long id) {
        return null;
    }

    @Override
    public Lenda createLenda(CreateLendaReq request) throws Exception{
        Lenda lenda = new Lenda();


        Optional<Semester> semester = semesterRepository.findById(request.getSemester_id());

        if(request.getEmri() == null || request.getEcts() == null){
            throw new Exception("All the fields are mandatory");
        }


        System.out.println(semester.get() == null);
        lenda.setEmri(request.getEmri());
        lenda.setEcts(request.getEcts());
        lenda.setObligative(request.isObligative());
        lenda.setSemester(semester.get());



        if(lenda.getEmri() == null || lenda.getEcts() == null
                || lenda.getSemester() == null){

        if(request.getEmri() == null || request.getEcts() == null){

            throw new Exception("All the fields are mandatory");
        }
          
        lendaRepository.save(lenda);

        semester.ifPresent(s -> {
            Set<Lenda> lendet = s.getLendet();

            lendet.add(lenda);

            s.setLendet(lendet);
        });
          

        semesterRepository.save(semester.get());

        return lenda;
    }

    @Override
    public Lenda updateLenda(Long id, CreateLendaReq request) throws Exception {
        Lenda lenda = lendaRepository.getLendaById(id);

        Optional<Semester> semester = semesterRepository.findById(request.getSemester_id());

        if (lenda != null) {
            if (request.getEmri() != null) {
                lenda.setEmri(request.getEmri());
            }
            if (request.getEcts() != null) {
                lenda.setEcts(request.getEcts());
            }
            if (request.isObligative() != lenda.isObligative()) {
                lenda.setObligative(request.isObligative());
            }
            if (semester.isPresent()) {
                lenda.setSemester(semester.get());
            }
            lendaRepository.save(lenda);

            semester.ifPresent(s -> {
                Set<Lenda> lendet = s.getLendet();
                lendet.add(lenda);
                s.setLendet(lendet);

                semesterRepository.save(s);
            });

        }else {
            throw new Exception("Lenda nuk ekziston!");
        }
        return lenda;
    }

    @Override
    public void setSemesterNull(Long id) throws Exception {
        Lenda lenda = findLendaById(id);

        lenda.setSemester(null);

        lendaRepository.save(lenda);
    }


}
