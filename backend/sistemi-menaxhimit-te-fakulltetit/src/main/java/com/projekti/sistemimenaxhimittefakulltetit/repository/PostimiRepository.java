package com.projekti.sistemimenaxhimittefakulltetit.repository;

import com.projekti.sistemimenaxhimittefakulltetit.entities.Assignment;
import com.projekti.sistemimenaxhimittefakulltetit.entities.Postimi;
import com.projekti.sistemimenaxhimittefakulltetit.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostimiRepository extends JpaRepository<Postimi, Long> {

    Postimi findPostimiById(Long id);
    List<Postimi> findAllByUser(User user);
}
