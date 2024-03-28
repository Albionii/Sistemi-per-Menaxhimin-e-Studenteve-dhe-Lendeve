package com.projekti.sistemimenaxhimittefakulltetit.service;

import com.projekti.sistemimenaxhimittefakulltetit.entities.Lenda;
import com.projekti.sistemimenaxhimittefakulltetit.entities.User;
import com.projekti.sistemimenaxhimittefakulltetit.repository.LendaRepository;
import com.projekti.sistemimenaxhimittefakulltetit.request.CreateLendaReq;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class LendaServiceImpl implements LendaService{
    @Autowired
    private final LendaRepository lendaRepository;

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
    public Lenda createLenda(CreateLendaReq request) {
        Lenda lenda = new Lenda();
        lenda.setEmri(request.getEmri());
        lenda.setEcts(request.getEcts());
        lenda.setObligative(request.isObligative());
        return lendaRepository.save(lenda);
    }
}
