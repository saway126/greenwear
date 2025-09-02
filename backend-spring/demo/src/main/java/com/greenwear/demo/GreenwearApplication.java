package com.greenwear.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.metrics.MetricsAutoConfiguration;
import org.springframework.boot.autoconfigure.metrics.SystemMetricsAutoConfiguration;
import org.springframework.boot.autoconfigure.metrics.export.simple.SimpleMetricsExportAutoConfiguration;
import org.springframework.boot.autoconfigure.metrics.export.prometheus.PrometheusMetricsExportAutoConfiguration;
import org.springframework.boot.autoconfigure.metrics.jdbc.DataSourcePoolMetricsAutoConfiguration;
import org.springframework.boot.autoconfigure.metrics.web.servlet.WebMvcMetricsAutoConfiguration;
import org.springframework.boot.autoconfigure.metrics.web.tomcat.TomcatMetricsAutoConfiguration;
import org.springframework.boot.autoconfigure.metrics.cache.CacheMetricsAutoConfiguration;
import org.springframework.boot.autoconfigure.metrics.orm.jpa.HibernateMetricsAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication(exclude = {
    MetricsAutoConfiguration.class,
    SystemMetricsAutoConfiguration.class,
    SimpleMetricsExportAutoConfiguration.class,
    PrometheusMetricsExportAutoConfiguration.class,
    DataSourcePoolMetricsAutoConfiguration.class,
    WebMvcMetricsAutoConfiguration.class,
    TomcatMetricsAutoConfiguration.class,
    CacheMetricsAutoConfiguration.class,
    HibernateMetricsAutoConfiguration.class
})
@ComponentScan(basePackages = {"com.greenwear.demo"})
public class GreenwearApplication {

	public static void main(String[] args) {
		SpringApplication.run(GreenwearApplication.class, args);
	}

} 