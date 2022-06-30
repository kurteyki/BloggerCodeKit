var originalSource = document.getElementById('comment-editor').src.split('#');
function replyTo(id) {
	var frame = document.getElementById('comment-editor'),
	form = document.getElementById('custom-comment-form'),
	container = (id != "cancel") ? document.getElementById('form-container-' + id) : document.getElementById('custom-comments'),
	part = originalSource;
	frame.style.height = "50px";
	frame.style.visibility = "hidden";
	frame.src = (id != "cancel") ? part[0] + '&parentID=' + id + '#' + part[1] : part[0] + '#' + part[1];
	container.insertBefore(form, null);
	frame.onload = function() {
		this.style.height = "250px";
		this.style.visibility = "visible";
	};
}