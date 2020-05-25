package com.ecommerce.workshop.dao;

import com.ecommerce.workshop.Entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.CrossOrigin;


@CrossOrigin("http://localhost:4200")
public interface ProductRepository extends JpaRepository<Product,Long> {
    // query method select * from where category_id=?
    //url:localhost:8080/api/products/serach/findByCategoryId?id=1
    Page<Product> findByCategoryId(@Param("id") Long id ,Pageable pagable);
    //url:localhost:8080/api/products/search/findByNameContaining?name="python"
    Page<Product> findByNameContaining(@Param("name") String name, Pageable pageable);
}
