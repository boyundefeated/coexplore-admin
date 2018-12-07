package com.coexplore.admin.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class MainController {

    @RequestMapping("/")
    ModelAndView home(ModelAndView modelAndView) {

        modelAndView.setViewName("index");
        modelAndView.getModel().put("name", "John");

        return modelAndView;
    }

    @RequestMapping("/login")
    ModelAndView login(ModelAndView modelAndView) {

        modelAndView.setViewName("login");
        return modelAndView;
    }
}