package com.projekti.sistemimenaxhimittefakulltetit.service;

import com.projekti.sistemimenaxhimittefakulltetit.entities.*;
import com.projekti.sistemimenaxhimittefakulltetit.repository.SemesterRepository;
import com.projekti.sistemimenaxhimittefakulltetit.repository.StudentPrvRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
@RequiredArgsConstructor
public class StudentPrvService {

    private final StudentPrvRepository studentPrvRepository;
    private final VleresimiService vleresimiService;
    private final UserService userService;
    private final StudentService studentService;
    private final StudentSemesterRegistrationService studentSemesterService;
    private final SemesterRepository semesterRepository;

    public StudentProvimi paraqitProvimin(Student student, Provimi prv) throws Exception {

        if (student == null)
            throw new Exception("Studenti nuk u gjet!");

        if (prv == null)
            throw new Exception("Provimi nuk u gjet!");


        StudentProvimi studentProvimi = new StudentProvimi();

        ProfesoriLenda profesoriLenda = prv.getLigjerata();
        Lenda lenda = profesoriLenda.getLenda();

        studentProvimi.setStudent(student);
        studentProvimi.setProvimi(prv);
        studentProvimi.setEmriLendes(lenda.getEmri());

        if (studentPrvRepository.existsByProvimiAndStudent(prv, student)) {
            throw new Exception("Provimi veqse eshte paraqitur per ju!");
        }


            return studentPrvRepository.save(studentProvimi);
    }

    public List<StudentProvimi> getByStudentId(String jwt) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        Student student = studentService.findStudentByUserId(user.getId());
        return studentPrvRepository.findAllByStudentId(student.getId());
    }

    public Long countExamsByStudentAndSemester(String jwt, Long semesterId) throws Exception {
        List<StudentProvimi> studentProvimiList = getByStudentId(jwt);

        return studentProvimiList.stream()
                .filter(sp -> sp.getProvimi().getLigjerata().getSemester().getId().equals(semesterId))
                .count();
    }

    public List<Object[]> findTop4AvgByProfessor(String jwt) throws Exception{
        User user = userService.findUserByJwtToken(jwt);
        Student student = studentService.findStudentByUserId(user.getId());

        List<Object[]> results = studentPrvRepository.findTop4ProfessorAverageNotaByStudentId(student.getId());

        if (results.size() > 4) {
            return results.subList(0, 4);
        } else {
            return results;
        }
    }

    public Integer findSumOfEctsByStudentId(String jwt) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        Student student = studentService.findStudentByUserId(user.getId());

        List<StudentProvimi> studentProvimiList = studentPrvRepository.findAllByStudentId(student.getId());
        int ects = 0;
        for (StudentProvimi studentProvimi : studentProvimiList){
            ects += studentProvimi.getProvimi().getLigjerata().getLenda().getEcts();
        }

        return ects;
    }

    public int[] getGradeCounts(String jwt) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        Student student = studentService.findStudentByUserId(user.getId());

        List<Object[]> counts = studentPrvRepository.countGrades(student.getId());
        int[] gradeCounts = new int[5]; // Grades are from 6 to 10, so 5 elements

        for (Object[] count : counts) {
            int grade = (int) count[0];
            long gradeCount = (long) count[1];
            // Adjust index for grades from 6 to 10
            gradeCounts[grade - 6] = (int) gradeCount;
        }

        return gradeCounts;
    }

    public StudentProvimi noto(StudentProvimi paraqitja, int nota) {
        paraqitja.setNota(nota);
        paraqitja.setDataVendosjes(LocalDateTime.now());

        return studentPrvRepository.save(paraqitja);
    }

    public StudentProvimi setNota(int nota, Long id) {
        StudentProvimi studentProvimi = findById(id);
        studentProvimi.setNota(nota);
        studentProvimi.setDataVendosjes(LocalDateTime.now());

        return studentPrvRepository.save(studentProvimi);
    }

    public List<StudentProvimi> findByProvimi(Provimi provimi) {
        return (List<StudentProvimi>) studentPrvRepository.findByProvimi(provimi);

    }

    public StudentProvimi createParaqitjaProvimit(StudentProvimi studentProvimi) throws Exception {
        if (studentProvimi == null) {
            throw new IllegalArgumentException("ParaqitjaProvimit object is null");
        }

        return studentPrvRepository.save(studentProvimi);
    }


    public List<StudentProvimi> findAllStudentProvimiByProvimiId(Long provimiId) {
        return studentPrvRepository.findAllStudentProvimiByProvimiId(provimiId);
    }

    public StudentProvimi findById(Long id) {

        return studentPrvRepository.findById(id).get();
    }


    public void anulo(Long id) {

        StudentProvimi studentProvimi = findById(id);

        studentPrvRepository.delete(studentProvimi);
    }

    public StudentProvimi findByProvimiAndStudent(Provimi provimi, Student student) {
        return studentPrvRepository.findByProvimiAndStudent(provimi, student);
    }

    public List<StudentProvimi> getProvimet(Long id) {
       return studentPrvRepository.findAllByStudentId(id);
    }

    public List<StudentProvimi> findProvimetByProvimId(Long id) {
        List<StudentProvimi> provimet = studentPrvRepository.findAllStudentProvimiByProvimiId(id);
        System.out.println(provimet.isEmpty());
        return provimet;
    }

    public boolean existsByProvimiAndStudent(Provimi provimi, Student student) {
        return studentPrvRepository.existsByProvimiAndStudent(provimi, student);
    }

    public boolean existsByEmriLendes(String emri) {
        return studentPrvRepository.existsByEmriLendes(emri);
    }


    public List<StudentProvimi> gjeneroTranskripten(Long studentId) {
        List<StudentProvimi> provimet = studentPrvRepository.findAllByStudentId(studentId);
        List<StudentProvimi> notat = new ArrayList<>();

        for (StudentProvimi provimi : provimet) {
            if (provimi.getNota() > 5) {
                notat.add(provimi);
            }
        }
        return notat;
    }

//    public Integer findSumOfEctsByStudentId(String jwt) throws Exception {
//        User user = userService.findUserByJwtToken(jwt);
//        Student student = studentService.findStudentByUserId(user.getId());
//
//        List<StudentProvimi> studentProvimiList = student;
//    }

    public double getMesatarja(List<Double> notat) {
        double mesatarja = 0;
        double shuma = 0;

        for (Double nota : notat) {
            shuma += nota;
        }

        mesatarja = (shuma / notat.size());

        return  mesatarja;
    }

    public void deleteParaqitjaProvimit(Long id) {studentPrvRepository.deleteById(id);}

    public List<StudentProvimi> findAllStudentProvimiByStudentId(Long id) {
        return studentPrvRepository.findAllByStudentId(id);
    }

    public StudentProvimi refuzoNota(Long id){
        Optional<StudentProvimi> studentProvimi = studentPrvRepository.findById(id);
        if (studentProvimi.isPresent()) {
            StudentProvimi s = studentProvimi.get();
            s.setNota(0);
            return studentPrvRepository.save(s);
        } else {
            return null;
        }
    }



}
