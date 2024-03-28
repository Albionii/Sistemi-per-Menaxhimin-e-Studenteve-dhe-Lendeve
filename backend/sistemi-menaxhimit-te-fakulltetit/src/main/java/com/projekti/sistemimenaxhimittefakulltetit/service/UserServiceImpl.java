package com.projekti.sistemimenaxhimittefakulltetit.service;

import com.projekti.sistemimenaxhimittefakulltetit.config.JwtProvider;
import com.projekti.sistemimenaxhimittefakulltetit.entities.User;
import com.projekti.sistemimenaxhimittefakulltetit.repository.AddressRepository;
import com.projekti.sistemimenaxhimittefakulltetit.repository.NrTelefonitRepository;
import com.projekti.sistemimenaxhimittefakulltetit.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

}
