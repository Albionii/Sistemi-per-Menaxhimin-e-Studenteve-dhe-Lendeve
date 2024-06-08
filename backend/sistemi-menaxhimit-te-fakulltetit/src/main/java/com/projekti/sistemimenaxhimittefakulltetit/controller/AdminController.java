package com.projekti.sistemimenaxhimittefakulltetit.controller;

import com.projekti.sistemimenaxhimittefakulltetit.entities.*;
import com.projekti.sistemimenaxhimittefakulltetit.repository.LendaSemesterRepository;
import com.projekti.sistemimenaxhimittefakulltetit.repository.ProfessorRepository;
import com.projekti.sistemimenaxhimittefakulltetit.repository.UserRepository;
import com.projekti.sistemimenaxhimittefakulltetit.request.CreateLendaReq;
import com.projekti.sistemimenaxhimittefakulltetit.request.LigjerataReq;
import com.projekti.sistemimenaxhimittefakulltetit.service.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final UserService userService;
    private final ProfessorService professorService;
    private final LendaService lendaService;
    private final ProfesoriLendaService profesoriLendaService;
    private final SemesterService semesterService;
    private final LendaSemesterService lendaSemesterService;
    private final AfatiService afatiService;
    private final OrariLigjerataService orariLigjerataService;
    private final LajmiService lajmiService;
    private final OrariService orariService;
    private final GrupiService grupiService;


    @DeleteMapping("/{id}")
    public void deleteUserById(
            @RequestHeader("Authorization") String jwt,
            @PathVariable Long id){
        userService.deleteUserById(id);
    }

    //Afati
    @PostMapping("/api/afati")
    public ResponseEntity<Afati> createAfati(@RequestBody Afati afati) {
        Afati createdAfati = afatiService.createAfati(afati);
        return ResponseEntity.ok(createdAfati);
    }

    @GetMapping("/api/afati/{id}")
    public ResponseEntity<Afati> getAfatiById(@PathVariable Long id) {
        Optional<Afati> afati = afatiService.getAfatiById(id);
        return afati.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/api/afati")
    public ResponseEntity<List<Afati>> getAllAfati() {
        List<Afati> afatiList = afatiService.getAllAfati();
        return ResponseEntity.ok(afatiList);
    }

    @PutMapping("/api/afati/{id}")
    public ResponseEntity<Afati> updateAfati(@PathVariable Long id, @RequestBody Afati afati) {
        Afati updatedAfati = afatiService.updateAfati(id, afati);
        return ResponseEntity.ok(updatedAfati);
    }

    @DeleteMapping("/api/afati/{id}")
    public ResponseEntity<Void> deleteAfati(@PathVariable Long id) {
        afatiService.deleteAfati(id);
        return ResponseEntity.noContent().build();
    }

    //OrariLigjerata
    @GetMapping("/orariLigjerata/getById/{id}")
    public Optional<OrariLigjerata> findById(@PathVariable Long id){
        return orariLigjerataService.findById(id);
    }

    @PostMapping("/orariLigjerata/create")
    public OrariLigjerata create(@RequestBody OrariLigjerata orariLigjerata) throws Exception {
        return orariLigjerataService.create(orariLigjerata);
    }

    @PutMapping("/orariLigjerata/update/{id}")
    public OrariLigjerata update(@PathVariable Long id, @RequestBody OrariLigjerata orariLigjerata) throws Exception {
        return orariLigjerataService.updateById(id, orariLigjerata);
    }

    @GetMapping("/orariLigjerata/get")
    public List<OrariLigjerata> getAll(){
        return orariLigjerataService.findAll();
    }

    @DeleteMapping("/orariLigjerata/delete/{id}")
    public void deleteById(@PathVariable Long id){
        orariLigjerataService.deleteById(id);
    }

    //Lajmi
    @GetMapping("/lajmet/get")
    public List<Lajmi> getAllLajmet(){
        return lajmiService.getAllLajmet();
    }

    @GetMapping("/lajmet/getById/{id}")
    public Optional<Lajmi> getById(@PathVariable Long id){
        return lajmiService.getLajmiById(id);
    }

    @PostMapping("/lajmet/create")
    public Lajmi createLajmi(@RequestBody Lajmi lajmi) throws Exception {
        return lajmiService.createLajmi(lajmi);
    }

    @PutMapping("/lajmet/update/{id}")
    public Lajmi updateLajmi(@RequestBody Lajmi lajmi, @PathVariable Long id) throws Exception {
        return lajmiService.updateLajmiById(id, lajmi);
    }

    @DeleteMapping("/lajmet/delete/{id}")
    public void deleteLajmi(@PathVariable Long id){
        lajmiService.deleteLajmiById(id);
    }


    //Orari
    @GetMapping("/orari/{id}")
    public Optional<Orari> findOrariById(@PathVariable Long id){
        return orariService.findOrariById(id);
    }

    @GetMapping("/orari/get")
    public List<Orari> allOraret(){
        return orariService.getAllOraret();
    }

    @DeleteMapping("/orari/delete/{id}")
    public void deleteOrari(@PathVariable Long id){
        orariService.deleteOrari(id);
    }

    @PostMapping("/orari/create")
    public Orari createOrari(@RequestBody Orari orari) throws Exception {
        return orariService.createOrari(orari);
    }

    @PutMapping("/orari/update/{id}")
    public Orari updateOrari(@PathVariable Long id, @RequestBody Orari orari){
        return orariService.updateOrari(id, orari);
    }

    //Grupi
    @GetMapping("/grupi/{id}")
    public Grupi getGrupiById(@PathVariable Long id){
        return grupiService.getGrupiById(id);
    }

    @GetMapping("/grupi/get")
    public List<Grupi> getGrupet(){
        return grupiService.getAllGrupet();
    }

    @PutMapping("/grupi/update/{id}")
    public Grupi updateGrupi(@PathVariable Long id, @RequestBody Grupi newGrupi){
        return grupiService.updateGrupiById(id, newGrupi);
    }

    @DeleteMapping("/grupi/delete/{id}")
    public void deleteGrupiById(@PathVariable Long id){
        grupiService.deleteGrupiById(id);
    }

    @PostMapping("/grupi/create")
    public Grupi createGrupi(@RequestBody Grupi grupi) throws Exception {
        return grupiService.createGrupi(grupi);
    }

    @PutMapping("/role/{id}")
    public ResponseEntity<User> updateRole(@PathVariable Long id,
                                           @RequestBody User userDetails,
                                           @RequestHeader("Authorization") String jwt) throws Exception {

        User updateUser = userService.updateRole(id, userDetails);

        return ResponseEntity.ok(updateUser);
    }

    @PostMapping("/add-lenda")
    public ResponseEntity<Lenda> createLenda(@RequestBody Lenda lenda,
                                             @RequestHeader("Authorization") String jwt) throws Exception{
        Lenda savedLenda = lendaService.createLenda(lenda);

        return ResponseEntity.status(HttpStatus.CREATED).body(savedLenda);
    }



    @DeleteMapping("/lenda/{id}")
    public void deleteLenda(@PathVariable Long id,
                            @RequestHeader("Authorization") String jwt){
        lendaService.deleteLenda(id);
    }


    @PostMapping("/semester/create")
    public ResponseEntity<Semester> createSemester(@RequestBody Semester req) {

        Semester created = semesterService.createSemester(req);

        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PostMapping("/semester/shtoLenda")
    public ResponseEntity<LendaSemester> shtoLendaSemester(@RequestBody LendaSemester lendaSemester) {

        LendaSemester  created = lendaSemesterService.shto(lendaSemester);

        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @GetMapping("/semesters")
    public ResponseEntity<List<Semester>> semesters() {
        List<Semester> sm = semesterService.getSemesters();
        return ResponseEntity.status(HttpStatus.OK).body(sm);
    }

    @DeleteMapping("/semester/delete/{id}")
    public void deleteSemester(@PathVariable Long id) {
        semesterService.deleteSemester(id);
    }
    @DeleteMapping("/semester/delete/Lenda/{id}")
    public void deleteLendaSemester(@PathVariable Long id) throws Exception {
        lendaSemesterService.delete(id);
    }

    @GetMapping("/lendaSemester/{id}")
    public LendaSemester getLendaSemester(@PathVariable Long id) {
        return lendaSemesterService.getLendaSemesterById(id);
    }


    @GetMapping("/semester/get/{id}")
    public ResponseEntity<Semester> getSemester(@PathVariable Long id) {
        Semester semester = semesterService.getSemester(id);
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(semester);
    }

    @PutMapping("/semester/update/{id}")
    public ResponseEntity<Semester> updateSemester(@PathVariable Long id, @RequestBody Semester semester) {
        return ResponseEntity.status(HttpStatus.OK).body(semesterService.updateSemester(id, semester));
    }



}
