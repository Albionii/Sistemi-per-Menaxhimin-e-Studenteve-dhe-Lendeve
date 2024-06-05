package com.projekti.sistemimenaxhimittefakulltetit.controller;

import com.projekti.sistemimenaxhimittefakulltetit.config.JwtProvider;
import com.projekti.sistemimenaxhimittefakulltetit.entities.*;
import com.projekti.sistemimenaxhimittefakulltetit.repository.StudentRepository;
import com.projekti.sistemimenaxhimittefakulltetit.repository.UserRepository;
import com.projekti.sistemimenaxhimittefakulltetit.request.LoginRequest;
import com.projekti.sistemimenaxhimittefakulltetit.response.AuthResponse;
import com.projekti.sistemimenaxhimittefakulltetit.service.CostumerUserDetailsService;
import com.projekti.sistemimenaxhimittefakulltetit.service.UserService;
import com.projekti.sistemimenaxhimittefakulltetit.service.UserServiceImpl;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtProvider jwtProvider;

    @Autowired
    private CostumerUserDetailsService costumerUserDetailsService;



    @PostMapping("signup")
    public ResponseEntity<AuthResponse> createUserHandler(@RequestBody User user) throws Exception{
        User emailExists = userRepository.findUserByEmail(user.getEmail());
        if(emailExists != null){
            throw new Exception("Email already exists");
        }



        User createdUser = new User();
        createdUser.setEmail(user.getEmail());
        createdUser.setGjinia(user.getGjinia());
        createdUser.setDateLindja(user.getDateLindja());
        createdUser.setFirstName(user.getFirstName());
        createdUser.setLastName(user.getLastName());
        createdUser.setRole(user.getRole());
        createdUser.setPassword(passwordEncoder.encode(user.getPassword()));
        createdUser.setQyteti(user.getQyteti());
        createdUser.setRruga(user.getRruga());
        createdUser.setShteti(user.getShteti());
        createdUser.setZipcode(user.getZipcode());
        createdUser.setNrTelefonit(user.getNrTelefonit());


        Student createdStudent = new Student();

        User savedUser = userRepository.save(createdUser);
        createdStudent.setUser(createdUser);
        studentRepository.save(createdStudent);


        Authentication authentication = new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword());
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = jwtProvider.generateToken(authentication);
//        String refreshToken = jwtProvider.generateRefreshToken(authentication);

        AuthResponse authResponse = new AuthResponse();
        authResponse.setJwt(jwt);
        authResponse.setMessage(jwt);
        authResponse.setMessage("Register success");
        authResponse.setRole(savedUser.getRole());

        return new ResponseEntity<>(authResponse, HttpStatus.CREATED);
    }

    @PostMapping("/refresh-token")
    public HashMap<String,String> refreshToken(HttpServletRequest request) {
        // Get the refresh token from the HttpOnly cookie
        Cookie[] cookies = request.getCookies();
        if (cookies == null) {
            return null;
        }
        String refreshToken = null;
        for (Cookie cookie : cookies) {
            if ("refreshToken".equals(cookie.getName())) {
                refreshToken = cookie.getValue();
                break;
            }
        }
        if (refreshToken == null) {
            return null;
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("No refresh token found");
        }
        if (jwtProvider.validateToken(refreshToken)) {
//            System.out.println(refreshToken);
            String newAccessToken = jwtProvider.generateAccessTokenFromRefreshToken(refreshToken);
            if (newAccessToken != null) {
//                return ResponseEntity<>(newAccessToken,HttpStatus.OK);
//                return new ResponseEntity<>(newAccessToken, HttpStatus.OK);
                HashMap<String,String> jwt = new HashMap();
                jwt.put("jwt",newAccessToken);
                return jwt;
            }
        }
        return null;
//        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid refresh token");
    }
    @PostMapping("/signout")
    public ResponseEntity<AuthResponse> signout(HttpServletResponse response) {
        Cookie refreshTokenCookie = new Cookie("refreshToken", null);
        refreshTokenCookie.setHttpOnly(true);
        refreshTokenCookie.setPath("/");
        response.addCookie(refreshTokenCookie);
        return new ResponseEntity<>(null,HttpStatus.OK);

    }


    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    @PostMapping("signin")
    public ResponseEntity<AuthResponse> signin(@RequestBody LoginRequest request, HttpServletResponse response){
        String username = request.getEmail();
        String password = request.getPassword();

        Authentication authentication = authenticate(username, password);
        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
        String role = authorities.isEmpty()? null : authorities.iterator().next().getAuthority();

        String jwt = jwtProvider.generateToken(authentication);
        String refreshToken = jwtProvider.generateRefreshToken(authentication);

        Cookie refreshTokenCookie = new Cookie("refreshToken", refreshToken);
        refreshTokenCookie.setHttpOnly(true);
        refreshTokenCookie.setPath("/");
        refreshTokenCookie.setMaxAge(9000);
        response.addCookie(refreshTokenCookie);



        AuthResponse authResponse = new AuthResponse();
        authResponse.setJwt(jwt);
        authResponse.setMessage("Login success");
        authResponse.setRole(USER_ROLE.valueOf(role));

        return new ResponseEntity<>(authResponse, HttpStatus.OK);
    }
    @PostMapping("/verifyjwt")
    public ResponseEntity<User> verify (@RequestHeader("Authorization") String token){
        User user = null;
//        System.out.println(token);
        try {
            user = userService.findUserByJwtToken(token);
            return new ResponseEntity<>(user,HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null,HttpStatus.NOT_FOUND);
        }
    }

    private Authentication authenticate(String username, String password){
        UserDetails userDetails = costumerUserDetailsService.loadUserByUsername(username);

        if(userDetails == null){
            throw new BadCredentialsException("Invalid username");
        }

        if(!passwordEncoder.matches(password, userDetails.getPassword())){
            throw new BadCredentialsException("Invalid password...");
        }

        return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
    }



}
