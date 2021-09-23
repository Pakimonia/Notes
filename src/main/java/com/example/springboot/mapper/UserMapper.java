package com.example.springboot.mapper;

import com.example.springboot.dto.UserView;
import com.example.springboot.entities.User;
import java.util.*;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(
        componentModel = "spring"
)
public interface UserMapper {
    @Mapping(target = "user.roles", ignore = true)
    UserView UserToUserView(User user);
}
