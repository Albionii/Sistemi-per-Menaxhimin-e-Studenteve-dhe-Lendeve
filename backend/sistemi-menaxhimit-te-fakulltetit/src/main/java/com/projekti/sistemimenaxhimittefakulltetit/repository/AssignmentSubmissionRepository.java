package com.projekti.sistemimenaxhimittefakulltetit.repository;

import com.projekti.sistemimenaxhimittefakulltetit.entities.AssignmentSubmission;
import com.projekti.sistemimenaxhimittefakulltetit.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AssignmentSubmissionRepository extends JpaRepository<AssignmentSubmission, Long> {
    public AssignmentSubmission findBySubmiter_Id(Long id);
//    public AssignmentSubmission findBySubmiter_IdAndAssignment_Id(Long userId, Long assignmentId);
}
