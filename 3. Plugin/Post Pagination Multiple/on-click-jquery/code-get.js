$('#linkloadmore').on('click',function(event){
    event.preventDefault();
    var elload = $("#Blog1_pagination-old");
    var link = elload.attr('href');
    var alreadyClicked = elload.data('clicked');
    if (alreadyClicked) {
        return false;
    }
    elload.data('clicked', true);
    $('#linkloadmore a span').html('Loading...');
    $.get(link,function(data) {
        var source = $(data).find('.blog-posts').length ? $(data) : $('<div></div>');
        $(".blog-posts").append(source.find('.blog-posts').html());
        var clone = source.find('#Blog1_pagination-old').clone();

        if (clone.html() === undefined) {
            $(".linkloadmore").html('<div class="alert alert-warning"><i class="fa fa-info-circle fa-fw"/>Empty Post</div>'); 
        }else {  
            $("#linkloadmore").html(clone);
        }

        elload.data('clicked', false);
    }, "html");
}) 