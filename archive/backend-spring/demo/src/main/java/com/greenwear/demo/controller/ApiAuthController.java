package com.greenwear.demo.controller;

import com.greenwear.demo.config.JwtTokenProvider;
import com.greenwear.demo.entity.User;
import com.greenwear.demo.repository.UserRepository;
import com.greenwear.demo.service.CustomUserDetailsService;
import jakarta.validation.constraints.NotBlank;
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

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class ApiAuthController {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider tokenProvider;

    public ApiAuthController(AuthenticationManager authenticationManager,
                             UserRepository userRepository,
                             PasswordEncoder passwordEncoder,
                             JwtTokenProvider tokenProvider) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.tokenProvider = tokenProvider;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        if (request.email() == null || request.email().isBlank() || request.password() == null || request.password().isBlank()) {
            return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "message", "email, password는 필수입니다."
            ));
        }

        if (Boolean.TRUE.equals(userRepository.existsByEmail(request.email()))) {
            return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "message", "이미 사용 중인 이메일입니다."
            ));
        }

        String username = generateUsernameFromEmail(request.email());
        String displayName = (request.name() == null || request.name().isBlank()) ? username : request.name();

        User user = new User(
                username,
                request.email(),
                passwordEncoder.encode(request.password()),
                displayName
        );

        Set<User.Role> roles = new HashSet<>();
        roles.add(User.Role.USER);
        user.setRoles(roles);
        userRepository.save(user);

        String jwt = tokenProvider.generateToken(user);
        return ResponseEntity.ok(buildSessionResponse(jwt, user));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        String credential = request.email() != null && !request.email().isBlank()
                ? request.email()
                : request.usernameOrEmail();

        if (credential == null || credential.isBlank() || request.password() == null || request.password().isBlank()) {
            return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "message", "email(usernameOrEmail), password는 필수입니다."
            ));
        }

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(credential, request.password())
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);

        Optional<User> userOptional = userRepository.findByUsernameOrEmail(credential, credential);
        if (userOptional.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "message", "사용자를 찾을 수 없습니다."
            ));
        }

        User user = userOptional.get();
        String jwt = tokenProvider.generateToken(user);
        return ResponseEntity.ok(buildSessionResponse(jwt, user));
    }

    @GetMapping("/me")
    public ResponseEntity<?> me(Authentication authentication) {
        if (authentication == null || !(authentication.getPrincipal() instanceof CustomUserDetailsService.UserPrincipal principal)) {
            return ResponseEntity.status(401).body(Map.of(
                    "success", false,
                    "message", "인증 정보가 없습니다."
            ));
        }

        Long userId = principal.getId();
        if (userId == null) {
            return ResponseEntity.status(401).body(Map.of(
                    "success", false,
                    "message", "유효하지 않은 사용자 세션입니다."
            ));
        }

        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isEmpty()) {
            return ResponseEntity.status(404).body(Map.of(
                    "success", false,
                    "message", "사용자를 찾을 수 없습니다."
            ));
        }

        User user = userOptional.get();
        Map<String, Object> userData = new HashMap<>();
        userData.put("id", user.getId());
        userData.put("name", user.getFullName() != null ? user.getFullName() : user.getUsername());
        userData.put("email", user.getEmail());

        return ResponseEntity.ok(Map.of(
                "success", true,
                "data", userData
        ));
    }

    private Map<String, Object> buildSessionResponse(String jwt, User user) {
        Map<String, Object> userData = new HashMap<>();
        userData.put("id", user.getId());
        userData.put("name", user.getFullName() != null ? user.getFullName() : user.getUsername());
        userData.put("email", user.getEmail());

        Map<String, Object> sessionData = new HashMap<>();
        sessionData.put("token", jwt);
        sessionData.put("user", userData);

        return Map.of(
                "success", true,
                "data", sessionData
        );
    }

    private String generateUsernameFromEmail(String email) {
        String base = email.split("@")[0].replaceAll("[^a-zA-Z0-9_\\-\\.]", "");
        if (base.isBlank()) {
            base = "greenwear_user";
        }
        String candidate = base;
        int suffix = 1;
        while (Boolean.TRUE.equals(userRepository.existsByUsername(candidate))) {
            candidate = base + suffix;
            suffix++;
        }
        return candidate;
    }

    public record RegisterRequest(String name, @NotBlank String email, @NotBlank String password) {}

    public record LoginRequest(String email, String usernameOrEmail, @NotBlank String password) {}
}
