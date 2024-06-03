package com.projekti.sistemimenaxhimittefakulltetit.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.projekti.sistemimenaxhimittefakulltetit.entities.*;
import com.projekti.sistemimenaxhimittefakulltetit.repository.AssignmentSubmissionRepository;
import com.projekti.sistemimenaxhimittefakulltetit.response.ProvimiResponse;
import com.projekti.sistemimenaxhimittefakulltetit.response.TranskriptaResponse;
import com.projekti.sistemimenaxhimittefakulltetit.service.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

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

    @GetMapping("totalProvimet/{semesterId}")
    public Long getProvimetCbySemester(@RequestHeader("Authorization") String token, @PathVariable Long semesterId) throws Exception{
        return studentPrvService.countExamsByStudentAndSemester(token ,semesterId);
    }

    @GetMapping("/ects")
    public ResponseEntity<Integer> getEcts(@RequestHeader("Authorization") String token) throws Exception{
        Integer ects = studentPrvService.findSumOfEctsByStudentId(token);

        return ResponseEntity.status(HttpStatus.OK).body(ects);
    }

    @GetMapping("/notatCount")
    public ResponseEntity<int[]> getNotatCount(@RequestHeader("Authorization") String token) throws Exception{
        int[] notat = studentPrvService.getGradeCounts(token);
        return ResponseEntity.status(HttpStatus.OK).body(notat);
    }


    @GetMapping("/semestri")
    public StudentSemester getSemestri(@RequestHeader("Authorization") String token) throws Exception{
        return studentSemesterRegistrationService.findSemesterByStudent(token);
    }

    @GetMapping("/provimetC")
    public List<StudentProvimi> getProvimetC(@RequestHeader("Authorization") String token) throws Exception{
        return studentPrvService.getByStudentId(token);
    }

    @GetMapping("/professorAVG")
    public List<Object[]> getMesataret(@RequestHeader("Authorization") String token) throws Exception{
        return studentPrvService.findTop4AvgByProfessor(token);
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

    @GetMapping("/getStudentByUserID/{id}")
    public Student getStudent(@PathVariable Long id) {
        return studentService.findStudentByUserId(id);
    }


    @GetMapping("/paraqitjaProvimit")
    public ResponseEntity<List<Provimi>> getProvimet() throws Exception {
        List<Provimi> provimet = provimiService.getAllProvimet();
        return ResponseEntity.status(HttpStatus.OK).body(provimet);
    }
    @GetMapping
    public ResponseEntity<List<StudentProvimi>> getProvimetParaqitura(@RequestHeader("Authorization")String token) throws Exception {
        User user = userService.findUserByJwtToken(token);
        Student student = studentService.findStudentByUserId(user.getId());

        List<StudentProvimi> provimet = studentPrvService.getProvimet(student.getId());

        return ResponseEntity.status(HttpStatus.OK).body(provimet);
    }

    @GetMapping("/provimetParaqitura")
    public ResponseEntity<List<StudentProvimi>> getProvimetParaqitura2(@RequestHeader("Authorization")String token) throws Exception {
        User user = userService.findUserByJwtToken(token);
        Student student = studentService.findStudentByUserId(user.getId());

        List<StudentProvimi> provimet = studentPrvService.getProvimet(student.getId());

        return ResponseEntity.status(HttpStatus.OK).body(provimet);
    }

    @GetMapping("/paraqitjaProvimit/{id}")
    public ResponseEntity<List<StudentProvimi>> findParaqitjaProvimitByStudentID(@PathVariable Long id) throws Exception {
        List<StudentProvimi> studentProvimi = studentPrvService.findAllStudentProvimiByStudentId(id);
        return ResponseEntity.ok().body(studentProvimi);
    }

//    @GetMapping("/paraqitjaProvimit/{id}")
//    public ResponseEntity<StudentProvimi> findParaqitjaProvimitByID(@PathVariable Long id) throws Exception {
//        StudentProvimi studentProvimi = studentPrvService.findById(id);
//        return ResponseEntity.ok().body(studentProvimi);
//    }

    @DeleteMapping("/paraqitjaProvimit/delete/{id}")
    public void deleteParaqitjaProvimitByID(@PathVariable Long id){
        studentPrvService.deleteParaqitjaProvimit(id);
    }



    @GetMapping("/get/user/info")
    public User getUserInfo(@RequestHeader("Authorization")String token) throws Exception {

        User student = userService.findUserById(userService.findUserByJwtToken(token).getId());
        return student;
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

    @GetMapping("/semesters")
    public List<StudentSemester> getSemesters(
            @RequestHeader("Authorization") String token)
 throws Exception  {
        User user = userService.findUserByJwtToken(token);
        Student student =studentService.findStudentByUserId(user.getId());

        List<StudentSemester> semesters = studentSemesterRegistrationService.getSemesters(student);
        System.out.println(semesters);
        return semesters;
    }




    @GetMapping("/get/provimet/")
    public ResponseEntity<List<ProvimiResponse>> getProvimet(@RequestHeader("Authorization") String token) throws Exception {
        User user = userService.findUserByJwtToken(token);
        Student student = studentService.findStudentByUserId(user.getId());

        List<StudentProvimi> paraqitura = studentPrvService.getProvimet(student.getId());
        Set<String> registeredLendet = paraqitura.stream()
                .map(sp -> sp.getProvimi().getLigjerata().getLenda().getEmri())
                .collect(Collectors.toSet());

        List<StudentSemester> semesterRegistrations = studentSemesterRegistrationService.getSemesters(student);
        List<ProvimiResponse> responses = new ArrayList<>();
        Map<String, ProvimiResponse> provimiMap = new HashMap<>();


        for (StudentSemester registration : semesterRegistrations) {
            Semester semester = registration.getSemester();
            List<ProfesoriLenda> ligjeratat = profesoriLendaService.getBySemesterId(semester.getId());

            for (ProfesoriLenda ligjerat : ligjeratat) {
                Provimi provimi = provimiService.findProvimiByLigjerataId(ligjerat.getId());

                if (provimi != null) {
                    String lendaName = provimi.getLigjerata().getLenda().getEmri();
                    if (!registeredLendet.contains(lendaName)) {
                        ProvimiResponse provimiResponse = provimiMap.getOrDefault(lendaName, new ProvimiResponse());
                        if (provimiResponse.getEmriLendes() == null) {
                            provimiResponse.setEmriLendes(lendaName);
                        }
                        provimiResponse.getProvimet().add(provimi);
                        provimiMap.put(lendaName, provimiResponse);
                    }
                }
            }
        }

        responses.addAll(provimiMap.values());

        Collections.sort(responses, Comparator.comparing(ProvimiResponse::getEmriLendes, String.CASE_INSENSITIVE_ORDER));

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
        response.setMesatarja(mesatarja);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
    @GetMapping("/getTranskripta")
    public List<StudentProvimi> getTranskripta(@RequestHeader("Authorization")String token) throws Exception {
        User user = userService.findUserByJwtToken(token);
        Student student = studentService.findStudentByUserId(user.getId());

        List<StudentProvimi> transkripta = studentPrvService.gjeneroTranskripten(student.getId());

        return transkripta;

    }


    @DeleteMapping("/delete/{id}")
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


    @PutMapping("/update/{id}")
    public ResponseEntity<Student> updateStudent(@PathVariable Long id, @RequestBody Student s) {
        Student student = studentService.updateStudent(id, s);
        if (student != null) {
            return new ResponseEntity<>(student, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


}
