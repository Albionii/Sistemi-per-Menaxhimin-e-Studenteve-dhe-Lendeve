package com.projekti.sistemimenaxhimittefakulltetit.service;

import com.projekti.sistemimenaxhimittefakulltetit.entities.ProfesoriLenda;
import com.projekti.sistemimenaxhimittefakulltetit.entities.Student;
import com.projekti.sistemimenaxhimittefakulltetit.entities.StudentLigjerata;
import com.projekti.sistemimenaxhimittefakulltetit.entities.User;
import com.projekti.sistemimenaxhimittefakulltetit.repository.ProfesoriLendaRepository;
import com.projekti.sistemimenaxhimittefakulltetit.repository.StudentLigjerataRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class StudentLigjerataService {

    private final StudentLigjerataRepository studentLigjerataRepository;

    private final ProfesoriLendaRepository profesoriLendaRepository;

    public List<StudentLigjerata> findLendetByStudentId(Long id){
        return studentLigjerataRepository.findByStudentId(id);
    }

    public ProfesoriLenda findProfesoriLendaById(Long id) throws Exception {
        Optional<ProfesoriLenda> opt = profesoriLendaRepository.findById(id);

        if(opt.isEmpty()){
            throw new Exception("Ligjerata not found");
        }

        return opt.get();
    }




    //enroll in a Ligjerate
    public StudentLigjerata enroll (Long id, Student student) throws Exception{
        ProfesoriLenda profesoriLenda = findProfesoriLendaById(id);
        if(profesoriLenda == null){
            throw new Exception("Ligjerata me id: "+id+" nuk ekziston");
        }
        StudentLigjerata sl = new StudentLigjerata();
        Optional<StudentLigjerata> existingEnrollment = studentLigjerataRepository.findByStudentIdAndLigjerataId(student.getId(), id);

        if(existingEnrollment.isPresent()){
            studentLigjerataRepository.delete(existingEnrollment.get());
        }
        else{
            sl.setLigjerata(profesoriLenda);
            sl.setStudent(student);
            studentLigjerataRepository.save(sl);
        }

        return sl;
    }
}
