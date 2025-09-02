package com.greenwear.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.actuate.metrics.MetricsAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication(exclude = {MetricsAutoConfiguration.class})
@ComponentScan(basePackages = {"com.greenwear.demo"})
public class GreenwearApplication {

	public static void main(String[] args) {
		SpringApplication.run(GreenwearApplication.class, args);
	}

} 