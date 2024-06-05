package com.projekti.sistemimenaxhimittefakulltetit.service;

import com.projekti.sistemimenaxhimittefakulltetit.entities.*;
import com.projekti.sistemimenaxhimittefakulltetit.repository.StudentGrupiRepository;
import com.projekti.sistemimenaxhimittefakulltetit.repository.StudentRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class StudentGrupiService {
    private final StudentGrupiRepository studentGrupiRepository;
    private final UserService userService;
    private final StudentService studentService;
    private final GrupiService grupiService;
    private final AfatiService afatiService;

    public List<StudentGrupi> getGrupiByStudentId(String jwt, Long id) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        Student student = studentService.findStudentByUserId(user.getId());
        id = student.getId();
        return studentGrupiRepository.findByStudentId(id);
    }

    public StudentGrupi studentGrupi(String jwt, Long grupiId) throws Exception {
        try{
            User user = userService.findUserByJwtToken(jwt);
            Student student = studentService.findStudentByUserId(user.getId());
            if (student == null) {
                throw new Exception("Student not found for user: " + user.getId());
            }

            Grupi grupi = grupiService.getGrupiById(grupiId);
            grupi.decreaseAvailableSpaces();

            List<Afati> afati = afatiService.findByCurrent();

            StudentGrupi studentGrupi = new StudentGrupi();
            studentGrupi.setGrupi(grupi);
            studentGrupi.setStudent(student);
            studentGrupi.setAfati(afati.get(0));

            return studentGrupiRepository.save(studentGrupi);
        }
        catch (IllegalStateException e){
            throw new IllegalStateException("Nuk ka vend ne kete grup");
        }

    }

    public List<StudentGrupi> getStudentGrupiByAfatiId(Long afatiId) {
        return studentGrupiRepository.findByAfatiId(afatiId);
    }

    public List<StudentGrupi> getStudentByAfati(String jwt) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        Student student = studentService.findStudentByUserId(user.getId());
        List<Afati> afati = afatiService.findByCurrent();

        return studentGrupiRepository.findByAfatiIdAndStudentId(afati.get(0).getId(), student.getId());
    }

    @Transactional
    public void deleteByStudentId(String jwt) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        Student student = studentService.findStudentByUserId(user.getId());
        List<Afati> afati = afatiService.findByCurrent();
        List<StudentGrupi> studentGrupis = getStudentByAfati(jwt);
        studentGrupis.get(0).getGrupi().setHapesira(studentGrupis.get(0).getGrupi().getHapesira()+1);

        studentGrupiRepository.deleteByStudentIdAndAfatiId(student.getId(), afati.get(0).getId());
    }
}
