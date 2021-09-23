package com.example.springboot.loader;

import com.example.springboot.constants.Roles;
import com.example.springboot.entities.Category;
import com.example.springboot.entities.Role;
import com.example.springboot.entities.User;
import com.example.springboot.repositories.CategoryRepository;
import com.example.springboot.repositories.RoleRepository;
import com.example.springboot.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
public class DatabaseLoader implements CommandLineRunner {

    private final CategoryRepository categoryRepository;
    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public DatabaseLoader(CategoryRepository categoryRepository, RoleRepository roleRepository,
                          UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.categoryRepository = categoryRepository;
        this.roleRepository=roleRepository;
        this.userRepository=userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public  void run(String... args) throws  Exception{
        if(this.categoryRepository.count()==0)
        {
            this.categoryRepository.save(new Category("Food"));
            this.categoryRepository.save(new Category("Smartphone"));
        }
        if(this.roleRepository.count()==0)
        {
            this.roleRepository.save(new Role(Roles.Admin));
            this.roleRepository.save(new Role(Roles.User));
        }

        if(this.userRepository.count()==0)
        {
            User user = new User();
            user.setUsername("semen@gmail.com");
            user.setPassword(passwordEncoder.encode("123456"));
            user.setRoles(Arrays.asList(
                    roleRepository.findByName(Roles.Admin)));
            this.userRepository.save(user);
        }

    }
}
