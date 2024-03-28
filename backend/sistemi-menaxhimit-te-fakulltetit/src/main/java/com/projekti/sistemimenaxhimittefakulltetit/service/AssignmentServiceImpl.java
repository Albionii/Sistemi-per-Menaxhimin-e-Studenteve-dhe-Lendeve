package com.projekti.sistemimenaxhimittefakulltetit.service;

import com.projekti.sistemimenaxhimittefakulltetit.entities.Assignment;
import com.projekti.sistemimenaxhimittefakulltetit.entities.Lenda;
import com.projekti.sistemimenaxhimittefakulltetit.entities.User;
import com.projekti.sistemimenaxhimittefakulltetit.repository.AssignmentRepository;
import com.projekti.sistemimenaxhimittefakulltetit.repository.LendaRepository;
import com.projekti.sistemimenaxhimittefakulltetit.request.AssignmentResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cglib.core.Local;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestHeader;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class AssignmentServiceImpl implements AssignmentService{

    @Autowired
    private AssignmentRepository assignmentRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private LendaRepository lendaRepository;

    @Override
    public List<Assignment> getAllAssignments() {
        return assignmentRepository.findAll();
    }


    @Override
    public Assignment createAssignment(AssignmentResponse req, @RequestHeader String token) throws Exception {
        Assignment created = new Assignment();

        User user = userService.findUserByJwtToken(token);

        Lenda lenda = lendaRepository.findById(req.getLendaId())
                .orElseThrow(() -> new RuntimeException("Lenda not found with id: " + req.getLendaId()));

        created.setTitulli(req.getTitulli());
        created.setCreatedBy(user.getId());
        created.setMesazhi(req.getMesazhi());
        created.setCreatedAt(LocalDateTime.now());
        created.setExpireAt(req.getExpireAt());
        created.setFileNames(req.getFileNames());
        created.setLenda(lenda.getId()); // Set the Lenda
        return assignmentRepository.save(created);
    }

    @Override
    public Assignment getAssignmentById(Long id) throws Exception {
        Optional<Assignment> option = assignmentRepository.findById(id);
        if (option.isPresent()) {
            return option.get();
        }else
            throw new Exception("Assignment not found with id: " + id  + "!");
    }

    @Override
    public Assignment updateAssignment(AssignmentResponse update,String token, Long id) throws Exception {

        User user = userService.findUserByJwtToken(token);

        Optional<Assignment> old = assignmentRepository.findById(id);
        if(old.isPresent()) {
            Assignment updatedAssignment = old.get();
            updatedAssignment.setTitulli(update.getTitulli());
            updatedAssignment.setMesazhi(update.getMesazhi());
            updatedAssignment.setExpireAt(update.getExpireAt());
            updatedAssignment.setFileNames(update.getFileNames());
            updatedAssignment.setUpdatedBy(user.getId());
            updatedAssignment.setUpdatedAt(LocalDateTime.now());

            return assignmentRepository.save(updatedAssignment);
        } else
            throw new Exception("Assignment Not found");

    }

    @Override
    public void deleteAssignment(Long id) {
        assignmentRepository.deleteById(id);
    }
}
