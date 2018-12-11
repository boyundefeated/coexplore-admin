package com.coexplore.admin.security;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.GenericFilterBean;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;

/**
 * Filters incoming requests and installs a Spring Security principal if a header corresponding to a valid user is
 * found.
 */
public class CookieFilter extends GenericFilterBean {

    public static final String AUTHORIZATION_HEADER = "Authorization";

    private TokenProvider tokenProvider;

    public CookieFilter(TokenProvider tokenProvider) {
        this.tokenProvider = tokenProvider;
    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest) servletRequest;

        // get token from a Cookie
        Cookie[] cookies = request.getCookies();

        if (cookies != null) {
            Cookie accessTokenCookie = null;
            for (Cookie cookie : cookies) {
                if (("access_token").equals(cookie.getName())) {
                    accessTokenCookie = cookie;
                    break;
                }
            }
            if (accessTokenCookie != null && !StringUtils.isEmpty(accessTokenCookie.getValue())) {
                String jwt = accessTokenCookie.getValue();
                if (StringUtils.hasText(jwt) && this.tokenProvider.validateToken(jwt)) {
                    Authentication authentication = this.tokenProvider.getAuthentication(jwt);
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                }
            }
        }
        filterChain.doFilter(servletRequest, servletResponse);
    }

}
