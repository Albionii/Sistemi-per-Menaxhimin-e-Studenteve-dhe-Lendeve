package com.projekti.sistemimenaxhimittefakulltetit.service;

import com.projekti.sistemimenaxhimittefakulltetit.entities.*;
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

    public StudentProvimi findByProvimi(Provimi provimi) {
        StudentProvimi studentProvimi = studentPrvRepository.findByProvimi(provimi);

        return studentProvimi;
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

    public double getMesatarja(List<Double> notat) {
        double mesatarja = 0;
        double shuma = 0;

        for (Double nota : notat) {
            shuma += nota;
        }

        mesatarja = (shuma / notat.size());

        return  mesatarja;
    }



}
