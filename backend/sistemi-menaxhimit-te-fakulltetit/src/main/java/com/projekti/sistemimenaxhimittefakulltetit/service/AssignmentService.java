package com.projekti.sistemimenaxhimittefakulltetit.service;

import com.projekti.sistemimenaxhimittefakulltetit.entities.Assignment;
import com.projekti.sistemimenaxhimittefakulltetit.entities.AssignmentSubmission;
import com.projekti.sistemimenaxhimittefakulltetit.entities.User;
import com.projekti.sistemimenaxhimittefakulltetit.request.AssignmentResponse;

import java.util.List;

public interface AssignmentService {
    public List<Assignment> getAllAssignments();
    public Assignment createAssignment(AssignmentResponse assignment, String token) throws Exception;
    public Assignment getAssignmentById(Long id) throws Exception;
    public Assignment updateAssignment(AssignmentResponse update, String token, Long id) throws Exception;
    public void deleteAssignment(Long id) throws Exception;

    public List<AssignmentSubmission> submit(Long assignment_id,AssignmentSubmission submission, String token) throws Exception;
}
