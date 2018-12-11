const GOOGLE_CLIENT_ID = '251059155311-0dmuf85kldje8u0s6lj24j8cvdvub1v9.apps.googleusercontent.com';
const FACEBOOK_APP_ID = '134306623917784';
function loginSuccess(response){
	if(response.value && response.value.authorities){
		if(response.value.authorities.includes("ROLE_ADMIN")){
			setUserInfo(response.value);
			window.location = '/';
		}else{
			makeErrorNotification("Access is denied");
		}
	}else{
		makeErrorNotification("Access is denied");
	}
}
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
				loginSuccess(response);
			},
			error : function(err) {
				checkCommonError(err);
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
				makeSuccessNotification();
				window.location = '/login';
			},
			error : function(err) {
				checkCommonError(err);
			}
		});
		return false;
	});

	// redirect if user logged in
	if (isSignedIn()) {
		$(location).attr('href', '/');
	}

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
	FB
			.login(function(response) {
				if (response.authResponse) {
					console.log(response);
					console.log(response.authResponse);
					$
							.ajax({
								type : 'GET',
								url : 'https://graph.facebook.com/me?fields=id,name,picture,first_name,last_name,email,link&access_token='
										+ response.authResponse.accessToken,
								success : function(data) {
									console.log(data);
									requestLoginWithSocial(data, "FACEBOOK");
									// {
									// "id": "1183605018437037",
									// "name": "Nguyễn Hải Duy",
									// "picture":{
									// "data":{"height": 50, "is_silhouette":
									// false, "url":
									// "https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=1183605018437037&height=50&width=50&ext=1547050527&hash=AeRhR8rnWtM9dSV0",…}
									// },
									// "first_name": "Duy",
									// "last_name": "Nguyễn Hải"
									// }
								},
								error : function(err) {
									checkCommonError(err);
								},
								dataType : 'json'
							});

				} else {
					// makeErrorToast('User cancelled login or did not fully
					// authorize.');
				}
			});
	return false;
};

function requestLoginWithSocial(profile, type) {
	var login, email, firstName, lastName, imageUrl, profileUrl;
	if (type == "FACEBOOK") {
		login = profile.id;
		email = profile.email;
		firstName = profile.first_name;
		lastName = profile.last_name;
		if (profile.picture && profile.picture.data) {
			imageUrl = profile.picture.data.url;
		}
		profileUrl = profile.link;
	} else if (type == "GOOGLE") {
		login = profile.Eea;
		email = profile.U3;
		firstName = profile.getGivenName();
		lastName = profile.getFamilyName();
		imageUrl = profile.Paa;
		profileUrl = profile.profileUrl;
	}
	var reqData = {
		login : login,
		email : email,
		firstName : firstName,
		lastName : lastName,
		imageUrl : imageUrl,
		type : type,
		profileUrl : profileUrl
	}

	$.ajax({
		type : "POST",
		url : CONSTANTS.PREFIX_API_PATH + "/authentication/social",
		data : JSON.stringify(reqData),
		contentType : "application/json",
		dataType : 'json',
		success : function(response) {
			loginSuccess(response);
		},
		error : function(err) {
			checkCommonError(err);
		}
	});
}

window.fbAsyncInit = function() {
	FB.init({
		appId : FACEBOOK_APP_ID,
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
	console.log(profile);
	// console.log("ID: " + profile.Eea); // Don't send this directly to your
	// // server!
	// console.log('Full Name: ' + profile.ig);
	// console.log('Given Name: ' + profile.getGivenName());
	// console.log('Family Name: ' + profile.getFamilyName());
	// console.log("Image URL: " + profile.Paa);
	// console.log("Email: " + profile.U3);

	// This sample assumes a client object has been created.
	// To learn more about creating a client, check out the starter:
	// https://developers.google.com/+/quickstart/javascript
	var request = gapi.client.plus.people.get({
		'userId' : 'me'
	});

	request.execute(function(resp) {
		console.log(resp);
//		console.log('ID: ' + resp.id);
//		console.log('Display Name: ' + resp.displayName);
//		console.log('Image URL: ' + resp.image.url);
//		console.log('Profile URL: ' + resp.url);
		profile.profileUrl = resp.url;
		requestLoginWithSocial(profile, "GOOGLE");
	});
};
/**
 * Initializes Signin v2 and sets up listeners.
 */
var initSigninV2 = function() {
	gapi.client.load('plus', 'v1').then(function() {

	});
	auth2 = gapi.auth2.init({
		client_id : GOOGLE_CLIENT_ID,
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
$(function() {
	gapi.load('auth2', initSigninV2);
});