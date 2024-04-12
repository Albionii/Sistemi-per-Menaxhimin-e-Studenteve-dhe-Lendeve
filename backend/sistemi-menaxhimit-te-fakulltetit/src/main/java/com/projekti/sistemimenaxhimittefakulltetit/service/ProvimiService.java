package com.projekti.sistemimenaxhimittefakulltetit.service;

import com.projekti.sistemimenaxhimittefakulltetit.entities.Lenda;
import com.projekti.sistemimenaxhimittefakulltetit.entities.Professor;
import com.projekti.sistemimenaxhimittefakulltetit.entities.Provimi;
import com.projekti.sistemimenaxhimittefakulltetit.repository.ProvimiRepository;
import com.projekti.sistemimenaxhimittefakulltetit.request.ProvimiReq;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ProvimiService {
    private final ProvimiRepository provimiRepository;
    private final ProfesoriProvimiService profesoriProvimiService;


    public Provimi findProvimiById(Long id) throws Exception {
        Optional<Provimi> provimi = provimiRepository.findById(id);

        if(provimi.isPresent()) {
            return provimi.get();
        }else {
            throw new Exception("Provimi with that id, does not exist!");
        }

    }

    public Provimi createProvimi(Lenda lenda,ProvimiReq request) throws Exception {

        if(lenda != null) {
            Provimi provimi = new Provimi();

            provimi.setLenda(lenda);
            provimi.setData(request.getData());
            provimi.setLocation(request.getLocation());

            provimiRepository.save(provimi);
//
//            profesoriProvimiService.add(professor, provimi);

            return provimi;
        } else {
            throw new Exception("Something went wrong while creating Provimi");
        }
    }




    public void deleteProvimi(Long id) {
        Optional<Provimi> provimi = provimiRepository.findById(id);
        provimi.ifPresent(p -> {
            provimiRepository.delete(provimi.get());
        });
    }
}
