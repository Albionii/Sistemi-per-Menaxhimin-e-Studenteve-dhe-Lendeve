package com.projekti.sistemimenaxhimittefakulltetit.controller;

import com.projekti.sistemimenaxhimittefakulltetit.entities.*;
import com.projekti.sistemimenaxhimittefakulltetit.request.CreateStudentProvimRequest;
import com.projekti.sistemimenaxhimittefakulltetit.response.OrariLigjerataDTO;
import com.projekti.sistemimenaxhimittefakulltetit.response.ProvimiDTO;
import com.projekti.sistemimenaxhimittefakulltetit.service.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;

@RestController
@RequestMapping("/professor")
@RequiredArgsConstructor
public class ProfessorController {

    private final VleresimiService vleresimiService;
    private final ProvimiService provimiService;
    private final StudentService studentService;
    private final UserService userService;
    private final LendaService lendaService;
    private final ProfessorService professorService;
    private final StudentPrvService studentPrvService;
    private final ProfesoriLendaService profesoriLendaService;
    private final StudentLigjerataService studentLigjerataService;
    private final OrariLigjerataService orariLigjerataService;
    private final AssignmentServiceImpl assignmentService;

    @PutMapping("/{id}")
    public Optional<Vleresimi> updateNota(@RequestBody Vleresimi updatedVleresimi,
                                          @PathVariable Long oldVleresimiId){
        return vleresimiService.updateNota(updatedVleresimi, oldVleresimiId);
    }

    @GetMapping("/kalendari")
    public List<Assignment> assignmentList(@RequestHeader("Authorization")String jwt) throws Exception{
        return assignmentService.findByUserId(jwt);
    }

    @GetMapping("/orari/{dita}")
    public List<OrariLigjerataDTO> getByDita(@RequestHeader("Authorization")String jwt, @PathVariable String dita) throws Exception{
        return orariLigjerataService.getOrariByProfessorAndDita(jwt, dita);
    }

    @GetMapping("/count/{ligjerataId}")
    public Long countStudentet(@PathVariable Long ligjerataId){
        return studentLigjerataService.contStudentetByLigjerataId(ligjerataId);
    }

    @GetMapping("/provimet")
    public List<ProvimiDTO> provimetByProfessor(@RequestHeader("Authorization")String jwt) throws Exception{
        return provimiService.getProvimetByProfessorId(jwt);
    }



    @PutMapping("/provimi/{id}/{nota}")
    public StudentProvimi addNota(@PathVariable("id") Long id, @PathVariable("nota") int nota){

        StudentProvimi paraqitja = studentPrvService.findById(id);
        paraqitja.setDataVendosjes(LocalDateTime.now());
        return studentPrvService.noto(paraqitja, nota);
    }

    @GetMapping("/paraqitjet/{id}")
    public List<StudentProvimi> getParaqitjet(@PathVariable Long id) throws Exception {
        Provimi provimi = provimiService.findProvimiByLigjerataId(id);
        return studentPrvService.findAllStudentProvimiByProvimiId(provimi.getId());
    }


    @GetMapping("/ligjeratatOfProfessor")
    public ResponseEntity<List<ProfesoriLenda>> getAllProfesoriLendaByProfessorID(@RequestHeader("Authorization")String token) throws Exception {
        User user = userService.findUserByJwtToken(token);
        Professor professor = professorService.findProfessorByUserId(user.getId());
        List<ProfesoriLenda> p = profesoriLendaService.getAllProfessorLendaByProfessorID(professor.getId());
        return ResponseEntity.ok().body(p);
    }



    @GetMapping("/get/provimi/{id}")
    public StudentProvimi getProvimi(@PathVariable Long id) {
        return studentPrvService.findById(id);
    }

    @GetMapping("/get/statistics")
    public Map<String, String> getProfesoriStatistics(@RequestHeader("Authorization")String token) throws Exception {
        Long id = userService.findUserByJwtToken(token).getId();
        Professor professor = professorService.findProfessorByUserId(id);
        List<ProfesoriLenda> LigjerataList = profesoriLendaService.getAllProfessorLendaByProfessorID(professor.getId());
        int lendaSize = LigjerataList.size();

        List<Provimi> provimiList = new ArrayList<Provimi>();
        List<Provimi> innerProvimi = new ArrayList<Provimi>();
        for (int i = 0; i < lendaSize; i++) {
            innerProvimi = provimiService.findAllProvimiByLigjerataId(LigjerataList.get(i).getId());
            for (int j = 0; j < innerProvimi.size(); j++) {
                provimiList.add(innerProvimi.get(j));
            }
        }
        int saTeNotuar = 0;


        int provimet = provimiList.size();
        int notat = 0;
        List<StudentProvimi> ProvimetCounter = new ArrayList<>();
        List<Student> nrStudenteve = new ArrayList<Student>();
        for (int i = 0; i < provimet; i++) {
            ProvimetCounter =  studentPrvService.findByProvimi(provimiList.get(i));
            for (int j = 0; j < ProvimetCounter.size(); j++) {
                if (ProvimetCounter.get(j).getNota() != 0 && ProvimetCounter.get(j).getNota() != 5){
                    notat += ProvimetCounter.get(j).getNota();
                    saTeNotuar++;
                }
                if (!nrStudenteve.contains(ProvimetCounter.get(j).getStudent())){
                    nrStudenteve.add(ProvimetCounter.get(j).getStudent());
                }
            }
        }
        float mesatarjaNotave = (float) notat /saTeNotuar;

        HashMap<String,String> map = new HashMap<>();
        map.put("saLende", lendaSize + "");
        map.put("SaNotaTeVendosura",nrStudenteve.size() + "");
        map.put("Mesatarja",mesatarjaNotave + "");

        return map;
    }


    @GetMapping("")
    public ResponseEntity<List<Professor>> getProfessors(){
        List<Professor> professors = professorService.getProfessors();
        return new ResponseEntity<>(professors, HttpStatus.OK);
    }

    @GetMapping("/getProfessor/{id}")
    public Optional<Professor> getProfessor(@PathVariable Long id){
        return professorService.findProfById(id);
    }

    @PostMapping("/create")
    public ResponseEntity<Professor> createProfessor(@RequestBody Professor p) throws Exception {
        Professor professor = professorService.createProfessor(p);
        return ResponseEntity.ok().body(professor);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteProfessorByID(@PathVariable Long id){
        Professor professor = professorService.findProfessorById(id);
        professorService.deleteProfessorByID(id);
        userService.deleteUserById(professor.getUser().getId());
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Professor> updateProfessor(@PathVariable Long id, @RequestBody Professor p) {
        Professor professor = professorService.updateProfessor(id, p);
        if (professor != null) {
            return new ResponseEntity<>(professor, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }



}
