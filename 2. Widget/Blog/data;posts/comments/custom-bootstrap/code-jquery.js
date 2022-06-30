/* post comment */
function postComment()
{

	/* check if have comment-editor element */
	if ($("#comment-editor").length > 0) {

		/* load commentPost */
		$.getScript( "https://www.blogger.com/static/v1/jsbin/3262169375-comment_from_post_iframe.js", function( data, textStatus, jqxhr ) {
			BLOG_CMT_createIframe('https://www.blogger.com/rpc_relay.html');

			/* reply button */
			let iframeSrc = $("#comment-editor").data('src').split('#');
			$(".commentActionButton").on("click", function(){

				/* get form data  */
				let form = $("#commentForm"),
				/* get id from this button */
				id = $(this).data('id');

				/* build iframe from current data */
				let frame = $("#comment-editor"),
				container = (id != "addNewComment") ? $('#form-container-' + id) : $("#commentFormWrapper");
				frame.attr('src', (id != "addNewComment") ? iframeSrc[0] + '&parentID=' + id + '#' + iframeSrc[1] : iframeSrc[0] + '#' + iframeSrc[1]);

				/* toggle addNewComment */
				if (id != "addNewComment") {
					$("#addNewcomment").removeClass('d-none');
				}else{
					$("#addNewcomment").addClass('d-none');
				}

				/* send iframe */
				container.html(form);
			})
		});
	}
}	