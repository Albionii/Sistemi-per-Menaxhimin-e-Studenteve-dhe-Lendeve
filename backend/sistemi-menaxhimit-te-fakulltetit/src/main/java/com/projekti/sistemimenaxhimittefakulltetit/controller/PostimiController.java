package com.projekti.sistemimenaxhimittefakulltetit.controller;

import com.projekti.sistemimenaxhimittefakulltetit.entities.Postimi;
import com.projekti.sistemimenaxhimittefakulltetit.entities.ProfesoriLenda;
import com.projekti.sistemimenaxhimittefakulltetit.entities.User;
import com.projekti.sistemimenaxhimittefakulltetit.repository.ProfesoriLendaRepository;
import com.projekti.sistemimenaxhimittefakulltetit.request.PostimiReq;
import com.projekti.sistemimenaxhimittefakulltetit.response.PostimetResponse;
import com.projekti.sistemimenaxhimittefakulltetit.service.PostimiService;
import com.projekti.sistemimenaxhimittefakulltetit.service.ProfesoriLendaService;
import com.projekti.sistemimenaxhimittefakulltetit.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/postimi")
@RequiredArgsConstructor
public class PostimiController {

    private final PostimiService postimiService;
    private final ProfesoriLendaService profesoriLendaService;
    private final ProfesoriLendaRepository profesoriLendaRepository;
    private final UserService userService;

    @PostMapping("/create/{ligjerataId}")
    public ResponseEntity<Postimi> createPostimi(@PathVariable Long ligjerataId,
                                                 @RequestBody PostimiReq request,
                                                 @RequestHeader("Authorization")String token) throws Exception {

        User user = userService.findUserByJwtToken(token);

        Optional<ProfesoriLenda> opti = profesoriLendaService.findById(ligjerataId);

        Postimi postimi = postimiService.createPostimi(request, user);

        opti.ifPresent(opt -> {
            List<Postimi> postimet = opt.getPostimet();
            postimet.add(postimi);

            opt.setPostimet(postimet);
            profesoriLendaRepository.save(opt);
        });
        return ResponseEntity.status(HttpStatus.CREATED).body(postimi);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Postimi> updatePostimi(@PathVariable Long id,
                                                 @RequestBody Postimi postimi) {
        return ResponseEntity.status(HttpStatus.OK).body(postimiService.updatePostimi(postimi, id));
    }

    @DeleteMapping("/delete/{id}")
    public void deletePostimi(@PathVariable Long id) {
        postimiService.deletePostimi(id);
    }

    @GetMapping("/get/{id}")
    public Postimi getPostimi(@PathVariable Long id) {
        return postimiService.findPostimiById(id);
    }

    @GetMapping("/get/user/{ligjerataId}")
    public PostimetResponse getPostimetOfUser(@PathVariable Long ligjerataId, @RequestParam int start, @RequestParam int end,@RequestHeader("Authorization") String token) throws Exception {
        User user = userService.findUserByJwtToken(token);
        Optional<ProfesoriLenda> profesoriLenda = profesoriLendaService.findById(ligjerataId);
        return postimiService.getPostimetOfUser(user, profesoriLenda.get(), start, end);
    }

    @GetMapping("/get/ligjerata/{id}")
    public PostimetResponse getAll(@PathVariable Long id, @RequestParam int start, @RequestParam int end,
                                   @RequestHeader("Authorization")String token)  {
        return postimiService.getPostimetOfLigjerata(id, start, end);
    }
}
