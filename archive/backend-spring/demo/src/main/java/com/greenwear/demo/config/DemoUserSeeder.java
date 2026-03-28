package com.greenwear.demo.config;

import com.greenwear.demo.entity.User;
import com.greenwear.demo.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Set;

@Component
public class DemoUserSeeder implements CommandLineRunner {

    private static final String DEMO_EMAIL = "mobileuser@example.com";
    private static final String DEMO_USERNAME = "mobileuser";
    private static final String DEMO_PASSWORD = "pass1234";
    private static final String DEMO_NAME = "Mobile User";

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public DemoUserSeeder(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        User user = userRepository.findByEmail(DEMO_EMAIL).orElseGet(() -> {
            User created = new User(
                    DEMO_USERNAME,
                    DEMO_EMAIL,
                    passwordEncoder.encode(DEMO_PASSWORD),
                    DEMO_NAME
            );
            created.setRoles(Set.of(User.Role.USER));
            return created;
        });

        // Keep demo account deterministic so the mobile app can always sign in.
        user.setUsername(DEMO_USERNAME);
        user.setFullName(DEMO_NAME);
        user.setPassword(passwordEncoder.encode(DEMO_PASSWORD));
        user.setIsActive(true);
        if (user.getRoles() == null || user.getRoles().isEmpty()) {
            user.setRoles(Set.of(User.Role.USER));
        }

        userRepository.save(user);
    }
}
