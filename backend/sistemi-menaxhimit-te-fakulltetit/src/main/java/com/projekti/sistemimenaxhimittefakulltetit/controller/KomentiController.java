package com.projekti.sistemimenaxhimittefakulltetit.controller;


import com.projekti.sistemimenaxhimittefakulltetit.entities.Komenti;
import com.projekti.sistemimenaxhimittefakulltetit.entities.Postimi;
import com.projekti.sistemimenaxhimittefakulltetit.entities.Salla;
import com.projekti.sistemimenaxhimittefakulltetit.entities.User;
import com.projekti.sistemimenaxhimittefakulltetit.request.KomentiReq;
import com.projekti.sistemimenaxhimittefakulltetit.response.KomentetResponse;
import com.projekti.sistemimenaxhimittefakulltetit.service.KomentiService;
import com.projekti.sistemimenaxhimittefakulltetit.service.PostimiService;
import com.projekti.sistemimenaxhimittefakulltetit.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/komenti")
public class KomentiController {
    private final KomentiService komentiService;
    private final PostimiService postimiService;
    private final UserService userService;

    @GetMapping("/postimi/{postID}")
    public KomentetResponse findAllKomentet(@PathVariable Long postID,
                                            @RequestParam int start,
                                            @RequestParam int end){
        Postimi postimi = postimiService.findPostimiById(postID);
        List<Komenti> komentet = postimi.getKomentet();
        Collections.reverse(komentet);

        int adjustedEnd = Math.min(end, komentet.size());

        KomentetResponse komentetResponse = new KomentetResponse();

        komentetResponse.setKomentet(komentet.subList(start, adjustedEnd));
        komentetResponse.setStart(start);
        komentetResponse.setEnd(adjustedEnd);
        if (adjustedEnd < komentet.size()) {
            komentetResponse.setHasMore(true);
        }else {
            komentetResponse.setHasMore(false);
        }
        return komentetResponse;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Komenti> findKomentiByID(@PathVariable Long id) throws Exception {
        Optional<Komenti> komenti = komentiService.getKomentiByID(id);
        return ResponseEntity.ok().body(komenti.get());

    }

    @GetMapping("/user/{postId}")
    public KomentetResponse findUserKommenti(@PathVariable Long postId,
                                                          @RequestParam int start,
                                                          @RequestParam int end,
                                                          @RequestHeader("Authorization")String token) throws Exception {
        User user = userService.findUserByJwtToken(token);
        List<Komenti> userComments = komentiService.getKomentetUser(postId, user);
        Collections.reverse(userComments);
        int adjustedEnd = Math.min(end, userComments.size());
        KomentetResponse komentetResponse = new KomentetResponse();

        komentetResponse.setKomentet(userComments.subList(start, adjustedEnd));
        komentetResponse.setStart(start);
        komentetResponse.setEnd(adjustedEnd);
        if (adjustedEnd < userComments.size()) {
            komentetResponse.setHasMore(true);
        }else {
            komentetResponse.setHasMore(false);
        }
        return komentetResponse;
    }


    @PostMapping("/create/{postId}")
    public ResponseEntity<Komenti> createKomenti(@PathVariable Long postId, @RequestBody KomentiReq komenti,
                                                 @RequestHeader("Authorization") String token) throws Exception {
        Postimi postimi = postimiService.findPostimiById(postId);
        User user = userService.findUserByJwtToken(token);
        Komenti createdKomenti = komentiService.createKomenti(postimi, komenti, user);
        return ResponseEntity.ok().body(createdKomenti);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Komenti> updateKomenti(@PathVariable Long id, @RequestBody KomentiReq komenti, @RequestHeader("Authorization")String token) throws Exception {
        User user = userService.findUserByJwtToken(token);
        Komenti updatedKomenti = komentiService.updateKomenti(id, komenti, user);
        if (updatedKomenti != null) {
            return new ResponseEntity<>(updatedKomenti, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/delete/{id}")
    public void deleteKomentiByID(@PathVariable Long id){
        komentiService.deleteKomenti(id);
    }
}
