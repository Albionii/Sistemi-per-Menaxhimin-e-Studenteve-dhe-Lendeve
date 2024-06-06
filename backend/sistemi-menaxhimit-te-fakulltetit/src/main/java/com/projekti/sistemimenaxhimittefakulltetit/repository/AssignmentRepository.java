package com.projekti.sistemimenaxhimittefakulltetit.repository;

import com.projekti.sistemimenaxhimittefakulltetit.entities.Assignment;
import com.projekti.sistemimenaxhimittefakulltetit.entities.AssignmentSubmission;
import com.projekti.sistemimenaxhimittefakulltetit.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AssignmentRepository extends JpaRepository<Assignment, Long> {

    Assignment findBySubmissionsContains(AssignmentSubmission assignmentSubmission);

    List<Assignment> findByCreatedBy_Id(Long userId);
}
