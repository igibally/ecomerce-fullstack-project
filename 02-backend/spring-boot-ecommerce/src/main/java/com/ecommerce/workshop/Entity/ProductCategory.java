package com.ecommerce.workshop.Entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name="product_category")
@Setter
@Getter
public class ProductCategory {

    @Id
    @Column(name="id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="category_name")
    private String categoryName;


    @OneToMany(cascade = CascadeType.ALL,mappedBy = "category")
    private Set<Product> products;


}
