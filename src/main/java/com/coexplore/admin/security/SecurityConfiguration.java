package com.coexplore.admin.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.authentication.LoginUrlAuthenticationEntryPoint;
import org.springframework.security.web.authentication.www.BasicAuthenticationEntryPoint;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true, securedEnabled = true)
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

    private final TokenProvider tokenProvider;

    public SecurityConfiguration( TokenProvider tokenProvider) {
        this.tokenProvider = tokenProvider;
    }

    @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring()
            .antMatchers(HttpMethod.OPTIONS, "/**")
            .antMatchers("/swagger-ui/index.html")
            .antMatchers("/test/**");
    }

    @Override
    public void configure(HttpSecurity http) throws Exception {
        http
            .csrf()
            .disable()
            .exceptionHandling().authenticationEntryPoint(authenticationEntryPoint())
        .and()
            .headers()
            .frameOptions()
            .disable()
        .and()
            .sessionManagement()
            .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
        .and()
            .authorizeRequests()
            .antMatchers("/login").permitAll()
            .antMatchers("/403").permitAll()
            .antMatchers("/404").permitAll()
            .antMatchers("/500").permitAll()
            .antMatchers("/resources/**").permitAll()
        .and()
            .authorizeRequests()
//            .antMatchers("/resources/**").permitAll()
            .anyRequest().authenticated()
//            .antMatchers("/*").authenticated()

        .and()
            .apply(securityConfigurerAdapter());

    }

    private CookieConfigurer securityConfigurerAdapter() {
        return new CookieConfigurer(tokenProvider);
    }
    
    @Bean
    public AuthenticationEntryPoint authenticationEntryPoint(){
        AuthenticationEntryPoint entryPoint = 
          new LoginUrlAuthenticationEntryPoint("/login");
//        entryPoint.setRealmName("real names");
        return entryPoint;
    }
}
