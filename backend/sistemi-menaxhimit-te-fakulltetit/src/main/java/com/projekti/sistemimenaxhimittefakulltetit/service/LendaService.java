    package com.projekti.sistemimenaxhimittefakulltetit.service;

    import com.projekti.sistemimenaxhimittefakulltetit.entities.Lenda;
    import com.projekti.sistemimenaxhimittefakulltetit.entities.Semester;
    import com.projekti.sistemimenaxhimittefakulltetit.entities.User;
    import com.projekti.sistemimenaxhimittefakulltetit.repository.LendaRepository;
    import com.projekti.sistemimenaxhimittefakulltetit.repository.SemesterRepository;
    import com.projekti.sistemimenaxhimittefakulltetit.request.CreateLendaReq;
    import lombok.RequiredArgsConstructor;
    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.stereotype.Service;
    import org.springframework.transaction.annotation.Transactional;

    import java.util.ArrayList;
    import java.util.List;
    import java.util.Optional;
    import java.util.Set;

    @Service
    @RequiredArgsConstructor
    public class LendaService {

        @Autowired
        private final LendaRepository lendaRepository;

        private final SemesterRepository semesterRepository;

        private final SemesterService semesterService;

        public Lenda findLendaById(Long id) throws Exception {
            Optional<Lenda> opt = lendaRepository.findById(id);

            if(opt.isEmpty()){
                throw new Exception("Lenda with id: "+id+" is not found.");
            }

            return opt.get();
        }

        public List<Lenda> getLendet() {
            return lendaRepository.findAll();
        }

        public void deleteLenda(Long id) {
            lendaRepository.deleteById(id);
        }

        public Lenda updateLenda(Long id, Lenda newLenda){
            Optional<Lenda> lenda = lendaRepository.findById(id);
            if (lenda.isPresent()) {
                Lenda l = lenda.get();
                l.setId(newLenda.getId());
                l.setEmri(newLenda.getEmri());
                l.setKodi(newLenda.getKodi());
                l.setEcts(newLenda.getEcts());
                l.setObligative(newLenda.isObligative());
//                l.setProfesoriLenda(newLenda.getProfesoriLenda());
                return lendaRepository.save(l);
            } else {
                return null; // Or handle the case where the product with the given id is not found
            }
        }

        public Lenda findLendaByProfessorId(Long id) {
            return null;
        }

        public Lenda createLenda(Lenda l) throws Exception {
            if (l == null) {
                throw new IllegalArgumentException("Lenda object is null");
            }

            return lendaRepository.save(l);
        }


    }