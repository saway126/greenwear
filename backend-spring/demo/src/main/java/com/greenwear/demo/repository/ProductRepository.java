package com.greenwear.demo.repository;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.greenwear.demo.entity.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    
    List<Product> findByCategory(Product.Category category);
    
    List<Product> findBySize(Product.Size size);
    
    List<Product> findByIsActiveTrue();
    
    List<Product> findByEcoRatingGreaterThanEqual(Integer rating);
    
    List<Product> findByPriceBetween(BigDecimal minPrice, BigDecimal maxPrice);
    
    List<Product> findByNameContainingIgnoreCase(String name);
    
    List<Product> findByBrand(String brand);
    
    List<Product> findByIsCertifiedOrganicTrue();
    
    List<Product> findByIsFairTradeTrue();
    
    @Query("SELECT p FROM Product p WHERE p.isActive = true AND p.stockQuantity > 0")
    List<Product> findAvailableProducts();
    
    @Query("SELECT p FROM Product p WHERE p.carbonFootprint <= :maxFootprint ORDER BY p.carbonFootprint ASC")
    List<Product> findByLowCarbonFootprint(@Param("maxFootprint") BigDecimal maxFootprint);
    
    @Query("SELECT p FROM Product p WHERE p.recycledContentPercentage >= :minPercentage ORDER BY p.recycledContentPercentage DESC")
    List<Product> findByHighRecycledContent(@Param("minPercentage") Integer minPercentage);
} 