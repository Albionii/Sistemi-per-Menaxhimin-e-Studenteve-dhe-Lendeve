package com.projekti.sistemimenaxhimittefakulltetit.service;

import com.projekti.sistemimenaxhimittefakulltetit.entities.*;
import com.projekti.sistemimenaxhimittefakulltetit.repository.AssignmentRepository;
import com.projekti.sistemimenaxhimittefakulltetit.repository.AssignmentSubmissionRepository;
import com.projekti.sistemimenaxhimittefakulltetit.repository.LendaRepository;
import com.projekti.sistemimenaxhimittefakulltetit.repository.ProfesoriLendaRepository;
import com.projekti.sistemimenaxhimittefakulltetit.request.AssignmentResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cglib.core.Local;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.expression.spel.ast.Assign;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestHeader;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;

@Service
public class AssignmentServiceImpl implements AssignmentService{

    @Autowired
    private AssignmentRepository assignmentRepository;

    @Autowired
    private AssignmentSubmissionRepository assignmentSubmissionRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private LendaRepository lendaRepository;

    @Autowired
    private ProfesoriLendaRepository profesoriLendaRepository;



    @Override
    public List<Assignment> getAllAssignments() {
        return assignmentRepository.findAll();
    }


    @Override
    public Assignment createAssignment(AssignmentResponse req, @RequestHeader String token) throws Exception {
        Assignment created = new Assignment();

        User user = userService.findUserByJwtToken(token);

        System.out.println(req.getLigjerata());

        ProfesoriLenda ligjerata = profesoriLendaRepository.findById(req.getLigjerata())
                .orElseThrow(() -> new RuntimeException("ligjerata not found with id: " + req.getLigjerata()));

//        Optional<ProfesoriLenda> profesoriLenda = profesoriLendaRepository.findById(req.getLendaId());

        if (user != null && ligjerata != null) {
            created.setTitulli(req.getTitulli());
            created.setCreatedBy(user);
            created.setMesazhi(req.getMesazhi());
            created.setCreatedAt(LocalDateTime.now());
            created.setExpireAt(req.getExpireAt());
            created.setFileNames(req.getFileNames());

            return assignmentRepository.save(created);
        }
        return null;
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
            updatedAssignment.setUpdatedBy(user);
            updatedAssignment.setUpdatedAt(LocalDateTime.now());

            return assignmentRepository.save(updatedAssignment);
        } else
            throw new Exception("Assignment Not found");

    }

    public List<AssignmentSubmission> submit(Long assignmentId, AssignmentSubmission submittedAssignment, String token) throws Exception {
        Assignment assignment = getAssignmentById(assignmentId);
        User user = userService.findUserByJwtToken(token);

        if (assignment == null) {
            throw new Exception("Assignment not found with id: " + assignmentId);
        }

        submittedAssignment.setSubmiter(user);
        submittedAssignment.setSubmitedAt(LocalDateTime.now());

        assignmentSubmissionRepository.save(submittedAssignment);

        List<AssignmentSubmission> submissions = new ArrayList<>();

        submissions.add(submittedAssignment);

        assignment.setSubmissions(submissions);

        assignmentRepository.save(assignment);
        return assignment.getSubmissions();
    }



    @Override
    public void deleteAssignment(Long id) throws Exception {
        assignmentRepository.deleteById(id);
    }
}
