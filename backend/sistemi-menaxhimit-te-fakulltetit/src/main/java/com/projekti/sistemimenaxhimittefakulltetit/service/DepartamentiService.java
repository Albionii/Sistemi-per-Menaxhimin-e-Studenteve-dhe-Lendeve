package com.projekti.sistemimenaxhimittefakulltetit.service;

import com.projekti.sistemimenaxhimittefakulltetit.entities.Departamenti;
import com.projekti.sistemimenaxhimittefakulltetit.repository.DepartamentiRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class DepartamentiService {
    @Autowired
    private final DepartamentiRepository departamentiRepository;

    public Optional<Departamenti> findByDepartamentiId(Long id) {
        return departamentiRepository.findById(id);
    }
    public void deleteDepartamentiById(Long id){ departamentiRepository.deleteById(id);
    }

    public void createDepartamenti(Departamenti d){
        departamentiRepository.save(d);
    }
    public void updateDepartamenti(Departamenti departamenti){
        departamentiRepository.save(departamenti);
    }
}
