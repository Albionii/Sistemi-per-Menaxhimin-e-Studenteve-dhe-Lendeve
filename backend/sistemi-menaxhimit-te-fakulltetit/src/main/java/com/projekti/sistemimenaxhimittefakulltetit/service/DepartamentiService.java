package com.projekti.sistemimenaxhimittefakulltetit.service;

import com.projekti.sistemimenaxhimittefakulltetit.entities.Departamenti;
import com.projekti.sistemimenaxhimittefakulltetit.entities.Fakulteti;
import com.projekti.sistemimenaxhimittefakulltetit.repository.DepartamentiRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
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
    public List<Departamenti> findAll(){return departamentiRepository.findAll();}

    public Departamenti createDepartamenti(Departamenti d){
        return departamentiRepository.save(d);
    }


    public Departamenti updateDepartamenti(Long id, Departamenti newDepartamenti){
        Optional<Departamenti> departamenti = departamentiRepository.findById(id);
        if (departamenti.isPresent()) {
            Departamenti d = departamenti.get();
            d.setId(newDepartamenti.getId());
            d.setEmri(newDepartamenti.getEmri());
            d.setLokacioni(newDepartamenti.getLokacioni());
            d.setEmail(newDepartamenti.getEmail());
            return departamentiRepository.save(d);
        } else {
            return null;
        }
    }
}
