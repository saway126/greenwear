package com.bloggen.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "blog_posts")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BlogPost {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, length = 500)
    private String title;
    
    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;
    
    @Column(length = 1000)
    private String keywords;
    
    @Enumerated(EnumType.STRING)
    private Category category;
    
    @Enumerated(EnumType.STRING)
    private Tone tone;
    
    @Enumerated(EnumType.STRING)
    private Template template;
    
    private Integer targetLength;
    
    private Boolean includeEmoji = false;
    
    private Boolean includeCta = false;
    
    @Column(columnDefinition = "TEXT")
    private String customPrompt;
    
    private Integer wordCount;
    
    private Integer readingTime;
    
    private Double seoScore;
    
    private Double sentimentScore;
    
    private Boolean isBookmarked = false;
    
    @CreationTimestamp
    private LocalDateTime createdAt;
    
    @UpdateTimestamp
    private LocalDateTime updatedAt;
    
    // Enums
    public enum Category {
        TECH, LIFESTYLE, BUSINESS, HEALTH, FOOD, TRAVEL, 
        FASHION, EDUCATION, ENTERTAINMENT, FINANCE, FITNESS, DIY
    }
    
    public enum Tone {
        FRIENDLY, PROFESSIONAL, HUMOROUS, FORMAL, CASUAL, 
        ENTHUSIASTIC, PERSUASIVE, INFORMATIVE, CONVERSATIONAL
    }
    
    public enum Template {
        INTRODUCTION, REVIEW, TUTORIAL, COMPARISON, LISTICLE, 
        ANNOUNCEMENT, PROMOTION, STORYTELLING, INTERVIEW, NEWS
    }
} 