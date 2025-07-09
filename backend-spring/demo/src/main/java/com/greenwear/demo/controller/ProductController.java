package com.greenwear.demo.controller;

import com.greenwear.demo.entity.Product;
import com.greenwear.demo.repository.ProductRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:5173")
public class ProductController {

    private final ProductRepository productRepository;

    public ProductController(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @GetMapping
    public ResponseEntity<Page<Product>> getAllProducts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "asc") String sortDir) {
        
        Sort sort = sortDir.equalsIgnoreCase("desc") ? 
                    Sort.by(sortBy).descending() : 
                    Sort.by(sortBy).ascending();
        
        Pageable pageable = PageRequest.of(page, size, sort);
        Page<Product> products = productRepository.findAll(pageable);
        
        return ResponseEntity.ok(products);
    }

    @GetMapping("/available")
    public ResponseEntity<List<Product>> getAvailableProducts() {
        List<Product> products = productRepository.findAvailableProducts();
        return ResponseEntity.ok(products);
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<Product>> getProductsByCategory(@PathVariable String category) {
        try {
            Product.Category categoryEnum = Product.Category.valueOf(category.toUpperCase());
            List<Product> products = productRepository.findByCategory(categoryEnum);
            return ResponseEntity.ok(products);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/eco-friendly")
    public ResponseEntity<List<Product>> getEcoFriendlyProducts(
            @RequestParam(defaultValue = "3") Integer minRating) {
        List<Product> products = productRepository.findByEcoRatingGreaterThanEqual(minRating);
        return ResponseEntity.ok(products);
    }

    @GetMapping("/low-carbon")
    public ResponseEntity<List<Product>> getLowCarbonProducts(
            @RequestParam(defaultValue = "5.0") BigDecimal maxFootprint) {
        List<Product> products = productRepository.findByLowCarbonFootprint(maxFootprint);
        return ResponseEntity.ok(products);
    }

    @GetMapping("/high-recycled")
    public ResponseEntity<List<Product>> getHighRecycledProducts(
            @RequestParam(defaultValue = "50") Integer minPercentage) {
        List<Product> products = productRepository.findByHighRecycledContent(minPercentage);
        return ResponseEntity.ok(products);
    }

    @GetMapping("/organic")
    public ResponseEntity<List<Product>> getOrganicProducts() {
        List<Product> products = productRepository.findByIsCertifiedOrganicTrue();
        return ResponseEntity.ok(products);
    }

    @GetMapping("/fair-trade")
    public ResponseEntity<List<Product>> getFairTradeProducts() {
        List<Product> products = productRepository.findByIsFairTradeTrue();
        return ResponseEntity.ok(products);
    }

    @GetMapping("/search")
    public ResponseEntity<List<Product>> searchProducts(@RequestParam String keyword) {
        List<Product> products = productRepository.findByNameContainingIgnoreCase(keyword);
        return ResponseEntity.ok(products);
    }

    @GetMapping("/price-range")
    public ResponseEntity<List<Product>> getProductsByPriceRange(
            @RequestParam BigDecimal minPrice,
            @RequestParam BigDecimal maxPrice) {
        List<Product> products = productRepository.findByPriceBetween(minPrice, maxPrice);
        return ResponseEntity.ok(products);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id) {
        Optional<Product> product = productRepository.findById(id);
        return product.map(ResponseEntity::ok)
                     .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Product> createProduct(@RequestBody Product product) {
        try {
            Product savedProduct = productRepository.save(product);
            return ResponseEntity.ok(savedProduct);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable Long id, @RequestBody Product productDetails) {
        try {
            Optional<Product> optionalProduct = productRepository.findById(id);
            if (optionalProduct.isPresent()) {
                Product product = optionalProduct.get();
                
                product.setName(productDetails.getName());
                product.setDescription(productDetails.getDescription());
                product.setPrice(productDetails.getPrice());
                product.setCategory(productDetails.getCategory());
                product.setSize(productDetails.getSize());
                product.setMaterial(productDetails.getMaterial());
                product.setEcoRating(productDetails.getEcoRating());
                product.setCarbonFootprint(productDetails.getCarbonFootprint());
                product.setRecycledContentPercentage(productDetails.getRecycledContentPercentage());
                product.setWaterUsage(productDetails.getWaterUsage());
                product.setStockQuantity(productDetails.getStockQuantity());
                product.setImageUrl(productDetails.getImageUrl());
                product.setBrand(productDetails.getBrand());
                product.setOriginCountry(productDetails.getOriginCountry());
                product.setIsCertifiedOrganic(productDetails.getIsCertifiedOrganic());
                product.setIsFairTrade(productDetails.getIsFairTrade());
                product.setIsActive(productDetails.getIsActive());
                
                Product updatedProduct = productRepository.save(product);
                return ResponseEntity.ok(updatedProduct);
            }
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable Long id) {
        try {
            if (productRepository.existsById(id)) {
                productRepository.deleteById(id);
                return ResponseEntity.ok().build();
            }
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
} 