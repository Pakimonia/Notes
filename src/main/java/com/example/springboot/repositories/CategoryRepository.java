package com.example.springboot.repositories;

import com.example.springboot.entities.Category;
import org.springframework.data.repository.CrudRepository;

public interface CategoryRepository extends CrudRepository<Category, Long> {


}
