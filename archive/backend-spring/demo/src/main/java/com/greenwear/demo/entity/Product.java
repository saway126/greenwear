package com.greenwear.demo.entity;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

@Entity
@Table(name = "products")
public class Product {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank(message = "제품명은 필수입니다")
    @Column(nullable = false)
    private String name;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    @NotNull(message = "가격은 필수입니다")
    @Positive(message = "가격은 0보다 커야 합니다")
    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal price;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Category category;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Size size;
    
    @Column(nullable = false)
    private String material;
    
    @Column(name = "eco_rating")
    private Integer ecoRating; // 1-5 환경 친화도 평점
    
    @Column(name = "carbon_footprint")
    private BigDecimal carbonFootprint; // 탄소 발자국 (kg CO2)
    
    @Column(name = "recycled_content_percentage")
    private Integer recycledContentPercentage; // 재활용 소재 비율 (%)
    
    @Column(name = "water_usage")
    private BigDecimal waterUsage; // 생산 시 물 사용량 (리터)
    
    @Column(name = "stock_quantity")
    private Integer stockQuantity;
    
    @Column(name = "image_url")
    private String imageUrl;
    
    @ElementCollection
    @CollectionTable(name = "product_images", joinColumns = @JoinColumn(name = "product_id"))
    @Column(name = "image_url")
    private List<String> additionalImages;
    
    @Column(name = "brand")
    private String brand;
    
    @Column(name = "origin_country")
    private String originCountry;
    
    @Column(name = "is_certified_organic")
    private Boolean isCertifiedOrganic = false;
    
    @Column(name = "is_fair_trade")
    private Boolean isFairTrade = false;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    @Column(name = "is_active")
    private Boolean isActive = true;
    
    // 기본 생성자
    public Product() {}
    
    // 생성자
    public Product(String name, String description, BigDecimal price, Category category, Size size, String material) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.category = category;
        this.size = size;
        this.material = material;
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
        this.isActive = true;
    }
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }
    
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
    
    // Getter and Setter methods
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    
    public BigDecimal getPrice() { return price; }
    public void setPrice(BigDecimal price) { this.price = price; }
    
    public Category getCategory() { return category; }
    public void setCategory(Category category) { this.category = category; }
    
    public Size getSize() { return size; }
    public void setSize(Size size) { this.size = size; }
    
    public String getMaterial() { return material; }
    public void setMaterial(String material) { this.material = material; }
    
    public Integer getEcoRating() { return ecoRating; }
    public void setEcoRating(Integer ecoRating) { this.ecoRating = ecoRating; }
    
    public BigDecimal getCarbonFootprint() { return carbonFootprint; }
    public void setCarbonFootprint(BigDecimal carbonFootprint) { this.carbonFootprint = carbonFootprint; }
    
    public Integer getRecycledContentPercentage() { return recycledContentPercentage; }
    public void setRecycledContentPercentage(Integer recycledContentPercentage) { this.recycledContentPercentage = recycledContentPercentage; }
    
    public BigDecimal getWaterUsage() { return waterUsage; }
    public void setWaterUsage(BigDecimal waterUsage) { this.waterUsage = waterUsage; }
    
    public Integer getStockQuantity() { return stockQuantity; }
    public void setStockQuantity(Integer stockQuantity) { this.stockQuantity = stockQuantity; }
    
    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    
    public List<String> getAdditionalImages() { return additionalImages; }
    public void setAdditionalImages(List<String> additionalImages) { this.additionalImages = additionalImages; }
    
    public String getBrand() { return brand; }
    public void setBrand(String brand) { this.brand = brand; }
    
    public String getOriginCountry() { return originCountry; }
    public void setOriginCountry(String originCountry) { this.originCountry = originCountry; }
    
    public Boolean getIsCertifiedOrganic() { return isCertifiedOrganic; }
    public void setIsCertifiedOrganic(Boolean isCertifiedOrganic) { this.isCertifiedOrganic = isCertifiedOrganic; }
    
    public Boolean getIsFairTrade() { return isFairTrade; }
    public void setIsFairTrade(Boolean isFairTrade) { this.isFairTrade = isFairTrade; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
    
    public Boolean getIsActive() { return isActive; }
    public void setIsActive(Boolean isActive) { this.isActive = isActive; }
    
    public enum Category {
        T_SHIRT, PANTS, DRESS, JACKET, SHOES, ACCESSORIES, UNDERWEAR, SPORTSWEAR
    }
    
    public enum Size {
        XS, S, M, L, XL, XXL, XXXL
    }
} 