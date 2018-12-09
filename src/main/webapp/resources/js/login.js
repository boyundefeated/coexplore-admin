$(function () {
    $("#loginForm").on('submit', function (e) {
//        e.preventDefault();
        var dataLogin = {};
        dataLogin.username = $("#idLoginUserName").val();
        dataLogin.password = $("#idLoginPassword").val();
        dataLogin.rememberMe = true;
        $.ajax({
            type: "POST",
            url: CONSTANTS.PREFIX_API_PATH + "/authentication/login",
            data: JSON.stringify(dataLogin),
            contentType: "application/json",
            dataType: 'json',
            success: function (response) {
                alert("SUCCESS");
                setUserInfo(response.value);
                window.location = '/';
            },
            error: function () {
                alert('Error');
            }
        });
        return false;
    });
    
    
    $("#registerForm").on('submit', function(e) {
//		e.preventDefault();
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
//				window.location = '/';
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
//    $("#registerForm").validate({
//        rules: {
//            fullname: "required",
//            email: {
//                required: true,
//                email: true
//            },
//            password: {
//                required: true,
//                minlength: 6
//            },
//            confirm_password: {
//                required: true,
//                minlength: 6,
//                equalTo: "#password"
//            }
//        },
//        messages: {
//            fullname: "Vui lòng nhập tên của bạn",
//            email: "Vui lòng nhập đúng email",
//            password: {
//                required: "Vui lòng điền mật khẩu",
//                minlength: "Mật khẩu phải lớn hơn 6 ký tự"
//            },
//            confirm_password: {
//                required: "Vui lòng điền mật khẩu",
//                minlength: "Mật khẩu phải lớn hơn 6 ký tự",
//                equalTo: "Xác nhận mật khẩu không khớp"
//            },
//            phone_number: "Vui lòng nhập số điện thoại",
//            address: "Vui lòng nhập địa chỉ"
//        },
//        errorElement: "em",
//        errorPlacement: function (error, element) {
//            // Add the `help-block` class to the error element
//            error.addClass("help-block");
//
//            if (element.prop("type") === "checkbox") {
//                error.insertAfter(element.parent("label"));
//            } else {
//                error.insertAfter(element);
//            }
//        },
//        highlight: function (element, errorClass, validClass) {
//            $(element).addClass("has-error").removeClass("has-success");
//        },
//        unhighlight: function (element, errorClass, validClass) {
//            $(element).addClass("has-success").removeClass("has-error");
//        }
//    });
//    $("#loginForm").validate({
//        rules: {
//            username: "required",
//            password: {
//                required: true,
//                minlength: 2
//            }
//        },
//        messages: {
//        	username: "Please input your account",
//            password: {
//                required: "Please input your password",
//                minlength: "Password must be at least 6 characters"
//            }
//        },
//        errorElement: "em",
//        errorPlacement: function (error, element) {
//            // Add the `help-block` class to the error element
//            error.addClass("help-block");
//
//            if (element.prop("type") === "checkbox") {
//                error.insertAfter(element.parent("label"));
//            } else {
//                error.insertAfter(element);
//            }
//        },
//        highlight: function (element, errorClass, validClass) {
//            $(element).addClass("has-error").removeClass("has-success");
//        },
//        unhighlight: function (element, errorClass, validClass) {
//            $(element).addClass("has-success").removeClass("has-error");
//        }
//    });
});