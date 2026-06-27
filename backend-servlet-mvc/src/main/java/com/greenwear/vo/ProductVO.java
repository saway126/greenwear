package com.greenwear.vo;

import java.math.BigDecimal;
import java.sql.Timestamp;

public class ProductVO {
    private long id;
    private String name;
    private String description;
    private BigDecimal price;
    private String category;
    private String size;
    private String material;
    private int ecoRating;
    private BigDecimal carbonFootprint;
    private int recycledContentPercentage;
    private BigDecimal waterUsage;
    private int stockQuantity;
    private String imageUrl;
    private String brand;
    private String originCountry;
    private boolean certifiedOrganic;
    private boolean fairTrade;
    private boolean active;
    private Timestamp createdAt;

    public ProductVO() {}

    public long getId() { return id; }
    public void setId(long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public BigDecimal getPrice() { return price; }
    public void setPrice(BigDecimal price) { this.price = price; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getSize() { return size; }
    public void setSize(String size) { this.size = size; }

    public String getMaterial() { return material; }
    public void setMaterial(String material) { this.material = material; }

    public int getEcoRating() { return ecoRating; }
    public void setEcoRating(int ecoRating) { this.ecoRating = ecoRating; }

    public BigDecimal getCarbonFootprint() { return carbonFootprint; }
    public void setCarbonFootprint(BigDecimal carbonFootprint) { this.carbonFootprint = carbonFootprint; }

    public int getRecycledContentPercentage() { return recycledContentPercentage; }
    public void setRecycledContentPercentage(int recycledContentPercentage) { this.recycledContentPercentage = recycledContentPercentage; }

    public BigDecimal getWaterUsage() { return waterUsage; }
    public void setWaterUsage(BigDecimal waterUsage) { this.waterUsage = waterUsage; }

    public int getStockQuantity() { return stockQuantity; }
    public void setStockQuantity(int stockQuantity) { this.stockQuantity = stockQuantity; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public String getBrand() { return brand; }
    public void setBrand(String brand) { this.brand = brand; }

    public String getOriginCountry() { return originCountry; }
    public void setOriginCountry(String originCountry) { this.originCountry = originCountry; }

    public boolean isCertifiedOrganic() { return certifiedOrganic; }
    public void setCertifiedOrganic(boolean certifiedOrganic) { this.certifiedOrganic = certifiedOrganic; }

    public boolean isFairTrade() { return fairTrade; }
    public void setFairTrade(boolean fairTrade) { this.fairTrade = fairTrade; }

    public boolean isActive() { return active; }
    public void setActive(boolean active) { this.active = active; }

    public Timestamp getCreatedAt() { return createdAt; }
    public void setCreatedAt(Timestamp createdAt) { this.createdAt = createdAt; }

    @Override
    public String toString() {
        return "ProductVO{id=" + id + ", name='" + name + "', price=" + price + ", category='" + category + "'}";
    }
}
