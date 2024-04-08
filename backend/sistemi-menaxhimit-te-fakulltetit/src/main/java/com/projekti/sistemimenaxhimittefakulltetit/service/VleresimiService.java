package com.projekti.sistemimenaxhimittefakulltetit.service;

import com.projekti.sistemimenaxhimittefakulltetit.entities.Vleresimi;
import com.projekti.sistemimenaxhimittefakulltetit.repository.VleresimiRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class VleresimiService {

    private final VleresimiRepository vleresimiRepository;

    public Double notaMesatare(Long studentId){
        return vleresimiRepository.findAverageNotaByStudentId(studentId);
    }

    //Create
    public Vleresimi addNota(Vleresimi vleresimi){
        return vleresimiRepository.save(vleresimi);
    }

    //Delete
    public void refuzoNoten(Long vleresimiId){
        vleresimiRepository.deleteById(vleresimiId);
    }

    //Read
    public List<Vleresimi> getAllNotat(Long studentId){
        return vleresimiRepository.getAllNotat(studentId);
    }

    //Update
    public Optional<Vleresimi> updateNota(Vleresimi updatedVleresimi, Long oldVleresimiId) {
        Optional<Vleresimi> oldNotaOptional = vleresimiRepository.findById(oldVleresimiId);

        if (oldNotaOptional.isPresent()) {
            Vleresimi oldNota = oldNotaOptional.get();
            oldNota.setNota(updatedVleresimi.getNota());
            oldNota.setDataVendosjes(updatedVleresimi.getDataVendosjes());
            vleresimiRepository.save(oldNota);
        }

        return oldNotaOptional;
    }

    public Double[] mesateretPerNote(Long id) {
        List<Double[]> notatPerqindjet = vleresimiRepository.mesataretPerNote(id);

        if (notatPerqindjet != null && !notatPerqindjet.isEmpty()) {
            return notatPerqindjet.get(0);
        } else {
            return new Double[0];
        }
    }
}
