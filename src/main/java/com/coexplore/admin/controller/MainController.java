package com.coexplore.admin.controller;

import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
//@RequestMapping("admin")
public class MainController {

	@RequestMapping("/")
	ModelAndView home(ModelAndView modelAndView) {
		modelAndView.setViewName("index");
		modelAndView.getModel().put("name", "John");
		return modelAndView;
	}

	@RequestMapping("/user-management")
	ModelAndView userManagement(ModelAndView modelAndView) {
		modelAndView.setViewName("user-management");
		Map<String, Object> model = modelAndView.getModel();
		model.put("title", "User management");
		return modelAndView;
	}

}