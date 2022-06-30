/* toast */
function showToast(message)
{
	$("#main-toast .toast-body").html(message);
	let bsAlert = new bootstrap.Toast(document.getElementById('main-toast'));
	bsAlert.show();
}

/* copythis */
function copyThis(data) {
	$("body").append(`<textarea id="gocopy">${data}</textarea>`);
	$("#gocopy").select();
	document.execCommand('copy');
	$("#gocopy").remove();
	/* show toast */
	showToast('Success Copy');
}