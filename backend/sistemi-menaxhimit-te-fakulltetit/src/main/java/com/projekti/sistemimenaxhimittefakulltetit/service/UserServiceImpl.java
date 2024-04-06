package com.projekti.sistemimenaxhimittefakulltetit.service;

import com.projekti.sistemimenaxhimittefakulltetit.config.JwtProvider;
import com.projekti.sistemimenaxhimittefakulltetit.entities.*;
import com.projekti.sistemimenaxhimittefakulltetit.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;

import java.util.Iterator;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{
    @Autowired
    private final UserRepository userRepository;

    @Autowired
    private final AddressRepository addressRepository;

    @Autowired
    private final JwtProvider jwtProvider;

    @Autowired
    private final NrTelefonitRepository nrTelefonitRepository;

    @Autowired
    private final StudentRepository studentRepository;

    @Autowired
    private final ProfessorRepository professorRepository;


    @Override
    public User findUserById(Long id) throws Exception {
        Optional<User> opt = userRepository.findById(id);

        if(opt.isEmpty()){
            throw new Exception("User not found with id: "+id);
        }

        return opt.get();
    }

    @Override
    public User findUserByEmail(String email) {
        return userRepository.findUserByEmail(email);
    }

    public List<User> findAll(){
        return userRepository.findAll();
    }

    @Override
    public User findUserByJwtToken(String jwt) throws Exception {
        String email = jwtProvider.getEmailFromJwtToken(jwt);
        User user = findUserByEmail(email);
        return user;
    }

    public void deleteUserById(Long id){
        userRepository.deleteById(id);
    }

    public User updateRole(Long id,
                           User userDetails) throws Exception{
        User updateUser = findUserById(id);

        if(updateUser == null){
            throw new Exception("User not found with id: "+id);
        }

        if(userDetails.getRole() == null){
            throw new Exception("The inputted role is not correct");
        }

        updateUser.setRole(userDetails.getRole());

        if(updateUser.getRole() == USER_ROLE.ROLE_STUDENT){
            Student student = new Student();
            student.setUser(updateUser);
            studentRepository.save(student);
        }
        else if(updateUser.getRole() == USER_ROLE.ROLE_PROFESSOR){
            Professor professor = new Professor();
            professor.setUser(updateUser);
            professorRepository.save(professor);
        }

        return userRepository.save(updateUser);
    }


}
