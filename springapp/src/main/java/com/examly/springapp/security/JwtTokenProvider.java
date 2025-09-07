package com.examly.springapp.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.crypto.SecretKey;
import java.util.*;
// import java.util.stream.Collectors; // Removed unused import

@Component
public class JwtTokenProvider {

    @Value("${jwt.secret}")
    private String jwtSecret;

    @Value("${jwt.expiration}")
    private long jwtExpirationMs;

    @Value("${jwt.header}")
    private String jwtHeader;

    @Value("${jwt.prefix}")
    private String jwtPrefix;

    private SecretKey secretKey;

    @PostConstruct
    protected void init() {
        this.secretKey = Keys.hmacShaKeyFor(jwtSecret.getBytes());
    }

    public String generateJwtToken(String username, String role, Map<String, Object> claims) {
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date((new Date()).getTime() + jwtExpirationMs))
                .addClaims(claims)
                .claim("role", role)
                .signWith(secretKey)
                .compact();
    }

    public String generateTokenForDriver(int id, String phoneNumber, String name) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("id", id);
        claims.put("phoneNumber", phoneNumber);
        claims.put("name", name);
        return generateJwtToken(phoneNumber, "DRIVER", claims);
    }

    public String generateTokenForAdmin(int id, String username) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("id", id);
        return generateJwtToken(username, "ADMIN", claims);
    }

    public String getUsernameFromJwtToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(secretKey)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    public boolean validateJwtToken(String authToken) {
        try {
            Jwts.parserBuilder().setSigningKey(secretKey).build().parseClaimsJws(authToken);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public Authentication getAuthentication(String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(secretKey)
                .build()
                .parseClaimsJws(token)
                .getBody();

        String role = claims.get("role", String.class);
        Collection<SimpleGrantedAuthority> authorities = Collections
                .singletonList(new SimpleGrantedAuthority("ROLE_" + role));

        // We're not using a User entity, so we'll create our own Principal
        return new UsernamePasswordAuthenticationToken(claims.getSubject(), "", authorities);
    }

    public Claims getClaimsFromJwtToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(secretKey)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    public String extractJwtFromHeader(String authorizationHeader) {
        if (authorizationHeader != null && authorizationHeader.startsWith(jwtPrefix)) {
            return authorizationHeader.substring(jwtPrefix.length()).trim();
        }
        return null;
    }
}
