package com.projekti.sistemimenaxhimittefakulltetit.service;

import com.projekti.sistemimenaxhimittefakulltetit.entities.Lenda;
import com.projekti.sistemimenaxhimittefakulltetit.entities.LendaSemester;
import com.projekti.sistemimenaxhimittefakulltetit.repository.LendaSemesterRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class LendaSemesterService {

    private final LendaSemesterRepository lendaSemesterRepository;

    public LendaSemester shto(LendaSemester lendaSemester) {
        if(lendaSemester == null) {
            throw new NullPointerException("LendaSemester is null!");
        }
        return lendaSemesterRepository.save(lendaSemester);
    }

    public void delete(Long id) {
        if(getLendaSemesterById(id) == null) {
            throw new EntityNotFoundException("Lenda nuk u gjet!");
        }
        lendaSemesterRepository.deleteById(id);
    }

    public LendaSemester getLendaSemesterById(Long id) {
        Optional<LendaSemester> lendaSemester = lendaSemesterRepository.findById(id);
        return lendaSemester.get();
    }

    public List<Lenda> getAllLendaBySemesterId(Long semesterId) {
        List<LendaSemester> lendaSemesters = lendaSemesterRepository.findBySemesterId(semesterId);
        return lendaSemesters.stream()
                .map(LendaSemester::getLenda)
                .collect(Collectors.toList());
    }
}
