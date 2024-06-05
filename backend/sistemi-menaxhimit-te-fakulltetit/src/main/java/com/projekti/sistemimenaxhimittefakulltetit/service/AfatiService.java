package com.projekti.sistemimenaxhimittefakulltetit.service;

import com.projekti.sistemimenaxhimittefakulltetit.entities.Afati;
import com.projekti.sistemimenaxhimittefakulltetit.repository.AfatiRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AfatiService {
    private final AfatiRepository afatiRepository;

    public Afati createAfati(Afati afati) {
        return afatiRepository.save(afati);
    }

    public Optional<Afati> getAfatiById(Long id) {
        return afatiRepository.findById(id);
    }

    public List<Afati> getAllAfati() {
        return afatiRepository.findAll();
    }

    public Afati updateAfati(Long id, Afati afati) {
        if (afatiRepository.existsById(id)) {
            afati.setId(id);
            return afatiRepository.save(afati);
        } else {
            throw new IllegalArgumentException("Afati not found");
        }
    }

    public void deleteAfati(Long id){
        afatiRepository.deleteById(id);
    }

    public List<Afati> findByCurrent(){
        Date currentDate1 = new Date();
        Date currentDate2 = new Date();
        return afatiRepository.findByDataFillimitLessThanEqualAndDataMbarimitGreaterThanEqual(currentDate1, currentDate2);
    }

}
