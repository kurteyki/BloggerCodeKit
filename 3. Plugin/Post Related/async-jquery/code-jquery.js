/* load after scroll on post-detail */
let postRelatedOuter = $(".post-detail"), postRelatedHasLoaded = 0;
if (postRelatedOuter.length > 0) {	
	$(window).on("load scroll", function() {
		var height = postRelatedOuter.outerHeight();
		if(($(window).scrollTop() + $(window).height()) >= height && !postRelatedHasLoaded) {

			/* set postRelatedHasLoaded */
			postRelatedHasLoaded = 1;

			/* load recentPost */
			postRelated();

		}
	});						
}

/* related post */
function postRelated()
{
	const postRelated = $("#postRelated"),
	recentPostLimit = postRelated.data('limit'),				
	recentPostId = postRelated.data('id'),			
	postRelatedTitle = postRelated.data('title');

	/* check if have postRelated element */
	if(postRelated.length > 0) {

		/* split labels */
		const postLabels = postRelated.data('labels').split(',');

		/* check labels length */			
		if (postLabels.length < 1) {
			/* remove loading */
			postRelated.remove();
			return false;
		}

		/* first give animation */
		postRelated.html(`
			<div class="text-center py-3"><div class="spinner-grow text-primary" role="status">
			<span class="visually-hidden">Loading...</span>
			</div></div>
			`);

		/* define variable for temp data */
		let async_request=[],
		responses=[];

		/* lets request all feed label */
		$.each(postLabels, function(i, label){					
			async_request.push($.ajax({
				url:"/feeds/posts/default/-/"+ label + "?alt=json-in-script&max-results=5&callback=?", 
				method:'get',
				dataType: 'jsonp',
				success: function(data){
					/* push data to response variable */
					responses.push(data);
				}
			}));
		})

		/* after all request done > extract data */
		$.when.apply(null, async_request).done( function(){
			let posts = [],
			known = {};
			$.each(responses, function(i, response){
				$.each(response.feed.entry, function(i, post){
					let data = [];						
					data.id = post.id.$t.substr(post.id.$t.indexOf("post-") + 5);
					data.title = post.title.$t;


					/* get date as format */
					const dateFormat =  data => {
						let format_moth = ["January","February","March","April","May","June","July","August","September", "October", "November", "December"];
						let date = new Date(data),
						day = date.getDate(),
						month = format_moth[date.getMonth()],
						year = date.getFullYear();
						return `${month} ${day}, ${year}`;
					};

					data.published = dateFormat(post.published.$t);
					data.updated = dateFormat(post.updated.$t);

					/* get post url */
					$.each(post.link, function(i, link){
						if (link.rel == "alternate") {
							/* set post url */
							data.url = link.href;
						}
					})

					if (post.media$thumbnail) {
						data.image = post.media$thumbnail.url.replace("/s72-c/","/w150/");
					}else{
						data.image = 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj3Ia32aeortEtnG6libJiXjj6It8o5ikSjQEaPSvLK09ORfnWovo0FQX25VeAB-cSySlozaol3LZ-9C7BVpfeMMcxtEE7SxW-BCLVX4wwywof7kiBCp8nsHbre7ScleqehuZzY0G17M1mBV1H-KzYd1QW098SZzEAHE0GecLG5u2ULhnEYtKTsWUMp/w300/no-image.jpg';
					}

					posts.push(data);
				})	
			})

			/* console.info(posts); */

			/* filter posts from current post */
			posts = posts.filter(function(post) {  
				return post.id !== recentPostId; 
			}); 

			/* filter posts from duplicate post by id */
			const removeDupliactes = e => {
				let t = e.map(e => Object.values(e).join(""));
				return e.filter((e, i) => t.indexOf(t[i]) === i)
			};
			posts = removeDupliactes(posts);

			/* random posts */	
			const shuffle = e => {
				for (var t, i, n = e.length; 0 !== n;) i = Math.floor(Math.random() * n), t = e[n -= 1], e[n] = e[i], e[i] = t;
					return e
			};		
			posts = shuffle(posts);

			/* limit posts */
			posts = posts.slice(0, recentPostLimit);

			/* console.info(posts); */

			/* then build data with unique posts */
			if (posts.length > 0) {					
				let postRelatedHtml = `<div class="list-group rounded-0 w-auto px-3 px-md-4 py-2">
				<strong class="fs-4 mb-2">
				${postRelatedTitle}
				</strong>`;
				$.each(posts, function(i, post) {						
					postRelatedHtml += `										
					<a class="post-card list-group-item list-group-item-action d-flex align-items-center gap-3 p-0" href="${post.url}">
					<div class="post-image">
					<img src="${post.image}"/>
					</div>
					<div class="d-flex flex-column py-2">
					<h2 class="post-title m-auto py-2">${post.title}</h2>
					<small class="post-date">
					${post.published}
					</small>
					</div>
					</a>
					`;
				})
				postRelatedHtml += `</div>`;

				/* send to DOM */
				postRelated.html(postRelatedHtml);
			}else{
				/* remove postRelated */
				postRelated.remove();				
			}
		});

	}
}	