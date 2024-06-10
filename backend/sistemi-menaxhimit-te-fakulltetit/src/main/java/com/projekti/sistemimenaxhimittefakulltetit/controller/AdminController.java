package com.projekti.sistemimenaxhimittefakulltetit.controller;

import com.projekti.sistemimenaxhimittefakulltetit.entities.*;
import com.projekti.sistemimenaxhimittefakulltetit.repository.LendaSemesterRepository;
import com.projekti.sistemimenaxhimittefakulltetit.repository.ProfessorRepository;
import com.projekti.sistemimenaxhimittefakulltetit.repository.UserRepository;
import com.projekti.sistemimenaxhimittefakulltetit.request.CreateLendaReq;
import com.projekti.sistemimenaxhimittefakulltetit.request.LigjerataReq;
import com.projekti.sistemimenaxhimittefakulltetit.service.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
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
    private final LendaService lendaService;
    private final SemesterService semesterService;
    private final LendaSemesterService lendaSemesterService;
    private final AfatiService afatiService;
    private final OrariLigjerataService orariLigjerataService;
    private final LajmiService lajmiService;
    private final OrariService orariService;
    private final GrupiService grupiService;
    private final ProvimiService provimiService;
    private final ProfessorService professorService;
    private final StudentService studentService;
    private final ProfesoriLendaService profesoriLendaService;
    private final FakultetiService fakultetiService;
    private final UserServiceImpl userServiceImpl;
    private final DepartamentiService departamentiService;


    @DeleteMapping("/{id}")
    public void deleteUserById(
            @RequestHeader("Authorization") String jwt,
            @PathVariable Long id){
        userService.deleteUserById(id);
    }

    @PutMapping("/updateRole/{id}")
    public ResponseEntity<User> updateUserRole(@RequestHeader("Authorization") String jwt,@PathVariable Long id, @RequestBody User u) throws Exception {
        User user = userService.updateRole(id, u);
        if (user != null) {
            return new ResponseEntity<>(user, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/getAllUsers")
    public ResponseEntity<List<User>> allUsers(){
        List<User> users = userService.findAll();
        return new ResponseEntity<>(users, HttpStatus.OK);
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

    //Professors


    @GetMapping("/getProfessors")
    public ResponseEntity<List<Professor>> getProfessors(){
        List<Professor> professors = professorService.getProfessors();
        return new ResponseEntity<>(professors, HttpStatus.OK);
    }

    @GetMapping("/getProfessor/{id}")
    public Optional<Professor> getProfessor(@PathVariable Long id){
        return professorService.findProfById(id);
    }

    @PostMapping("/createProfessor")
    public ResponseEntity<Professor> createProfessor(@RequestBody Professor p) throws Exception {
        Professor professor = professorService.createProfessor(p);
        return ResponseEntity.ok().body(professor);
    }

    @DeleteMapping("/deleteProfessor/{id}")
    public void deleteProfessorByID(@PathVariable Long id){
        Professor professor = professorService.findProfessorById(id);
        professorService.deleteProfessorByID(id);
        userService.deleteUserById(professor.getUser().getId());
    }

    @PutMapping("/updateProfessor/{id}")
    public ResponseEntity<Professor> updateProfessor(@PathVariable Long id, @RequestBody Professor p) {
        Professor professor = professorService.updateProfessor(id, p);
        if (professor != null) {
            return new ResponseEntity<>(professor, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Lenda

    @GetMapping("/getLenda/{id}")
    public ResponseEntity<Lenda> findLendaById(@PathVariable Long id) throws Exception {
        Lenda lenda = lendaService.findLendaById(id);
        return ResponseEntity.ok().body(lenda);
    }

    @GetMapping("/getLendet")
    public ResponseEntity<List<Lenda>> getLendet(){
        List<Lenda> lendet = lendaService.getLendet();
        return ResponseEntity.ok().body(lendet);
    }

    @PostMapping("/createLenda")
    public ResponseEntity<Lenda> createLenda(@RequestBody Lenda lenda) throws Exception {
        Lenda createdLenda = lendaService.createLenda(lenda);
        return ResponseEntity.ok().body(createdLenda);
    }



    @PutMapping("/updateLenda/{id}")
    public ResponseEntity<Lenda> updateLenda(@PathVariable Long id, @RequestBody Lenda l) {
        Lenda lenda = lendaService.updateLenda(id, l);
        if (lenda != null) {
            return new ResponseEntity<>(lenda, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @DeleteMapping("/deleteLenda/{id}")
    public void deleteLendaById(@PathVariable Long id){
        lendaService.deleteLenda(id);
    }


    // Provimet

    @PostMapping("/createProvimi")
    public ResponseEntity<Provimi> createProvimi(@RequestBody Provimi p) throws Exception {
        Provimi provimi = provimiService.createProvimi(p);
        return ResponseEntity.ok().body(provimi);
    }

    @GetMapping("/getProvimet")
    public ResponseEntity<List<Provimi>> getAllProvimet(){
        List<Provimi> p = provimiService.getAllProvimet();
        return ResponseEntity.ok().body(p);
    }

    @GetMapping("/getProvimi/{id}")
    public ResponseEntity<Optional<Provimi>> findProvimiByID(@PathVariable Long id) throws Exception {
        Optional<Provimi> provimi = provimiService.findProvimiById(id);
        return ResponseEntity.ok().body(provimi);
    }

    @DeleteMapping("/deleteProvimi/{id}")
    public void deleteByProvimiID(@PathVariable Long id){
        provimiService.deleteProvimi(id);
    }

    @PutMapping("/updateProvimi/{id}")
    public ResponseEntity<Provimi> updateProvimiByID(@PathVariable Long id, @RequestBody Provimi p) {
        Provimi provimi = provimiService.updateProvimiByID(id, p);
        if (provimi != null) {
            return new ResponseEntity<>(provimi, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    //Students

    @DeleteMapping("/deleteStudent/{id}")
    public void deleteStudentByID(@PathVariable Long id)
    {
        Student student = studentService.getStudentByID(id).get();
        studentService.deleteByID(id);
        userService.deleteUserById(student.getUser().getId());
    }

    @GetMapping("/getAllStudents")
    public ResponseEntity<List<Student>> getAllStudents(){
        List<Student> students = studentService.getAllStudents();
        return ResponseEntity.ok().body(students);
    }

    @GetMapping("/getStudent/{id}")
    public ResponseEntity<Student> getStudentByID(@PathVariable Long id){
        Student student = studentService.getStudentByID(id).get();
        return ResponseEntity.ok().body(student);
    }

    @PutMapping("/updateStudent/{id}")
    public ResponseEntity<Student> updateStudent(@PathVariable Long id, @RequestBody Student s) {
        Student student = studentService.updateStudent(id, s);
        if (student != null) {
            return new ResponseEntity<>(student, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/getStudentByUserID/{id}")
    public Student getStudent(@PathVariable Long id) {
        return studentService.findStudentByUserId(id);
    }


    // Ligjeratat

    @GetMapping("getProfessorLenda/{id}")
    public ResponseEntity<ProfesoriLenda> findLendaByProfesoriId(@PathVariable Long id){
        Optional<ProfesoriLenda> profesoriLenda = profesoriLendaService.findLendaByProfesoriId(id);
        return profesoriLenda.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/lendetSemester/{semesterId}")
    public Long countLendetBySemesterId(@PathVariable Long semesterId) throws Exception {
        return profesoriLendaService.countLendetBySemester(semesterId);
    }

    @GetMapping("abc/{id}")
    public List<ProfesoriLenda> findLendaByProfesoriIdaa(@PathVariable Long id){
        return profesoriLendaService.findLendaByProfesoriIdaaaaaaaa(id);
    }

    @GetMapping("/professorLenda/semester/{semesterId}")
    public List<ProfesoriLenda> findBySemesterId(@PathVariable Long semesterId){
        return profesoriLendaService.getBySemesterId(semesterId);
    }

    @GetMapping("/professorLenda/ligjeratat/{semesterId}")
    public List<ProfesoriLenda> findLigjeratat(@PathVariable Long semesterId,
                                               @RequestHeader("Authorization")String token) throws Exception {
        User user = userService.findUserByJwtToken(token);
        Professor professor = professorService.findProfessorByUserId(user.getId());
        Semester semester = semesterService.getSemester(semesterId);

        return  profesoriLendaService.getAllLigjerataBySemester(professor, semester);
    }

    @GetMapping("professorLenda/professor/semestret/")
    public List<Semester> findSemesters(@RequestHeader("Authorization")String token) throws Exception {
        User user = userService.findUserByJwtToken(token);
        Professor professor = professorService.findProfessorByUserId(user.getId());
        return profesoriLendaService.findSemesters(professor);
    }

    @PostMapping("/createLigjerata")
    public ResponseEntity<ProfesoriLenda> createLigjerate(@RequestBody ProfesoriLenda p) throws Exception {
        ProfesoriLenda profesoriLenda = profesoriLendaService.createLigjerata(p);
        return ResponseEntity.ok().body(profesoriLenda);
    }

    @GetMapping("/getProfessorLendet")
    public ResponseEntity<List<ProfesoriLenda>> getAllProfesoriLenda(){
        List<ProfesoriLenda> p = profesoriLendaService.getAllProfessorLenda();
        return ResponseEntity.ok().body(p);
    }

    @DeleteMapping("/professorLenda/delete/{id}")
    public void deleteProfesoriLendaByID(@PathVariable Long id){
        profesoriLendaService.deleteProfessorLendaByID(id);
    }

    @PutMapping("/professorLenda/update/{id}")
    public ResponseEntity<ProfesoriLenda> updateProfessorLenda(@PathVariable Long id, @RequestBody ProfesoriLenda pl) {
        ProfesoriLenda profesoriLenda = profesoriLendaService.updateProfessorLenda(id, pl);
        if (profesoriLenda != null) {
            return new ResponseEntity<>(profesoriLenda, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    //Fakulteti

    @GetMapping("/fakulteti/{id}")
    public Optional<Fakulteti> getFakulteti(@PathVariable Long id){
        return fakultetiService.findFakultetiById(id);
    }

    @GetMapping("/fakulteti")
    public List<Fakulteti> getAllFakulteti(){return fakultetiService.getAllFakulteti();}

    @PostMapping("/fakulteti/create/{id}")
    public void createFakulteti(@RequestBody Fakulteti f,@PathVariable Long id) throws Exception {
        f.setUser(userServiceImpl.findUserById(id));
        fakultetiService.createFakulteti(f);
    }
    @PostMapping("/fakulteti/create")
    public ResponseEntity<Fakulteti> createFakulteti(@RequestBody Fakulteti fakulteti) throws Exception {
        Fakulteti createdFakulteti = fakultetiService.createFakulteti(fakulteti);
        return ResponseEntity.ok().body(createdFakulteti);
    }

    @PutMapping("/fakulteti/{id}/{drejtoriId}")
    public void updateDrejtori(@PathVariable("id") Long id,@PathVariable("drejtoriId") Long idD) throws Exception {
        Optional<Fakulteti> f1 = fakultetiService.findFakultetiById(id);
        f1.get().setUser(userServiceImpl.findUserById(idD));
        fakultetiService.updateDrejtori(f1.get());

    }

    @PutMapping("/fakulteti/update/{id}")
    public ResponseEntity<Fakulteti> updateFakulteti(@PathVariable Long id, @RequestBody Fakulteti f) {
        Fakulteti fakulteti = fakultetiService.updateFakulteti(id, f);
        if (fakulteti != null) {
            return new ResponseEntity<>(fakulteti, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/fakulteti/delete/{id}")
    public void deleteFakultetiByID(@PathVariable Long id){
        fakultetiService.deleteFakultetiById(id);
    }

    //Departamenti

    @GetMapping("/departamenti/{id}")
    public ResponseEntity<Optional<Departamenti>> getDepartamenti(@PathVariable Long id){
        return ResponseEntity.ok().body(departamentiService.findByDepartamentiId(id));
    }

    @GetMapping("/departamenti")
    public ResponseEntity<List<Departamenti>> getAllDepartamenti()
    {
        return ResponseEntity.ok().body(departamentiService.findAll());
    }


    @PutMapping("/departamenti/update/{id}")
    public ResponseEntity<Departamenti> updateDepartamenti(@PathVariable Long id, @RequestBody Departamenti d) {
        Departamenti departamenti = departamentiService.updateDepartamenti(id, d);
        if (departamenti != null) {
            return new ResponseEntity<>(departamenti, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/departamenti/delete/{id}")
    public void deleteDepartamentiByID(@PathVariable Long id){
        departamentiService.deleteDepartamentiById(id);
    }

    @PostMapping("/departamenti/create")
    public ResponseEntity<Departamenti> createDepartamenti(@RequestBody Departamenti departamenti) throws Exception {
        Departamenti createdDepartamenti = departamentiService.createDepartamenti(departamenti);
        return ResponseEntity.ok().body(createdDepartamenti);
    }



}
