package com.projekti.sistemimenaxhimittefakulltetit.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.projekti.sistemimenaxhimittefakulltetit.entities.*;
import com.projekti.sistemimenaxhimittefakulltetit.repository.AssignmentSubmissionRepository;
import com.projekti.sistemimenaxhimittefakulltetit.repository.ProvimiRepository;
import com.projekti.sistemimenaxhimittefakulltetit.response.ProvimiResponse;
import com.projekti.sistemimenaxhimittefakulltetit.response.TranskriptaResponse;
import com.projekti.sistemimenaxhimittefakulltetit.service.*;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/student")
public class StudentController {

    private final StudentPrvService studentPrvService;
    private final StudentService studentService;
    private final UserService userService;
    private final LendaService lendaService;
    private final ProfesoriLendaService profesoriLendaService;
    private final StudentSemesterRegistrationService studentSemesterRegistrationService;
    private final ProvimiService provimiService;
    private final LendaSemesterService lendaSemesterService;
    private final FileStorageService fileStorageService;
    private final AssignmentSubmissionRepository assignmentSubmissionRepository;

    @PostMapping("/paraqit/{id}")
    public ResponseEntity<StudentProvimi> paraqitProvimin(@PathVariable Long id,
                                                          @RequestHeader("Authorization") String token) throws Exception {
        User user = userService.findUserByJwtToken(token);
        Student student = studentService.findStudentByUserId(user.getId());
        Optional<Provimi> provimi = provimiService.findProvimiById(id);

        StudentProvimi prv =  studentPrvService.paraqitProvimin(student, provimi.get());

        return ResponseEntity.status(HttpStatus.CREATED).body(prv);
    }
    @DeleteMapping("/anulo/{id}")
    public void anuloProvimin(@PathVariable Long id,
                              @RequestHeader("Authorization") String token) throws Exception {
        User user = userService.findUserByJwtToken(token);
        Student student = studentService.findStudentByUserId(user.getId());

        studentPrvService.anulo(id);
    }

    @DeleteMapping("/refuzo/{id}")
    public void refuzo(@PathVariable Long id,
                              @RequestHeader("Authorization") String token) throws Exception {
        User user = userService.findUserByJwtToken(token);
        Student student = studentService.findStudentByUserId(user.getId());

        studentPrvService.anulo(id);
    }


    @GetMapping
    public ResponseEntity<List<StudentProvimi>> getProvimetParaqitura(@RequestHeader("Authorization")String token) throws Exception {
        User user = userService.findUserByJwtToken(token);
        Student student = studentService.findStudentByUserId(user.getId());

        List<StudentProvimi> provimet = studentPrvService.getProvimet(student.getId());

        return ResponseEntity.status(HttpStatus.OK).body(provimet);
    }

    @GetMapping("/provimet/{lendaId}")
    public ResponseEntity<List<Provimi>> getProvimetLenda(@PathVariable Long lendaId,
            @RequestHeader("Authorization")String token)throws Exception {

        Lenda lenda = lendaService.findLendaById(lendaId);
        List<ProfesoriLenda> ligjeratat = profesoriLendaService.findAllByLendaId(lenda.getId());
        List<Provimi> provimet = new ArrayList<>();

        User user = userService.findUserByJwtToken(token);
        Student student = studentService.findStudentByUserId(user.getId());

        List<StudentProvimi> paraqitura = studentPrvService.getProvimet(student.getId());

        for (ProfesoriLenda ligjerat : ligjeratat) {
            Provimi provimi = provimiService.findProvimiByLigjerataId(ligjerat.getId());
            lenda = ligjerat.getLenda();
            if (provimi != null) {
                if (!studentPrvService.existsByProvimiAndStudent(provimi, student) &&
                    !studentPrvService.existsByEmriLendes(lenda.getEmri())) {
                    provimet.add(provimi);
                }
            }


        }

        return ResponseEntity.status(HttpStatus.OK).body(provimet);
    }

    @GetMapping("/semesters/{id}")
    public ResponseEntity<List<StudentSemester>> getSemesters(
            @RequestHeader("Authorization") String jwt,
            @PathVariable Long id) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        List<StudentSemester> semesters = studentSemesterRegistrationService.getSemesters(id);
        return new ResponseEntity<>(semesters, HttpStatus.OK);
    }



    @GetMapping("/provimet/")
    public ResponseEntity<List<ProvimiResponse>> getSemesterProvimet(@RequestHeader("Authorization")String token)
                                                                        throws Exception{

        int countSemester= 0;
        int countLenda = 0;
        User user = userService.findUserByJwtToken(token);
        Student student = studentService.findStudentByUserId(user.getId());

        List<StudentProvimi> paraqitura = studentPrvService.getProvimet(student.getId());

        List<StudentSemester> semesterRegistrations = studentSemesterRegistrationService.getSemesters(student.getId());
        List<ProvimiResponse> responses = new ArrayList<>();

        for (StudentSemester registration : semesterRegistrations) {
            countSemester++;
            Semester semester = registration.getSemester();

            List<Lenda> lendet = lendaSemesterService.getAllLendaBySemesterId(semester.getId());

            for(Lenda lenda : lendet) {
                countLenda++;

                List<Provimi> prov = getProvimetLenda(lenda.getId(), token).getBody();
                System.out.println("Lenda:" + lenda.getEmri() + "LendaID" + lenda.getId() + "   Provimet" + prov);

                if (!prov.isEmpty()) {
                    ProvimiResponse response = new ProvimiResponse();

                    response.setEmriLendes(lenda.getEmri());
                    response.setProvimet(prov);
                    responses.add(response);
                    System.out.println(response);
                }

            }
        }

        System.out.println("CounteSemester" + countSemester +  "   CountLenda" + countLenda);

        return ResponseEntity.status(HttpStatus.OK).body(responses);
    }

    @GetMapping("/transkripta")
    public ResponseEntity<TranskriptaResponse> generateTranskripta(@RequestHeader("Authorization")String token) throws Exception {
        User user = userService.findUserByJwtToken(token);
        Student student = studentService.findStudentByUserId(user.getId());

        List<StudentProvimi> transkripta = studentPrvService.gjeneroTranskripten(student.getId());
        List<Double> notat = new ArrayList<>();

        for (StudentProvimi provimi : transkripta) {
            notat.add((double)provimi.getNota());
        }


        Double mesatarja = studentPrvService.getMesatarja(notat);


        TranskriptaResponse response = new TranskriptaResponse();
        response.setTranskripta(transkripta);
        response.setMesatarja(mesatarja);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteStudentByID(@PathVariable Long id) {
        studentService.deleteByID(id);
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

    @PostMapping("/{assignmentId}/upload/{submissionId}")
    public ResponseEntity<String> uploadFile(
            @PathVariable Long assignmentId,
            @RequestParam("assignment") String materialiJson,
            @PathVariable Long submissionId,
            @RequestParam("files") List<MultipartFile> files) {

        AssignmentSubmission assignmentSubmission = parseSubmissionJson(materialiJson);

        Optional<AssignmentSubmission> assignmentOptional = assignmentSubmissionRepository.findById(submissionId);
        if (!assignmentOptional.isPresent()) {
            throw new RuntimeException("Assignment not found");
        }
        AssignmentSubmission existingSubmission = assignmentOptional.get();



        if (!files.isEmpty()) {
            fileStorageService.deleteSubmissionFiles(assignmentId, submissionId);

            List<String> fileNames = new ArrayList<>();
            for (MultipartFile file : files) {
                String fileName = fileStorageService.storeSubmission(file, "Assignments", assignmentId, submissionId);
                fileNames.add(fileName);
            }
            existingSubmission.setFileNames(fileNames);
            assignmentSubmissionRepository.save(existingSubmission);

        }



        return ResponseEntity.ok("Files uploaded successfully");
    }



    private AssignmentSubmission parseSubmissionJson(String submissionJson) {
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        try {
            return objectMapper.readValue(submissionJson, AssignmentSubmission.class);
        } catch (IOException e) {
            throw new RuntimeException("Error parsing submission JSON", e);
        }
    }




}
