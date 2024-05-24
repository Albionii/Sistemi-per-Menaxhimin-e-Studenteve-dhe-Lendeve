package com.projekti.sistemimenaxhimittefakulltetit.service;

import com.projekti.sistemimenaxhimittefakulltetit.entities.Assignment;
import com.projekti.sistemimenaxhimittefakulltetit.entities.AssignmentSubmission;
import com.projekti.sistemimenaxhimittefakulltetit.entities.User;
import com.projekti.sistemimenaxhimittefakulltetit.request.AssignmentResponse;

import java.util.List;

public interface AssignmentService {
    public List<Assignment> getAllAssignments();
    public Assignment createAssignment(AssignmentResponse assignment, User token, Long id) throws Exception;
    public Assignment getAssignmentById(Long id) throws Exception;
    public Assignment updateAssignment(AssignmentResponse update, User user, Long id) throws Exception;
    public void deleteAssignment(Long id) throws Exception;
    public Assignment deleteAssignmentSubmission(Long id, User user) throws Exception;
    public List<AssignmentSubmission> submit(Long assignment_id,AssignmentSubmission submission, User user) throws Exception;
    public List<Assignment> getAssignmentsOfLigjerata(Long id);
    public AssignmentSubmission updateAssignmentSubmission(Long id, AssignmentSubmission update, User user);
    public List<AssignmentSubmission> getSubmissions(Long id);

    public AssignmentSubmission findSubmissionByUser(User user, Long assignmentId);

}
