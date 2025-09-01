package com.bloggen.controller;

import com.bloggen.model.TemplateItem;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/templates")
@CrossOrigin(origins = "*")
public class TemplatesController {

    private final List<TemplateItem> templates = new ArrayList<>();

    public TemplatesController() {
        templates.add(new TemplateItem(UUID.randomUUID().toString(), "Standard Monitoring"));
        templates.add(new TemplateItem(UUID.randomUUID().toString(), "High Sensitivity"));
    }

    @GetMapping
    public List<TemplateItem> list() {
        return templates;
    }

    @PostMapping
    public TemplateItem create(@RequestBody TemplateItem item) {
        if (item.getId() == null || item.getId().isBlank()) {
            item.setId(UUID.randomUUID().toString());
        }
        templates.add(item);
        return item;
    }
}
