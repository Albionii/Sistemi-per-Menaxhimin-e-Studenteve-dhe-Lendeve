package com.projekti.sistemimenaxhimittefakulltetit.controller;

import com.projekti.sistemimenaxhimittefakulltetit.entities.*;
import com.projekti.sistemimenaxhimittefakulltetit.repository.ProvimiRepository;
import com.projekti.sistemimenaxhimittefakulltetit.response.ProvimiResponse;
import com.projekti.sistemimenaxhimittefakulltetit.service.*;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@RestController
@RequiredArgsConstructor
@RequestMapping("/student")
public class StudentController {

    private final StudentPrvService studentPrvService;
    private final StudentService studentService;
    private final UserService userService;
    private final ProfesoriProvimiService profesoriProvimiService;
    private final StudentSemesterRegistrationService studentSemesterRegistrationService;
    private final ProvimiService provimiService;

    @PostMapping("/paraqit/{id}")
    public ResponseEntity<StudentProvimi> paraqitProvimin(@PathVariable Long id,
                                                          @RequestHeader("Authorization") String token) throws Exception {
        User user = userService.findUserByJwtToken(token);
        Student student = studentService.findStudentByUserId(user.getId());
        ProfesoriProvimi provimi = profesoriProvimiService.findProvimiById(id);

        StudentProvimi prv =  studentPrvService.paraqitProvimin(student, provimi);

        return ResponseEntity.status(HttpStatus.CREATED).body(prv);
    }
    @DeleteMapping("/anulo/{id}")
    public void anuloProvimin(@PathVariable Long id,
                              @RequestHeader("Authorization") String token) throws Exception {
        User user = userService.findUserByJwtToken(token);
        Student student = studentService.findStudentByUserId(user.getId());
        ProfesoriProvimi provimi = profesoriProvimiService.findProvimiById(id);

        studentPrvService.anulo(student, provimi);
    }

    @GetMapping
    public ResponseEntity<List<StudentProvimi>> getProvimet(@RequestHeader("Authorization")String token) throws Exception {
        User user = userService.findUserByJwtToken(token);
        Student student = studentService.findStudentByUserId(user.getId());

        List<StudentProvimi> provimet = studentPrvService.getProvimet(student.getId());

        return ResponseEntity.status(HttpStatus.OK).body(provimet);
    }

    @GetMapping("/provimet/semester")
    public ResponseEntity<List<ProvimiResponse>> getSemesterProvimet(@RequestHeader("Authorization")String token)
                                                                        throws Exception{
        User user = userService.findUserByJwtToken(token);
        Student student = studentService.findStudentByUserId(user.getId());

        List<StudentSemesterRegistration> semesterRegistrations = studentSemesterRegistrationService.getSemesters(student.getId());
        List<ProfesoriProvimi> provimet = new ArrayList<>();
        List<ProvimiResponse> responses = new ArrayList<>();


        for (StudentSemesterRegistration registration : semesterRegistrations) {
            Semester semester = registration.getSemester();

            Set<Lenda> lendet = semester.getLendet();

            for (Lenda lenda : lendet ){
                Provimi provimi = provimiService.findProvimiByLendaId(lenda.getId());
                ProfesoriProvimi profesoriProvimi = profesoriProvimiService.findProvimiById(provimi.getId());
                if (profesoriProvimi != null) {
                    Lenda l = provimi.getLenda();
                    Professor p = profesoriProvimi.getProfessor();
                    User prof = p.getUser();

                    ProvimiResponse response = new ProvimiResponse();
                    response.setLenda(lenda.getEmri());
                    response.setProfesori(prof.getFirstName() + " " + prof.getLastName());
                    response.setSemestri(semester.getName());
                    responses.add(response);
                }
            }
        }

        return ResponseEntity.status(HttpStatus.OK).body(responses);
    }


}
