// Document ready
document.addEventListener("DOMContentLoaded", function () {
	// cookie statement
	var ktCookieStatementContainer = document.querySelector("#ktCookieStatementContainer");

	if (ktCookieStatementContainer && ktCookieStatementContainer.length !== null) {

		if (!checkCookieRecord("kt-cookie-statement-key")) {
			document.querySelector("#ktCookieStatement").style.display = "block";
		}

		// Conset to allow cookies
		cookiesConsentButton = document.querySelector("#ktCookieStatementConfirm");
		if (cookiesConsentButton && cookiesConsentButton.length !== null) {
			cookiesConsentButton.addEventListener("click", function () {
				setCookieRecord("kt-cookie-statement-key", 1, 10);
				document.querySelector("#ktCookieStatement").style.display = "none";
			});
		}

	}
});

// Nastaví cookie hodnotu dle klíče po zadanou dobu (pro celou cestu /)
function setCookieRecord(cookieName, cookieValue, expirationDaysCount) {
	var date = new Date();
	date.setFullYear(date.getFullYear() + expirationDaysCount);
	document.cookie = cookieName + "=" + cookieValue + "; path=/; expires=" + date.toUTCString();
}

// Smaže cookie hodnotu dle klíče po zadanou dobu (pro celou cestu /)
function removeCookieRecord(cookieName) {
	var date = new Date();
	date.setFullYear(date.getFullYear() - 1);
	document.cookie = cookieName + '=""; path=/; expires=' + date.toUTCString();
}

// Vrátí hodnotu cookie dle klíče
function getCookieRecord(cookieName) {
	var name = cookieName + "=";
	var cookies = document.cookie.split(";");
	for (var i = 0; i < cookies.length; i++) {
		var cookieValue = cookies[i];
		while (cookieValue.charAt(0) == " ") {
			cookieValue = cookieValue.substring(1);
		}
		if (cookieValue.indexOf(name) == 0) {
			return cookieValue.substring(name.length, cookieValue.length);
		}
	}
	return "";
}

// Zkontroluje, zda existuje cookie (hodnota dle klíče)
function checkCookieRecord(cookieName) {
	var cookieValue = getCookieRecord(cookieName);
	if (cookieValue != "") {
		return true;
	}
	return false;
}

// Odstraní z URL parametr a jeho hodnotu
function removeUrlParameter(parameter) {
	var url = document.location.href;
	var urlParts = url.split("?");
	if (urlParts.length >= 2) {
		var urlBase = urlParts.shift();
		var queryString = urlParts.join("?");
		var prefix = encodeURIComponent(parameter) + "=";
		var parts = queryString.split(/[&;]/g);
		for (var i = parts.length; i-- > 0;) {
			if (parts[i].lastIndexOf(prefix, 0) !== -1) {
				parts.splice(i, 1);
			}
		}
		url = urlBase + "?" + parts.join("&");
		window.history.pushState("", document.title, url);
	}
	return url;
}

// Vrátí hodnotu parametru z URL podle jeho klíče (názvu)
// BUJS #1 – getParameterByName by James Padolsey (http://james.padolsey.com/javascript/bujs-1-getparameterbyname/)
function getUrlParameterValue(key) {
	var match = RegExp("[?&]" + key + "=([^&]*)").exec(window.location.search);
	return match && decodeURIComponent(match[1].replace("/+/g", " "));
}

// Vrátí hodnotu parametru z URL podle jeho klíče (názvu)
// add or update query string parameter by Niyaz (http://stackoverflow.com/a/6021027)
function addOrUpdateUrlParameterValue(key, value) {
	var url = window.location.href;
	var regExp = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
	var separator = url.indexOf("?") !== -1 ? "&" : "?";
	if (url.match(regExp)) {
		window.history.pushState({}, null, url.replace(regExp, "$1" + key + "=" + value + "$2"));
	} else {
		window.history.pushState({}, null, url + separator + key + "=" + value);
	}
}