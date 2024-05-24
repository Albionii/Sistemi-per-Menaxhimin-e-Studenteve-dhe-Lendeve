package com.projekti.sistemimenaxhimittefakulltetit.service;

import com.projekti.sistemimenaxhimittefakulltetit.entities.Ankesat;
import com.projekti.sistemimenaxhimittefakulltetit.entities.Komenti;
import com.projekti.sistemimenaxhimittefakulltetit.entities.Salla;
import com.projekti.sistemimenaxhimittefakulltetit.repository.AnkesatRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
@RequiredArgsConstructor
public class AnkesatService {
    private AnkesatRepository ankesatRepository;

    public Optional<Ankesat> getAnkesaByID(Long id){
        return ankesatRepository.findById(id);
    }

    public List<Ankesat> getAllAnkesat(){
        return ankesatRepository.findAll();
    }

    public Ankesat updateAnkesa(Long id, Ankesat newAnkesat){
        Optional<Ankesat> ankesat = ankesatRepository.findById(id);
        if (ankesat.isPresent()) {
            Ankesat p = ankesat.get();
            p.setId(newAnkesat.getId());
            p.setPermbajtja(newAnkesat.getPermbajtja());
            p.setData(newAnkesat.getData());
            p.setUserID(newAnkesat.getUserID());
            return ankesatRepository.save(p);
        } else {
            return null;
        }
    }

    public Ankesat createAnkesat(Ankesat ankesat) throws Exception{

        if(ankesat == null){
            throw new Exception("Ankesat can't be null");
        }
        return ankesatRepository.save(ankesat);
    }


    public void deleteAnkesat(Long id){
        ankesatRepository.deleteById(id);
    }

}
