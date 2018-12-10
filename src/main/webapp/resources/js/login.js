$(function() {
	$("#loginForm").on('submit', function(e) {
		// e.preventDefault();
		var dataLogin = {};
		dataLogin.username = $("#idLoginUserName").val();
		dataLogin.password = $("#idLoginPassword").val();
		dataLogin.rememberMe = true;
		$.ajax({
			type : "POST",
			url : CONSTANTS.PREFIX_API_PATH + "/authentication/login",
			data : JSON.stringify(dataLogin),
			contentType : "application/json",
			dataType : 'json',
			success : function(response) {
				alert("SUCCESS");
				setUserInfo(response.value);
				window.location = '/';
			},
			error : function() {
				alert('Error');
			}
		});
		return false;
	});

	$("#registerForm").on('submit', function(e) {
		// e.preventDefault();
		var dataRegister = {};
		dataRegister.login = $("#idRegisterUserName").val();
		dataRegister.email = $("#idRegisterEmail").val();
		dataRegister.password = $("#idRegisterPassword").val();
		dataRegister.firstName = $("#idRegisterFirstName").val();
		dataRegister.lastName = $("#idRegisterLastName").val();
		dataRegister.langKey = "en";
		$.ajax({
			type : "POST",
			url : CONSTANTS.PREFIX_API_PATH + "/account/register",
			data : JSON.stringify(dataRegister),
			contentType : "application/json",
			dataType : 'json',
			success : function(response) {
				alert("SUCCESS");
				// window.location = '/';
			},
			error : function() {
				alert('Error');
			}
		});
		return false;
	});

	// redirect if user logged in
	/*
	 * if (isSignedIn()) { $(location).attr('href', '/'); }
	 */

	// validation
	// $("#registerForm").validate({
	// rules: {
	// fullname: "required",
	// email: {
	// required: true,
	// email: true
	// },
	// password: {
	// required: true,
	// minlength: 6
	// },
	// confirm_password: {
	// required: true,
	// minlength: 6,
	// equalTo: "#password"
	// }
	// },
	// messages: {
	// fullname: "Vui lòng nhập tên của bạn",
	// email: "Vui lòng nhập đúng email",
	// password: {
	// required: "Vui lòng điền mật khẩu",
	// minlength: "Mật khẩu phải lớn hơn 6 ký tự"
	// },
	// confirm_password: {
	// required: "Vui lòng điền mật khẩu",
	// minlength: "Mật khẩu phải lớn hơn 6 ký tự",
	// equalTo: "Xác nhận mật khẩu không khớp"
	// },
	// phone_number: "Vui lòng nhập số điện thoại",
	// address: "Vui lòng nhập địa chỉ"
	// },
	// errorElement: "em",
	// errorPlacement: function (error, element) {
	// // Add the `help-block` class to the error element
	// error.addClass("help-block");
	//
	// if (element.prop("type") === "checkbox") {
	// error.insertAfter(element.parent("label"));
	// } else {
	// error.insertAfter(element);
	// }
	// },
	// highlight: function (element, errorClass, validClass) {
	// $(element).addClass("has-error").removeClass("has-success");
	// },
	// unhighlight: function (element, errorClass, validClass) {
	// $(element).addClass("has-success").removeClass("has-error");
	// }
	// });
	// $("#loginForm").validate({
	// rules: {
	// username: "required",
	// password: {
	// required: true,
	// minlength: 2
	// }
	// },
	// messages: {
	// username: "Please input your account",
	// password: {
	// required: "Please input your password",
	// minlength: "Password must be at least 6 characters"
	// }
	// },
	// errorElement: "em",
	// errorPlacement: function (error, element) {
	// // Add the `help-block` class to the error element
	// error.addClass("help-block");
	//
	// if (element.prop("type") === "checkbox") {
	// error.insertAfter(element.parent("label"));
	// } else {
	// error.insertAfter(element);
	// }
	// },
	// highlight: function (element, errorClass, validClass) {
	// $(element).addClass("has-error").removeClass("has-success");
	// },
	// unhighlight: function (element, errorClass, validClass) {
	// $(element).addClass("has-success").removeClass("has-error");
	// }
	// });
});

loginWithFacebook = function() {
	FB.login(function(response) {
		if (response.authResponse) {
			console.log(response);
			console.log(response.authResponse);
			$.ajax({
				type : 'GET',
				url : 'https://graph.facebook.com/me?fields=id,name,picture,first_name,last_name,email&access_token=' + response.authResponse.accessToken ,
				success : function(data) {
					console.log(data);
//					{
//						"id": "1183605018437037",
//						"name": "Nguyễn Hải Duy",
//						"picture":{
//						"data":{"height": 50, "is_silhouette": false, "url": "https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=1183605018437037&height=50&width=50&ext=1547050527&hash=AeRhR8rnWtM9dSV0",…}
//						},
//						"first_name": "Duy",
//						"last_name": "Nguyễn Hải"
//						}
				},
				error : function(jqXHR, status, err) {
					console.log(err);
					// makeErrorToast("Can not Login with Facebook");
				},
				dataType : 'json'
			});
//			$.ajax({
//				type : 'POST',
//				url : '/api/authentication/facebook',
//				data : JSON.stringify(response.authResponse), // or
//																// JSON.stringify
//																// ({name:
//																// 'jonas'}),
//				success : function(data) {
//					createCookie('access_token', data.token, COOKIE_TTL);
//					$(location).attr('href', '/gui/home');
//				},
//				error : function(jqXHR, status, err) {
//					// makeErrorToast("Can not Login with Facebook");
//				},
//				contentType : "application/json",
//				dataType : 'json'
//			});
			// Now you can redirect the user or do an AJAX request to
			// a PHP script that grabs the signed request from the cookie.
		} else {
			// makeErrorToast('User cancelled login or did not fully
			// authorize.');
		}
	});
	return false;
};
window.fbAsyncInit = function() {
	FB.init({
		appId : '134306623917784',
		cookie : true,
		xfbml : true,
		version : 'v2.11'
	});

	FB.AppEvents.logPageView();

};

(function(d, s, id) {
	var js, fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) {
		return;
	}
	js = d.createElement(s);
	js.id = id;
	js.src = "https://connect.facebook.net/en_US/sdk.js";
	fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function onSignInGoogle(googleUser) {
	// Useful data for your client-side scripts:
	var profile = googleUser.w3;
	 console.log("ID: " + profile.Eea); // Don't send this directly to your server!
	 console.log('Full Name: ' + profile.ig);
	 console.log('Given Name: ' + profile.getGivenName());
	 console.log('Family Name: ' + profile.getFamilyName());
	 console.log("Image URL: " + profile.Paa);
	 console.log("Email: " + profile.U3);
	reqData = {
		id : profile.Eea,
		fullname : profile.ig,
		email_address : profile.U3,
	}
	$.ajax({
		type : 'POST',
		url : '/api/authentication/google',
		data : JSON.stringify(reqData), // or JSON.stringify ({name: 'jonas'}),
		success : function(data) {
			createCookie('access_token', data.token, COOKIE_TTL);
			$(location).attr('href', '/gui/home/');
		},
		error : function(jqXHR, status, err) {
			// makeErrorToast("Can not Login with Facebook");
		},
		contentType : "application/json",
		dataType : 'json'
	})
};

/**
 * Initializes Signin v2 and sets up listeners.
 */
var initSigninV2 = function() {
	auth2 = gapi.auth2
			.init({
				client_id : '251059155311-0dmuf85kldje8u0s6lj24j8cvdvub1v9.apps.googleusercontent.com',
				scope : 'profile email'
			});
	// Listen for sign-in state changes.
	auth2.isSignedIn.listen(signinChanged);

	// Listen for changes to current user.
	auth2.currentUser.listen(userChanged);

};
logInWithGoogle = function() {
	if (auth2) {
		auth2.signIn();
	}
}

/**
 * Listener method for sign-out live value.
 * 
 * @param {boolean}
 *            val the updated signed out state.
 */
var googleLoginState = false;
var signinChanged = function(val) {
	googleLoginState = val;
};

/**
 * Listener method for when the user changes.
 * 
 * @param {GoogleUser}
 *            user the updated user.
 */
var userChanged = function(user) {
	console.log(googleLoginState);
	if (googleLoginState) {
		onSignInGoogle(user);
	}
};

// <a href="#" onclick="signOut();">Sign out</a>
function signOut() {
	var auth2 = gapi.auth2.getAuthInstance();
	auth2.signOut().then(function() {
		console.log('User signed out.');
	});
}

// Shorthand for $( document ).ready()
//window.onLoadCallback = function() {
//	gapi.load('auth2', initSigninV2);
//}
$(function() {
	gapi.load('auth2', initSigninV2);

});