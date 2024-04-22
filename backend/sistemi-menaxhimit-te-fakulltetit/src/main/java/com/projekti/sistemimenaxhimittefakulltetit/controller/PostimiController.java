package com.projekti.sistemimenaxhimittefakulltetit.controller;

import com.projekti.sistemimenaxhimittefakulltetit.entities.Postimi;
import com.projekti.sistemimenaxhimittefakulltetit.entities.ProfesoriLenda;
import com.projekti.sistemimenaxhimittefakulltetit.repository.ProfesoriLendaRepository;
import com.projekti.sistemimenaxhimittefakulltetit.request.PostimiReq;
import com.projekti.sistemimenaxhimittefakulltetit.service.PostimiService;
import com.projekti.sistemimenaxhimittefakulltetit.service.ProfesoriLendaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/professor")
@RequiredArgsConstructor
public class PostimiController {

    private final PostimiService postimiService;
    private final ProfesoriLendaService profesoriLendaService;
    private final ProfesoriLendaRepository profesoriLendaRepository;

    @PostMapping("/postimi/create/{ligjerataId}")
    public ResponseEntity<Postimi> createPostimi(@PathVariable Long ligjerataId,
                                                 @RequestBody PostimiReq request) {
        Optional<ProfesoriLenda> opti = profesoriLendaService.findById(ligjerataId);

        Postimi postimi = postimiService.createPostimi(request);



        opti.ifPresent(opt -> {
            List<Postimi> postimet = opt.getPostimet();
            postimet.add(postimi);

            opt.setPostimet(postimet);
            profesoriLendaRepository.save(opt);
        });
        return ResponseEntity.status(HttpStatus.CREATED).body(postimi);
    }

    @PutMapping("/postimi/update/{id}")
    public ResponseEntity<Postimi> updatePostimi(@PathVariable Long id,
                                                 @RequestBody Postimi postimi) {
        return ResponseEntity.status(HttpStatus.OK).body(postimiService.updatePostimi(postimi, id));
    }

    @DeleteMapping("/postimi/delete/{id}")
    public void deletePostimi(@PathVariable Long id) {
        postimiService.deletePostimi(id);
    }

    @GetMapping("/postimi/get/{id}")
    public Postimi getPostimi(@PathVariable Long id) {
        return postimiService.findPostimiById(id);
    }

    @GetMapping("/postimi/get/ligjerata/{id}")
    public List<Postimi> getAll(@PathVariable Long id) {
        return postimiService.getPostimetOfLigjerata(id);
    }
}
