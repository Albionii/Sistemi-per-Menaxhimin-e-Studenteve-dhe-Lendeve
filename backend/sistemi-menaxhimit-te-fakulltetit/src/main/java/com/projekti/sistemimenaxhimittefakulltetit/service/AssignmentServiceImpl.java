package com.projekti.sistemimenaxhimittefakulltetit.service;

import com.projekti.sistemimenaxhimittefakulltetit.entities.*;
import com.projekti.sistemimenaxhimittefakulltetit.repository.*;
import com.projekti.sistemimenaxhimittefakulltetit.request.AssignmentResponse;
import jakarta.persistence.EntityNotFoundException;
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

    @Autowired
    private PostimiRepository postimiRepository;



    @Override
    public List<Assignment> getAllAssignments() {
        return assignmentRepository.findAll();
    }


    @Override
    public Assignment createAssignment(AssignmentResponse req, User user) throws Exception {
        Assignment created = new Assignment();

        Postimi postimi = postimiRepository.findById(req.getId())
                .orElseThrow(() -> new EntityNotFoundException("Postimi nuk u gjet!"));

//        Optional<ProfesoriLenda> profesoriLenda = profesoriLendaRepository.findById(req.getLendaId());

        if (user != null && postimi != null) {
            created.setTitulli(req.getTitulli());
            created.setCreatedBy(user);
            created.setMesazhi(req.getMesazhi());
            created.setCreatedAt(LocalDateTime.now());
            created.setExpireAt(req.getExpireAt());
            created.setFileNames(req.getFileNames());
            assignmentRepository.save(created);

            postimi.getAssignments().add(created);
            postimiRepository.save(postimi);

            return created;
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
    public Assignment updateAssignment(AssignmentResponse update,User user, Long id) throws Exception {

        Assignment old = assignmentRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Assignment me Id {" + id + "} nuk u gjet!"));

        Postimi postimi = postimiRepository.findByAssignmentsContaining(old);

        if(postimi != null) {
            Assignment updatedAssignment = old;
            updatedAssignment.setTitulli(update.getTitulli());
            updatedAssignment.setMesazhi(update.getMesazhi());
            updatedAssignment.setExpireAt(update.getExpireAt());
            updatedAssignment.setFileNames(update.getFileNames());
            updatedAssignment.setUpdatedBy(user);
            updatedAssignment.setUpdatedAt(LocalDateTime.now());

            assignmentRepository.save(updatedAssignment);

            postimi.getAssignments().add(updatedAssignment);
            postimiRepository.save(postimi);

            return updatedAssignment;
        } else
            throw new Exception("Assignment Not found");

    }

    public List<AssignmentSubmission> submit(Long assignmentId, AssignmentSubmission submittedAssignment, User user) throws Exception {

        Assignment assignment = getAssignmentById(assignmentId);
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
    public Assignment deleteAssignmentSubmission(Long id, User user) throws Exception {
        AssignmentSubmission submission = assignmentSubmissionRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Submission with id {" + id +"} was not found!"));

        Assignment assignment = assignmentRepository.findBySubmissionsContains(submission);

        if (assignment != null) {
            assignment.getSubmissions().remove(submission);
            assignmentRepository.save(assignment);
        }
        assignmentSubmissionRepository.delete(submission);

        return assignment;
    }

    @Override
    public AssignmentSubmission updateAssignmentSubmission(Long id, AssignmentSubmission update) {
        AssignmentSubmission old = assignmentSubmissionRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Submission with id {" + id +"} was not found!"));

        old.setMesazhi(update.getMesazhi());
        old.setFileNames(update.getFileNames());
        old.setSubmitedAt(LocalDateTime.now());

        return assignmentSubmissionRepository.save(old);
    }



    @Override
    public void deleteAssignment(Long id) throws Exception {
        Assignment assignment = assignmentRepository.findById(id)
                        .orElseThrow(() -> new EntityNotFoundException("Assignment me id {" + id + "} nuk u gjend!"));

        Postimi postimi = postimiRepository.findByAssignmentsContaining(assignment);

        if (postimi != null) {
            postimi.getAssignments().remove(assignment);
            postimiRepository.save(postimi);
        }

        assignmentRepository.delete(assignment);
    }

    public List<Assignment> getAssignmentsOfPostimi(Long id) {
        Postimi postimi = postimiRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Postimi me id {"+  id +"} nuk u gjet!"));

        return postimi.getAssignments();
    }
}
