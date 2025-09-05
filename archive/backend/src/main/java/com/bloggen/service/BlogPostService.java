package com.bloggen.service;

import com.bloggen.entity.BlogPost;
import com.bloggen.repository.BlogPostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BlogPostService {
    
    @Autowired
    private BlogPostRepository blogPostRepository;
    
    public List<BlogPost> getAllBlogPosts() {
        return blogPostRepository.findAllOrderByCreatedAtDesc();
    }
    
    public Optional<BlogPost> getBlogPostById(Long id) {
        return blogPostRepository.findById(id);
    }
    
    public BlogPost saveBlogPost(BlogPost blogPost) {
        // Generate content using AI (mock implementation)
        String generatedContent = generateBlogContent(blogPost);
        blogPost.setContent(generatedContent);
        
        // Calculate word count and reading time
        blogPost.setWordCount(countWords(generatedContent));
        blogPost.setReadingTime(calculateReadingTime(blogPost.getWordCount()));
        
        // Mock SEO and sentiment scores
        blogPost.setSeoScore(calculateSeoScore(blogPost));
        blogPost.setSentimentScore(calculateSentimentScore(generatedContent));
        
        return blogPostRepository.save(blogPost);
    }
    
    public BlogPost updateBlogPost(Long id, BlogPost blogPost) {
        Optional<BlogPost> existingPost = blogPostRepository.findById(id);
        if (existingPost.isPresent()) {
            BlogPost post = existingPost.get();
            post.setTitle(blogPost.getTitle());
            post.setContent(blogPost.getContent());
            post.setKeywords(blogPost.getKeywords());
            post.setCategory(blogPost.getCategory());
            post.setTone(blogPost.getTone());
            post.setTemplate(blogPost.getTemplate());
            post.setTargetLength(blogPost.getTargetLength());
            post.setIncludeEmoji(blogPost.getIncludeEmoji());
            post.setIncludeCta(blogPost.getIncludeCta());
            post.setCustomPrompt(blogPost.getCustomPrompt());
            post.setIsBookmarked(blogPost.getIsBookmarked());
            
            // Recalculate metrics
            post.setWordCount(countWords(post.getContent()));
            post.setReadingTime(calculateReadingTime(post.getWordCount()));
            post.setSeoScore(calculateSeoScore(post));
            post.setSentimentScore(calculateSentimentScore(post.getContent()));
            
            return blogPostRepository.save(post);
        }
        return null;
    }
    
    public void deleteBlogPost(Long id) {
        blogPostRepository.deleteById(id);
    }
    
    public List<BlogPost> getBlogPostsByCategory(BlogPost.Category category) {
        return blogPostRepository.findByCategory(category);
    }
    
    public List<BlogPost> getBlogPostsByTone(BlogPost.Tone tone) {
        return blogPostRepository.findByTone(tone);
    }
    
    public List<BlogPost> getBlogPostsByTemplate(BlogPost.Template template) {
        return blogPostRepository.findByTemplate(template);
    }
    
    public List<BlogPost> getBookmarkedBlogPosts() {
        return blogPostRepository.findByIsBookmarkedTrue();
    }
    
    public List<BlogPost> searchBlogPosts(String keyword) {
        return blogPostRepository.findByKeyword(keyword);
    }
    
    public BlogPost toggleBookmark(Long id) {
        Optional<BlogPost> blogPost = blogPostRepository.findById(id);
        if (blogPost.isPresent()) {
            BlogPost post = blogPost.get();
            post.setIsBookmarked(!post.getIsBookmarked());
            return blogPostRepository.save(post);
        }
        return null;
    }
    
    // Helper methods
    private String generateBlogContent(BlogPost blogPost) {
        // Mock AI content generation
        String template = "";
        switch (blogPost.getTemplate()) {
            case INTRODUCTION:
                template = "소개하는 글: ";
                break;
            case REVIEW:
                template = "리뷰 글: ";
                break;
            case TUTORIAL:
                template = "튜토리얼 글: ";
                break;
            case LISTICLE:
                template = "리스트 형태의 글: ";
                break;
            default:
                template = "일반 글: ";
        }
        
        String tone = "";
        switch (blogPost.getTone()) {
            case FRIENDLY:
                tone = "친근한 톤으로 ";
                break;
            case PROFESSIONAL:
                tone = "전문적인 톤으로 ";
                break;
            case HUMOROUS:
                tone = "유머러스한 톤으로 ";
                break;
            default:
                tone = "일반적인 톤으로 ";
        }
        
        return template + tone + blogPost.getTitle() + "에 대한 내용입니다.\n\n" +
               "키워드: " + blogPost.getKeywords() + "\n\n" +
               "이것은 AI가 생성한 샘플 콘텐츠입니다. 실제 구현에서는 OpenAI API나 다른 AI 서비스를 연동하여 " +
               "고품질의 블로그 콘텐츠를 생성할 수 있습니다.\n\n" +
               (blogPost.getCustomPrompt() != null ? "사용자 요청사항: " + blogPost.getCustomPrompt() + "\n\n" : "") +
               (blogPost.getIncludeEmoji() ? "🎉 이모지가 포함된 재미있는 내용! 📝✨\n\n" : "") +
               (blogPost.getIncludeCta() ? "지금 바로 시작해보세요! 더 많은 정보가 필요하시면 연락 주세요." : "");
    }
    
    private int countWords(String content) {
        if (content == null || content.trim().isEmpty()) {
            return 0;
        }
        return content.trim().split("\\s+").length;
    }
    
    private int calculateReadingTime(int wordCount) {
        // Average reading speed: 200 words per minute
        return Math.max(1, wordCount / 200);
    }
    
    private double calculateSeoScore(BlogPost blogPost) {
        // Mock SEO score calculation
        double score = 0.5; // Base score
        
        if (blogPost.getTitle() != null && blogPost.getTitle().length() >= 30 && blogPost.getTitle().length() <= 60) {
            score += 0.2;
        }
        
        if (blogPost.getKeywords() != null && !blogPost.getKeywords().trim().isEmpty()) {
            score += 0.2;
        }
        
        if (blogPost.getWordCount() != null && blogPost.getWordCount() >= 300) {
            score += 0.1;
        }
        
        return Math.min(1.0, score);
    }
    
    private double calculateSentimentScore(String content) {
        // Mock sentiment analysis (positive: >0.5, negative: <0.5, neutral: ~0.5)
        return 0.7; // Mock positive sentiment
    }
} 