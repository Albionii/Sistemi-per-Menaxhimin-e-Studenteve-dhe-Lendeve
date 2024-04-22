package com.projekti.sistemimenaxhimittefakulltetit.service;

import com.projekti.sistemimenaxhimittefakulltetit.entities.Postimi;
import com.projekti.sistemimenaxhimittefakulltetit.entities.ProfesoriLenda;
import com.projekti.sistemimenaxhimittefakulltetit.repository.PostimiRepository;
import com.projekti.sistemimenaxhimittefakulltetit.repository.ProfesoriLendaRepository;
import com.projekti.sistemimenaxhimittefakulltetit.request.PostimiReq;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PostimiService {
    private final PostimiRepository postimiRepository;
    private final ProfesoriLendaRepository profesoriLendaRepository;

    public Postimi findPostimiById(Long id) {
        return postimiRepository.findPostimiById(id);
    }

    public Postimi createPostimi(PostimiReq postimiReq) {
        Postimi postimi = new Postimi();
        postimi.setTitulli(postimiReq.getTitulli());
        postimi.setData_Postimit(postimiReq.getData_Postimit());

        return postimiRepository.save(postimi);
    }

    public Postimi updatePostimi(Postimi newPostimi, Long id) {
        Postimi postimi = findPostimiById(id);

        postimi.setTitulli(newPostimi.getTitulli());
        postimi.setData_Postimit(newPostimi.getData_Postimit());
        postimi.setAssignments(newPostimi.getAssignments());

        return postimiRepository.save(postimi);
    }


    public void deletePostimi(Long id) {
        Postimi postimi = postimiRepository.findById(id)
                .orElseThrow(()-> new EntityNotFoundException("Postimi nuk u gjet!"));

        ProfesoriLenda profesoriLenda = profesoriLendaRepository.findByPostimetContaining(postimi);

        if (profesoriLenda != null) {
            profesoriLenda.getPostimet().remove(postimi);
            profesoriLendaRepository.save(profesoriLenda);
        }
        postimiRepository.delete(postimi);
    }

    public List<Postimi> getPostimetOfLigjerata(Long id) {
        ProfesoriLenda profesoriLenda = profesoriLendaRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Ligjerata nuk u gjet!!!!"));

        return profesoriLenda.getPostimet();
    }
}
