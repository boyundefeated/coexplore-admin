package com.coexplore.admin.controller;

import java.util.Map;

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
		Map<String, Object> model = modelAndView.getModel();
		model.put("title", "Login");
		return modelAndView;
	}

	@RequestMapping("/403")
	ModelAndView error403(ModelAndView modelAndView) {
		modelAndView.setViewName("403");
		Map<String, Object> model = modelAndView.getModel();
		model.put("title", "403");
		return modelAndView;
	}

	@RequestMapping("/404")
	ModelAndView error404(ModelAndView modelAndView) {
		modelAndView.setViewName("404");
		Map<String, Object> model = modelAndView.getModel();
		model.put("title", "404");
		return modelAndView;
	}

	@RequestMapping("/500")
	ModelAndView error500(ModelAndView modelAndView) {
		modelAndView.setViewName("500");
		Map<String, Object> model = modelAndView.getModel();
		model.put("title", "500");
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