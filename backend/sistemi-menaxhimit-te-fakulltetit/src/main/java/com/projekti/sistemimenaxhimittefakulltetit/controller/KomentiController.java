package com.projekti.sistemimenaxhimittefakulltetit.controller;


import com.projekti.sistemimenaxhimittefakulltetit.entities.Komenti;
import com.projekti.sistemimenaxhimittefakulltetit.entities.Postimi;
import com.projekti.sistemimenaxhimittefakulltetit.entities.Salla;
import com.projekti.sistemimenaxhimittefakulltetit.entities.User;
import com.projekti.sistemimenaxhimittefakulltetit.request.KomentiReq;
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
@RequestMapping("/komenti")
public class KomentiController {
    private final KomentiService komentiService;
    private final PostimiService postimiService;
    private final UserService userService;

    @GetMapping("/postimi/{postID}")
    public ResponseEntity<List<Komenti>> findAllKomentet(@PathVariable Long postID){
        Postimi postimi = postimiService.findPostimiById(postID);
        List<Komenti> komentet = postimi.getKomentet();
        Collections.reverse(komentet);
        return ResponseEntity.ok().body(komentet);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Komenti> findKomentiByID(@PathVariable Long id) throws Exception {
        Optional<Komenti> komenti = komentiService.getKomentiByID(id);
        return ResponseEntity.ok().body(komenti.get());

    }

    @GetMapping("/user/{postId}")
    public ResponseEntity<List<Komenti>> findUserKommenti(@PathVariable Long postId, @RequestHeader("Authorization")String token) throws Exception {
        User user = userService.findUserByJwtToken(token);
        return ResponseEntity.ok().body(komentiService.getKomentetUser(postId, user));
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
