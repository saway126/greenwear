package com.bloggen.controller;

import com.bloggen.entity.BlogPost;
import com.bloggen.service.BlogPostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/blog-posts")
@CrossOrigin(origins = "http://localhost:3000")
public class BlogPostController {
    
    @Autowired
    private BlogPostService blogPostService;
    
    @GetMapping
    public ResponseEntity<List<BlogPost>> getAllBlogPosts() {
        List<BlogPost> blogPosts = blogPostService.getAllBlogPosts();
        return ResponseEntity.ok(blogPosts);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<BlogPost> getBlogPostById(@PathVariable Long id) {
        Optional<BlogPost> blogPost = blogPostService.getBlogPostById(id);
        return blogPost.map(ResponseEntity::ok)
                      .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<BlogPost> createBlogPost(@RequestBody BlogPost blogPost) {
        try {
            BlogPost savedBlogPost = blogPostService.saveBlogPost(blogPost);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedBlogPost);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<BlogPost> updateBlogPost(@PathVariable Long id, @RequestBody BlogPost blogPost) {
        try {
            BlogPost updatedBlogPost = blogPostService.updateBlogPost(id, blogPost);
            if (updatedBlogPost != null) {
                return ResponseEntity.ok(updatedBlogPost);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBlogPost(@PathVariable Long id) {
        try {
            blogPostService.deleteBlogPost(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    @GetMapping("/category/{category}")
    public ResponseEntity<List<BlogPost>> getBlogPostsByCategory(@PathVariable BlogPost.Category category) {
        List<BlogPost> blogPosts = blogPostService.getBlogPostsByCategory(category);
        return ResponseEntity.ok(blogPosts);
    }
    
    @GetMapping("/tone/{tone}")
    public ResponseEntity<List<BlogPost>> getBlogPostsByTone(@PathVariable BlogPost.Tone tone) {
        List<BlogPost> blogPosts = blogPostService.getBlogPostsByTone(tone);
        return ResponseEntity.ok(blogPosts);
    }
    
    @GetMapping("/template/{template}")
    public ResponseEntity<List<BlogPost>> getBlogPostsByTemplate(@PathVariable BlogPost.Template template) {
        List<BlogPost> blogPosts = blogPostService.getBlogPostsByTemplate(template);
        return ResponseEntity.ok(blogPosts);
    }
    
    @GetMapping("/bookmarked")
    public ResponseEntity<List<BlogPost>> getBookmarkedBlogPosts() {
        List<BlogPost> blogPosts = blogPostService.getBookmarkedBlogPosts();
        return ResponseEntity.ok(blogPosts);
    }
    
    @GetMapping("/search")
    public ResponseEntity<List<BlogPost>> searchBlogPosts(@RequestParam String keyword) {
        List<BlogPost> blogPosts = blogPostService.searchBlogPosts(keyword);
        return ResponseEntity.ok(blogPosts);
    }
    
    @PatchMapping("/{id}/bookmark")
    public ResponseEntity<BlogPost> toggleBookmark(@PathVariable Long id) {
        try {
            BlogPost blogPost = blogPostService.toggleBookmark(id);
            if (blogPost != null) {
                return ResponseEntity.ok(blogPost);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    @PostMapping("/generate")
    public ResponseEntity<BlogPost> generateBlogPost(@RequestBody BlogPost blogPostRequest) {
        try {
            // This endpoint specifically for generating new content
            BlogPost generatedBlogPost = blogPostService.saveBlogPost(blogPostRequest);
            return ResponseEntity.status(HttpStatus.CREATED).body(generatedBlogPost);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
} 