<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<!-- Meta, title, CSS, favicons, etc. -->
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">

<title>${title}</title>

<!-- Bootstrap -->
<link href="/resources/vendors/bootstrap/dist/css/bootstrap.min.css"
	rel="stylesheet">
<!-- Font Awesome -->
<link href="/resources/vendors/font-awesome/css/font-awesome.min.css"
	rel="stylesheet">
<!-- NProgress -->
<link href="/resources/vendors/nprogress/nprogress.css" rel="stylesheet">
<!-- Animate.css -->
<link href="/resources/vendors/animate.css/animate.min.css"
	rel="stylesheet">

<!-- Custom Theme Style -->
<link href="/resources/build/css/custom.min.css" rel="stylesheet">
<style>
/* Shared */
.loginBtn {
  box-sizing: border-box;
  position: relative;
  /* width: 13em;  - apply for fixed size */
  margin: 0.2em;
  padding: 0 15px 0 46px;
  border: none;
  text-align: left;
  line-height: 34px;
  white-space: nowrap;
  border-radius: 0.2em;
  font-size: 16px;
  color: #FFF;
}
.loginBtn:before {
  content: "";
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
  width: 34px;
  height: 100%;
}
.loginBtn:focus {
  outline: none;
}
.loginBtn:active {
  box-shadow: inset 0 0 0 32px rgba(0,0,0,0.1);
}


/* Facebook */
.loginBtn--facebook {
  background-color: #4C69BA;
  background-image: linear-gradient(#4C69BA, #3B55A0);
  /*font-family: "Helvetica neue", Helvetica Neue, Helvetica, Arial, sans-serif;*/
  text-shadow: 0 -1px 0 #354C8C;
}
.loginBtn--facebook:before {
  border-right: #364e92 1px solid;
  background: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/14082/icon_facebook.png') 6px 6px no-repeat;
}
.loginBtn--facebook:hover,
.loginBtn--facebook:focus {
  background-color: #5B7BD5;
  background-image: linear-gradient(#5B7BD5, #4864B1);
}


/* Google */
.loginBtn--google {
  /*font-family: "Roboto", Roboto, arial, sans-serif;*/
  background: #DD4B39;
}
.loginBtn--google:before {
  border-right: #BB3F30 1px solid;
  background: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/14082/icon_google.png') 6px 6px no-repeat;
}
.loginBtn--google:hover,
.loginBtn--google:focus {
  background: #E74B37;
}
</style>
</head>

<body class="login">

	<div id="fb-root"></div>
	<!--<meta name="google-signin-scope" content="profile email">-->
	<!--<meta name="google-signin-client_id"-->
	<!--content="251059155311-0dmuf85kldje8u0s6lj24j8cvdvub1v9.apps.googleusercontent.com">-->
	<script src="https://apis.google.com/js/platform.js"></script>
	<div>
		<a class="hiddenanchor" id="signup"></a> <a class="hiddenanchor"
			id="signin"></a>

		<div class="login_wrapper">
			<div class="animate form login_form">
				<section class="login_content">
					<form id="loginForm">
						<h1>Login</h1>
						<div>
							<input type="text" class="form-control" placeholder="Username"
								name="username" id="idLoginUserName" required autofocus />
						</div>
						<div>
							<input type="password" class="form-control" id="idLoginPassword"
								name="password" placeholder="Password" required />
						</div>
						<div>
							<button class="btn btn-default submit" type="submit">Log
								in</button>

							<a class="reset_pass" href="#">Lost your password?</a>
						</div>

						<div class="clearfix"></div>

						<div class="separator">
							<p class="change_link">
								New to site? <a href="#signup" class="to_register"> Create
									Account </a>
							</p>
							<a class="loginBtn loginBtn--facebook" href="#" onclick="loginWithFacebook()">Login with
								Facebook</a>

							<a class="loginBtn loginBtn--google"  href="#" onclick="logInWithGoogle()">Login with
								Google</a>
							<div class="clearfix"></div>
							<br />

							<div>
								<h1>
									<i class="fa fa-paw"></i> CoXplore
								</h1>
								<p>©2018 All Rights Reserved</p>
							</div>
						</div>
					</form>
				</section>
			</div>

			<div id="register" class="animate form registration_form">
				<section class="login_content">
					<form id="registerForm">
						<h1>Create Account</h1>
						<div>
							<input type="text" class="form-control" placeholder="Username"
								id="idRegisterUserName" required />
						</div>
						<div>
							<input type="email" class="form-control" placeholder="Email"
								id="idRegisterEmail" required />
						</div>
						<div>
							<input type="password" class="form-control"
								id="idRegisterPassword" placeholder="Password" required />
						</div>
						<div>
							<input type="text" class="form-control" id="idRegisterFirstName"
								placeholder="First name" required />
						</div>
						<div>
							<input type="text" class="form-control" id="idRegisterLastName"
								placeholder="Last name" required />
						</div>
						<div>
							<button class="btn btn-default submit" type="submit">Submit</button>
						</div>

						<div class="clearfix"></div>

						<div class="separator">
							<p class="change_link">
								Already a member ? <a href="#signin" class="to_register">
									Log in </a>
							</p>

							<div class="clearfix"></div>
							<br />

							<div>
								<h1>
									<i class="fa fa-paw"></i> CoXplore
								</h1>
								<p>©2018 All Rights Reserved</p>
							</div>
						</div>
					</form>
				</section>
			</div>
		</div>
	</div>
	<script src="//code.jquery.com/jquery-2.2.4.min.js"></script>
	<!-- 	<script
		src="//cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.16.0/jquery.validate.min.js"></script> -->
	<script src="/resources/js/common.js"></script>
	<script src="/resources/js/login.js"></script>

</body>
</html>
