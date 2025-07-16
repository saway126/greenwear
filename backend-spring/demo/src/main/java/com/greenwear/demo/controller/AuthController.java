package com.greenwear.demo.controller;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.greenwear.demo.config.JwtTokenProvider;
import com.greenwear.demo.dto.JwtResponse;
import com.greenwear.demo.dto.LoginRequest;
import com.greenwear.demo.dto.SignupRequest;
import com.greenwear.demo.entity.User;
import com.greenwear.demo.repository.UserRepository;
import com.greenwear.demo.service.CustomUserDetailsService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider tokenProvider;

    public AuthController(AuthenticationManager authenticationManager,
                         UserRepository userRepository,
                         PasswordEncoder passwordEncoder,
                         JwtTokenProvider tokenProvider) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.tokenProvider = tokenProvider;
    }

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getUsernameOrEmail(),
                            loginRequest.getPassword()
                    )
            );

            SecurityContextHolder.getContext().setAuthentication(authentication);

            CustomUserDetailsService.UserPrincipal userPrincipal = 
                (CustomUserDetailsService.UserPrincipal) authentication.getPrincipal();
            
            User user = userRepository.findById(userPrincipal.getId())
                    .orElseThrow(() -> new RuntimeException("User not found"));

            String jwt = tokenProvider.generateToken(user);

            Set<String> roles = user.getRoles().stream()
                    .map(Enum::name)
                    .collect(Collectors.toSet());

            return ResponseEntity.ok(new JwtResponse(
                    jwt,
                    user.getId(),
                    user.getUsername(),
                    user.getEmail(),
                    roles
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(new MessageResponse("로그인 실패: " + e.getMessage()));
        }
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
        try {
            if (userRepository.existsByUsername(signUpRequest.getUsername())) {
                return ResponseEntity.badRequest()
                        .body(new MessageResponse("오류: 이미 사용중인 사용자명입니다!"));
            }

            if (userRepository.existsByEmail(signUpRequest.getEmail())) {
                return ResponseEntity.badRequest()
                        .body(new MessageResponse("오류: 이미 사용중인 이메일입니다!"));
            }

            // 새 사용자 생성
            User user = new User(
                    signUpRequest.getUsername(),
                    signUpRequest.getEmail(),
                    passwordEncoder.encode(signUpRequest.getPassword()),
                    signUpRequest.getFullName()
            );

            user.setPhoneNumber(signUpRequest.getPhoneNumber());
            
            // 기본 역할 설정
            Set<User.Role> roles = new HashSet<>();
            roles.add(User.Role.USER);
            user.setRoles(roles);

            userRepository.save(user);

            return ResponseEntity.ok(new MessageResponse("사용자가 성공적으로 등록되었습니다!"));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(new MessageResponse("회원가입 실패: " + e.getMessage()));
        }
    }

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(Authentication authentication) {
        try {
            CustomUserDetailsService.UserPrincipal userPrincipal = 
                (CustomUserDetailsService.UserPrincipal) authentication.getPrincipal();
            
            User user = userRepository.findById(userPrincipal.getId())
                    .orElseThrow(() -> new RuntimeException("User not found"));

            return ResponseEntity.ok(new UserInfo(
                    user.getId(),
                    user.getUsername(),
                    user.getEmail(),
                    user.getFullName(),
                    user.getRoles().stream().map(Enum::name).collect(Collectors.toSet())
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(new MessageResponse("사용자 정보 조회 실패: " + e.getMessage()));
        }
    }

    // Helper classes
    public static class MessageResponse {
        private String message;

        public MessageResponse(String message) {
            this.message = message;
        }

        public String getMessage() {
            return message;
        }

        public void setMessage(String message) {
            this.message = message;
        }
    }

    public static class UserInfo {
        private Long id;
        private String username;
        private String email;
        private String fullName;
        private Set<String> roles;

        public UserInfo(Long id, String username, String email, String fullName, Set<String> roles) {
            this.id = id;
            this.username = username;
            this.email = email;
            this.fullName = fullName;
            this.roles = roles;
        }

        // Getters and Setters
        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }

        public String getUsername() { return username; }
        public void setUsername(String username) { this.username = username; }

        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }

        public String getFullName() { return fullName; }
        public void setFullName(String fullName) { this.fullName = fullName; }

        public Set<String> getRoles() { return roles; }
        public void setRoles(Set<String> roles) { this.roles = roles; }
    }
} 