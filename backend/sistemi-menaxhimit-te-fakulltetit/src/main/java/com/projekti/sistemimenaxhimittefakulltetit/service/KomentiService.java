package com.projekti.sistemimenaxhimittefakulltetit.service;

import com.projekti.sistemimenaxhimittefakulltetit.entities.Komenti;
import com.projekti.sistemimenaxhimittefakulltetit.entities.Salla;
import com.projekti.sistemimenaxhimittefakulltetit.repository.KomentRepository;
import com.projekti.sistemimenaxhimittefakulltetit.repository.PostimiRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
@RequiredArgsConstructor
public class KomentiService {
    private KomentRepository komentRepository;
    private PostimiRepository postimiRepository;

    public Optional<Komenti> getKomentiByID(Long id){
        return komentRepository.findById(id);
    }

    public List<Komenti> getAllKomentetByPostimiID(Long id){
        return postimiRepository.findPostimiById(id).getKomentet();
    }

    public Komenti updateKomenti(Long id, Komenti newKomenti){
        Optional<Komenti> komenti = komentRepository.findById(id);
        if (komenti.isPresent()) {
            Komenti p = komenti.get();
            p.setId(newKomenti.getId());
            p.setTeksti(newKomenti.getTeksti());
            p.setUserID(newKomenti.getUserID());
            p.setPostimi(newKomenti.getPostimi());
            return komentRepository.save(p);
        } else {
            return null;
        }
    }

    public Komenti createKomenti(Komenti komenti) throws Exception{

        if(komenti == null){
            throw new Exception("Komenti can't be null");
        }
        return komentRepository.save(komenti);
    }


    public void deleteKomenti(Long id){
        komentRepository.deleteById(id);
    }


}
