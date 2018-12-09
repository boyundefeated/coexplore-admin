var CONSTANTS = {
//	PREFIX_API_PATH : "https://coexplore-api.herokuapp.com/api",
	PREFIX_API_PATH : "http://localhost:8081/api"
}
var ACCESS_TOKEN = 'access_token';
var USER_NAME = 'user_name';
var EMAIL = 'email';
var USER_ID = 'user_id';
var ROLE = 'role';

var AVATAR_URL = 'avatar_url';
var COOKIE_TTL = 24 * 30; // 1 month

// config datatable
var DATATABLE_ENABLE_SEARCHING = false;
var DATATABLE_LANGUAGE_CONFIX = {
	"emptyTable" : "Không có dữ liệu",
	"info" : "Hiển thị _START_ đến _END_ của tổng cộng _TOTAL_ bản ghi",
	"loadingRecords" : "Ðang tải...",
	"processing" : "Ðang tải...",
	"search" : "Tìm kiếm:",
	"zeroRecords" : "Xin lỗi! Không có dữ liệu",
	"paginate" : {
		"first" : "Ðầu",
		"last" : "Cuối",
		"next" : "Sau",
		"previous" : "Trước"
	},
	"lengthMenu" : "Hiển thị _MENU_ bản ghi",
	// "info": "Trang _PAGE_ của _PAGES_",
	"infoEmpty" : "Không có dữ liệu",
	"infoFiltered" : "(Lọc từ _MAX_ bản ghi)"
};

function createCookie(name, value, expiredIn) {
	var expires;
	if (expiredIn) {
		var date = new Date(expiredIn);
		expires = "; expires=" + date.toGMTString();
	} else {
		expires = "";
	}
	document.cookie = encodeURIComponent(name) + "="
			+ encodeURIComponent(value) + expires + "; path=/";
	console.log(document.cookie);
}

function readCookie(name) {
	var nameEQ = encodeURIComponent(name) + "=";
	var ca = document.cookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) === ' ')
			c = c.substring(1, c.length);
		if (c.indexOf(nameEQ) === 0)
			return decodeURIComponent(c.substring(nameEQ.length, c.length));
	}
	return null;
}

function eraseCookie(name) {
	createCookie(name, "", -1);
}

function removeCookie() {
	var cookies = document.cookie.split(";");
	for (var i = 0; i < cookies.length; i++) {
		var equals = cookies[i].indexOf("=");
		var name = equals > -1 ? cookies[i].substr(0, equals) : cookies[i];
		eraseCookie(name.trim());
	}
}

function getAuthHeader() {
	var token = readCookie(ACCESS_TOKEN);
	var header = {
		Authorization : 'Bearer ' + token, // If your header name has spaces or
											// any other char not appropriate
	}
	return header;
}

function getToken() {
	var token = readCookie(ACCESS_TOKEN);
	return token;
}
function setToken(token) {
	createCookie(ACCESS_TOKEN, token, COOKIE_TTL);
}

function isSignedIn() {
	if (readCookie(ACCESS_TOKEN)) {
		// if(readCookie(ROLE) == "ADMIN"){
		return true;
		// }
	}
	return false;
}

function setUserInfo(userInfo) {
	var expiredIn = userInfo.expiredIn;
	createCookie(ACCESS_TOKEN, userInfo.accessToken, expiredIn);
//	createCookie(USER_NAME, userInfo.fullname, COOKIE_TTL);
//	createCookie(USER_ID, userInfo.userId, COOKIE_TTL);
//	createCookie(EMAIL, userInfo.email, COOKIE_TTL);
//	createCookie(ROLE, userInfo.listRole, COOKIE_TTL);
}

$(document).ready(function() {
	let
	pathName = window.location.pathname;
	var isAdminLink = pathName.startsWith("/admin");
	var isLoginPage = pathName == "/admin" || pathName == "/admin/";
	if (isAdminLink && !isSignedIn() && !isLoginPage) {
		$(location).attr('href', '/admin');
	}

	// click logout
	$("#logout").on('click', function(e) {
		removeCookie();
		return true;
	});
});

function formatCurrency(price) {
	price = Number(price);
	return price.toLocaleString('it-IT', {
		style : 'currency',
		currency : 'VND'
	});
}

function makeSuccessNotification(text){
	new PNotify({
        title: 'Success!',
        text: text,
        type: 'success',
        styling: 'bootstrap3'
    });
}
function makeErrorNotification(text){
	new PNotify({
        title: 'Oh No!',
        text: text,
        type: 'error',
        styling: 'bootstrap3'
    });
}
PNotify.prototype.options.delay = 2000; //miliseconds
