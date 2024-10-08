package com.projekti.sistemimenaxhimittefakulltetit.service;

import com.projekti.sistemimenaxhimittefakulltetit.entities.*;
import com.projekti.sistemimenaxhimittefakulltetit.repository.ProfesoriLendaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class ProfesoriLendaService {
    private final ProfesoriLendaRepository profesoriLendaRepository;
    private final UserService userService;
    private final ProfessorService professorService;

    public Optional<ProfesoriLenda> findLendaByProfesoriId(Long id){
        return profesoriLendaRepository.findById(id);
    }

    public List<ProfesoriLenda> findLendaByProfesoriIdaaaaaaaa(Long id){
        return profesoriLendaRepository.findAllByProfessorId(id);
    }

    public Optional<ProfesoriLenda> findById(Long id) {
        return profesoriLendaRepository.findById(id);
    }
    public List<ProfesoriLenda> findAllByLendaId(Long id) {
        return profesoriLendaRepository.findAllByLendaId(id);
    }

    public ProfesoriLenda createLigjerata(ProfesoriLenda ligjerata) throws Exception{

        if(ligjerata == null){
            throw new Exception("Ligjerata can't be null");
        }
        return profesoriLendaRepository.save(ligjerata);
    }

    public int findByProfessorIdAndSemesterId(String jwt, Long semesterId) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        if (user == null) {
            throw new Exception("User not found");
        }

        Professor professor = professorService.findProfessorByUserId(user.getId());
        if (professor == null) {
            throw new Exception("Professor not found");
        }

        List<ProfesoriLenda> profesoriLendaList = profesoriLendaRepository.findByProfessorIdAndSemesterId(professor.getId(), semesterId);

        return profesoriLendaList.size();
    }

    public ProfesoriLenda findByProfessorAndLenda(Professor professor, Lenda lenda) {
        return profesoriLendaRepository.findByProfessorAndLenda(professor, lenda);
    }

    public List<ProfesoriLenda> getAllProfessorLenda(){
        return profesoriLendaRepository.findAll();
    }

    public void deleteProfessorLendaByID(Long id){
        profesoriLendaRepository.deleteById(id);
    }

    public ProfesoriLenda updateProfessorLenda(Long id, ProfesoriLenda newProfessorLenda){
        Optional<ProfesoriLenda> profesoriLenda = profesoriLendaRepository.findById(id);
        if (profesoriLenda.isPresent()) {
            ProfesoriLenda p = profesoriLenda.get();
            p.setId(newProfessorLenda.getId());
            p.setProfessor(newProfessorLenda.getProfessor());
            p.setLenda(newProfessorLenda.getLenda());
            return profesoriLendaRepository.save(p);
        } else {
            return null; // Or handle the case where the product with the given id is not found
        }
    }

    public Long countLendetBySemester(Long semesterId) throws Exception{
        List<ProfesoriLenda> lendet = getBySemesterId(semesterId);

        return lendet.stream()
                .map(ProfesoriLenda::getLenda)
                .distinct()
                .count();
    }

    public List<ProfesoriLenda> getBySemesterId(Long semesterId){
        return profesoriLendaRepository.findBySemesterId(semesterId);
    }

    public List<ProfesoriLenda> getAllProfessorLendaByProfessorID(Long id) {
        System.out.println("test : " + profesoriLendaRepository.findAllByProfessorId(id));
        return profesoriLendaRepository.findAllByProfessorId(id);
    }

    public List<ProfesoriLenda> getAllLigjerataBySemester(Professor professor, Semester semester) {
        System.out.println(professor.getUser().getFirstName() + professor.getUser().getLastName());
        System.out.println(semester.getName());
        return profesoriLendaRepository.findByProfessorAndSemester(professor, semester);
    }

    public List<Semester> findSemesters(Professor professor) {
        List<ProfesoriLenda> ligjeratata = findLendaByProfesoriIdaaaaaaaa(professor.getId());
        List<Semester> semesters = new ArrayList<>();

        for (ProfesoriLenda profesoriLenda: ligjeratata) {
            if (semesters.isEmpty() || !semesters.contains(profesoriLenda.getSemester())) {
                semesters.add(profesoriLenda.getSemester());
            }
        }

        Collections.sort(semesters, Comparator.comparingLong(Semester::getId));

        return semesters;
    }

}
