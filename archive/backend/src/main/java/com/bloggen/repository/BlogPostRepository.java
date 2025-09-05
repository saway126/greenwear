package com.bloggen.repository;

import com.bloggen.entity.BlogPost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BlogPostRepository extends JpaRepository<BlogPost, Long> {
    
    List<BlogPost> findByCategory(BlogPost.Category category);
    
    List<BlogPost> findByTone(BlogPost.Tone tone);
    
    List<BlogPost> findByTemplate(BlogPost.Template template);
    
    List<BlogPost> findByIsBookmarkedTrue();
    
    @Query("SELECT b FROM BlogPost b WHERE b.title LIKE %:keyword% OR b.keywords LIKE %:keyword%")
    List<BlogPost> findByKeyword(@Param("keyword") String keyword);
    
    @Query("SELECT b FROM BlogPost b ORDER BY b.createdAt DESC")
    List<BlogPost> findAllOrderByCreatedAtDesc();
} 