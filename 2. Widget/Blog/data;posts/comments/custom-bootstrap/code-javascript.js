document.addEventListener("DOMContentLoaded", function() {
	var a = document,
	commentform = document.getElementById("comment-editor"),
	d = commentform.getAttribute("data-src");
	if (commentform.setAttribute("src", d), 1 == comment) {
		var f = document.getElementsByClassName("comment-reply"),
		c = document.getElementById("threaded-comment-form"),
		h = f.length,
		k = function(commentform, d, e, f) {
			commentform.addEventListener("click", function() {
				var c = commentform.getAttribute("data-comment-id");

				document.getElementById("c" + c).appendChild(d);
				document.getElementById("threaded-comment-form").className = 'comment-replybox-single';
				document.getElementById("addcomment").className = 'comment-reply';
				e.src = f + "&parentID=" + c
			})
		};
		for (i = 0; i < h; i++) k(f[i], c, commentform, d);
			var l = document.getElementsByClassName("comment-form")[0];
		document.getElementById("addcomment").addEventListener("click", function() {
			l.appendChild(c);
			document.getElementById("addcomment").className = 'comment-reply hidden';
			document.getElementById("threaded-comment-form").className = 'comment-replybox-thread';
			commentform.src = d
		})
	}
}); 