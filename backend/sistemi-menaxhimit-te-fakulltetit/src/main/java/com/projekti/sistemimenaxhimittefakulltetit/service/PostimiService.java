package com.projekti.sistemimenaxhimittefakulltetit.service;

import com.projekti.sistemimenaxhimittefakulltetit.entities.Postimi;
import com.projekti.sistemimenaxhimittefakulltetit.entities.ProfesoriLenda;
import com.projekti.sistemimenaxhimittefakulltetit.entities.User;
import com.projekti.sistemimenaxhimittefakulltetit.repository.PostimiRepository;
import com.projekti.sistemimenaxhimittefakulltetit.repository.ProfesoriLendaRepository;
import com.projekti.sistemimenaxhimittefakulltetit.request.PostimiReq;
import com.projekti.sistemimenaxhimittefakulltetit.response.PostimetResponse;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PostimiService {
    private final PostimiRepository postimiRepository;
    private final ProfesoriLendaRepository profesoriLendaRepository;

    public Postimi findPostimiById(Long id) {
        return postimiRepository.findPostimiById(id);
    }

    public Postimi createPostimi(PostimiReq postimiReq, User user) {
        Postimi postimi = new Postimi();
        postimi.setUser(user);
        postimi.setTitulli(postimiReq.getTitulli());
        postimi.setMesazhi(postimiReq.getMesazhi());
        postimi.setData_Postimit(LocalDateTime.now());

        return postimiRepository.save(postimi);
    }

    public Postimi updatePostimi(Postimi newPostimi, Long id) {
        Postimi postimi = findPostimiById(id);
        postimi.setTitulli(newPostimi.getTitulli());
        postimi.setMesazhi(newPostimi.getMesazhi());
        postimi.setData_Postimit(LocalDateTime.now());

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

    public PostimetResponse getPostimetOfLigjerata(Long id, int start, int end) {
        ProfesoriLenda profesoriLenda = profesoriLendaRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Ligjerata nuk u gjet!!!!"));

        List<Postimi> postimet = profesoriLenda.getPostimet();
        Collections.reverse(postimet);

        int adjustedEnd = Math.min(end, postimet.size());

        PostimetResponse postimetResponse = new PostimetResponse();

        postimetResponse.setPostimet(postimet.subList(start, adjustedEnd));
        postimetResponse.setStart(start);
        postimetResponse.setEnd(adjustedEnd);

        if (adjustedEnd < postimet.size()) {
            postimetResponse.setHasMore(true);
        }else {
            postimetResponse.setHasMore(false);
        }



        return postimetResponse;
    }

    public PostimetResponse getPostimetOfUser(User user, ProfesoriLenda profesoriLenda, int start, int end) {

        List<Postimi> postimetLigjerata = profesoriLenda.getPostimet();
        List<Postimi> postimetUser = new ArrayList<>();

        int count = 0;


        for (Postimi postimi : postimetLigjerata) {
            if (postimi.getUser() == user) {
                postimetUser.add(postimi);
                count++;
            }
        }
        Collections.reverse(postimetUser);



        int adjustedEnd = Math.min(end, postimetUser.size());

        PostimetResponse postimetResponse = new PostimetResponse();
        postimetResponse.setPostimet(postimetUser.subList(start, adjustedEnd));
        postimetResponse.setStart(0);
        postimetResponse.setEnd(adjustedEnd);

        System.out.println("adjustedEnd:" + adjustedEnd + "<->" + "size: " + postimetUser.size() + "<-> Count: " + count);


        if (adjustedEnd < postimetUser.size()) {
            postimetResponse.setHasMore(true);
        }else {
            postimetResponse.setHasMore(false);
        }

        return postimetResponse;
    }
}
