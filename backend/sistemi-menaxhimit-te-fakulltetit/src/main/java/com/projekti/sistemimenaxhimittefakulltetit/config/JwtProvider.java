package com.projekti.sistemimenaxhimittefakulltetit.config;

import javax.crypto.SecretKey;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Service
public class JwtProvider {
    private SecretKey key = Keys.hmacShaKeyFor(JWTConstants.SECRET_KEY.getBytes());

    public String generateToken(Authentication auth){
        Collection<? extends GrantedAuthority> authorities = auth.getAuthorities();
        String roles = populateAuthorities(authorities);

        String jwt = Jwts.builder().setIssuedAt(new Date())
                .setExpiration((new Date(new Date().getTime()+900000)))
                .claim("email", auth.getName())
                .claim("authorities", roles)
                .signWith(key)
                .compact();
        return jwt;
    }
    public String generateRefreshToken(Authentication auth) {

        Collection<? extends GrantedAuthority> authorities = auth.getAuthorities();
        String roles = populateAuthorities(authorities);


        String refreshJwt = Jwts.builder().setIssuedAt(new Date())
                .setExpiration((new Date(new Date().getTime()+9000000)))
                .claim("email", auth.getName())
                .claim("authorities", roles)
                .signWith(key)
                .compact();
        return refreshJwt;
    }
    public boolean validateToken(String token){
        return true;
    }
    public String generateAccessTokenFromRefreshToken(String refreshToken) {
        if (validateToken(refreshToken)) {
            String username = getEmailFromRefreshJwtToken(refreshToken);
            String jwt = Jwts.builder().setIssuedAt(new Date())
                    .setExpiration((new Date(new Date().getTime()+900000)))
                    .claim("email", username)
                    .signWith(key)
                    .compact();
            return jwt;
        }
        return null;
    }

    public String getEmailFromJwtToken(String jwt){
        System.out.println("TEST JWT TOKEN Para Substring " + jwt);

        jwt = jwt.substring(7);
        System.out.println("TEST JWT TOKEN mas Substring " + jwt);
        Claims claims = null;
        try{
        claims = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(jwt).getBody();
        }catch (JwtException e){
            e.printStackTrace();
        }
        String email = String.valueOf(claims.get("email"));

        return email;

    }
    public String getEmailFromRefreshJwtToken(String jwt){
        Claims claims = null;
        try{
            if (jwt != null){
            claims = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(jwt).getBody();
            }
        }catch (JwtException e){
            e.printStackTrace();
        }
        String email = String.valueOf(claims.get("email"));

        return email;
    }

    private String populateAuthorities(Collection<? extends GrantedAuthority> authorities) {
        Set<String> auth = new HashSet<>();

        for(GrantedAuthority authority: authorities){
            auth.add(authority.getAuthority());
        }

        return String.join(",", auth);
    }
}
