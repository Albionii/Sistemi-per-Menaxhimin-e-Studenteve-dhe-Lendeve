package com.projekti.sistemimenaxhimittefakulltetit.service;

import com.projekti.sistemimenaxhimittefakulltetit.entities.*;
import com.projekti.sistemimenaxhimittefakulltetit.repository.*;
import com.projekti.sistemimenaxhimittefakulltetit.request.AssignmentResponse;
import jakarta.persistence.*;
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
    private EntityManager entityManager;
    @Autowired
    private AssignmentRepository assignmentRepository;

    @Autowired
    private AssignmentSubmissionRepository assignmentSubmissionRepository;

    @Autowired
    private UserService userService;

    @Autowired @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private LendaRepository lendaRepository;

    @Autowired
    private ProfesoriLendaRepository profesoriLendaRepository;
    @Autowired
    private FileStorageService fileStorageService;






    @Override
    public List<Assignment> getAllAssignments() {
        return assignmentRepository.findAll();
    }


    @Override
    public Assignment createAssignment(AssignmentResponse req, User user, Long id) throws Exception {
        ProfesoriLenda ligjerata = profesoriLendaRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Postimi nuk u gjet!"));

        Assignment created = new Assignment();

        if (user != null && ligjerata != null) {
            created.setTitulli(req.getTitulli());
            created.setCreatedBy(user);
            created.setMesazhi(req.getMesazhi());
            created.setCreatedAt(LocalDateTime.now());
            created.setExpireAt(req.getExpireAt());
            created.setFileNames(req.getFileNames());
            assignmentRepository.save(created);

            ligjerata.getAssignments().add(created);
            profesoriLendaRepository.save(ligjerata);

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

        ProfesoriLenda ligjerata = profesoriLendaRepository.findByAssignmentsContaining(old);

        if(ligjerata != null) {
            Assignment updatedAssignment = old;
            updatedAssignment.setTitulli(update.getTitulli());
            updatedAssignment.setMesazhi(update.getMesazhi());
            updatedAssignment.setExpireAt(update.getExpireAt());
            updatedAssignment.setUpdatedBy(user);
            updatedAssignment.setUpdatedAt(LocalDateTime.now());
//            fileStorageService.deleteAssignmentFiles(updatedAssignment.getId(), "Assignments");

            assignmentRepository.save(updatedAssignment);

            profesoriLendaRepository.save(ligjerata);

            return updatedAssignment;
        } else
            throw new Exception("Assignment Not found");

    }

    public AssignmentSubmission submit(Long assignmentId, AssignmentSubmission submittedAssignment, User user) throws Exception {
        Assignment assignment = getAssignmentById(assignmentId);
        if (assignment == null) {
            throw new Exception("Assignment not found with id: " + assignmentId);
        }

        submittedAssignment.setSubmiter(user);
        submittedAssignment.setSubmitedAt(LocalDateTime.now());
        if (assignment.getSubmissions() == null) {
            assignment.setSubmissions(new ArrayList<>());
        }

        if (submittedAssignment == null) {
            throw new NullPointerException("Submission is null!");
        }
        assignmentSubmissionRepository.save(submittedAssignment);

        assignment.getSubmissions().add(submittedAssignment);
        assignmentRepository.save(assignment);

        return submittedAssignment;
    }

    @Override
    public Assignment deleteAssignmentSubmission(Long id, User user) throws Exception {
        AssignmentSubmission submission = assignmentSubmissionRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Submission with id {" + id +"} was not found!"));

        Assignment assignment = assignmentRepository.findBySubmissionsContains(submission);

        if (assignment != null) {
            assignment.getSubmissions().remove(submission);
            assignmentRepository.save(assignment);
            fileStorageService.deleteSubmissionFiles(assignment.getId(), submission.getId());
            assignmentSubmissionRepository.deleteById(submission.getId());
        }
        assignmentSubmissionRepository.delete(submission);

        return assignment;
    }

    @Override
    public AssignmentSubmission updateAssignmentSubmission(Long id, AssignmentSubmission update, User user) {



        AssignmentSubmission old = findSubmissionByUser(user, id);

        if (old != null) {
            old.setMesazhi(update.getMesazhi());
            old.setSubmitedAt(LocalDateTime.now());
            return assignmentSubmissionRepository.save(old);

        }
        return null;
    }



    @Override
    public void deleteAssignment(Long id) throws Exception {
        Assignment assignment = assignmentRepository.findById(id)
                        .orElseThrow(() -> new EntityNotFoundException("Assignment me id {" + id + "} nuk u gjend!"));

        ProfesoriLenda ligjerata = profesoriLendaRepository.findByAssignmentsContaining(assignment);

        if (ligjerata != null) {
            ligjerata.getAssignments().remove(assignment);
            profesoriLendaRepository.save(ligjerata);
        }

        assignmentRepository.delete(assignment);

    }

    public List<Assignment> getAssignmentsOfLigjerata(Long id) {
        ProfesoriLenda ligjerata = profesoriLendaRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Postimi me id {"+  id +"} nuk u gjet!"));

        return ligjerata.getAssignments();
    }

    public List<AssignmentSubmission> getSubmissions(Long id) {
        Optional<Assignment> assignment = assignmentRepository.findById(id);
        return assignment.get().getSubmissions();
    }

    @Override
    public AssignmentSubmission findSubmissionByUser(User user, Long assignmentId) {

        Optional<Assignment> optionalAssignment = assignmentRepository.findById(assignmentId);

        if (optionalAssignment.isPresent()) {
            Assignment assignment = optionalAssignment.get();

            for (AssignmentSubmission submission : assignment.getSubmissions()) {
                if (submission.getSubmiter().equals(user)) {
                    return submission;
                }
            }
        }
        return null;
    }

}
