package com.projekti.sistemimenaxhimittefakulltetit.service;

import com.projekti.sistemimenaxhimittefakulltetit.entities.Komenti;
import com.projekti.sistemimenaxhimittefakulltetit.entities.Postimi;
import com.projekti.sistemimenaxhimittefakulltetit.entities.Salla;
import com.projekti.sistemimenaxhimittefakulltetit.entities.User;
import com.projekti.sistemimenaxhimittefakulltetit.repository.KomentRepository;
import com.projekti.sistemimenaxhimittefakulltetit.repository.PostimiRepository;
import com.projekti.sistemimenaxhimittefakulltetit.request.KomentiReq;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
@RequiredArgsConstructor
public class KomentiService {
    @Autowired
    private KomentRepository komentRepository;
    @Autowired
    private PostimiRepository postimiRepository;

    public Optional<Komenti> getKomentiByID(Long id){
        return komentRepository.findById(id);
    }

    public List<Komenti> getKomentetUser(Long id, User user) {
        Postimi postimi = postimiRepository.findPostimiById(id);

        List<Komenti> allKomentet = postimi.getKomentet();
        List<Komenti> userKomentet = new ArrayList<>();
        for (Komenti koment : allKomentet) {
            if (koment.getUserID().getId() == user.getId()) {
                userKomentet.add(koment);
            }
        }
        System.out.println(userKomentet.isEmpty());
        return userKomentet;
    }

    public List<Komenti> getAllKomentetByPostimiID(Long id){
        return postimiRepository.findPostimiById(id).getKomentet();
    }

    public Komenti updateKomenti(Long id, KomentiReq newKomenti, User user){
        Optional<Komenti> komenti = komentRepository.findById(id);
        if (komenti.isPresent()) {
            Komenti p = komenti.get();
            p.setTeksti(newKomenti.getTeksti());
            p.setUserID(user);
            return komentRepository.save(p);
        } else {
            return null;
        }
    }

    public Komenti createKomenti(Postimi postimi, KomentiReq teksti, User user) throws Exception{

        if(teksti == null){
            throw new Exception("Komenti can't be null");
        }
        Komenti komenti = new Komenti();
        komenti.setTeksti(teksti.getTeksti());
        komenti.setUserID(user);

        Komenti saved = komentRepository.save(komenti);

        postimi.getKomentet().add(saved);
        postimiRepository.save(postimi);

        return saved;
    }


    public void deleteKomenti(Long id) {
        Optional<Komenti> komenti = getKomentiByID(id);

        if (komenti.isPresent()) {
            Postimi postimi = postimiRepository.findByKomentetContaining(komenti.get());

            postimi.getKomentet().remove(komenti.get());
            postimiRepository.save(postimi);

            komentRepository.deleteById(id);
        } else {
            throw new EntityNotFoundException("Komenti not found with ID " + id);
        }
    }


    public Page<Komenti> getKomentetByPostimiId(Long postimiId, int page, int size) {
        return komentRepository.findByPostimiId(postimiId, PageRequest.of(page, size));
    }

}
