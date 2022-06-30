var allrelatedfeedorigin = new Array;

function removetag(e, t) {
    for (var i = e.split("<"), n = 0; n < i.length; n++) - 1 != i[n].indexOf(">") && (i[n] = i[n].substring(i[n].indexOf(">") + 1, i[n].length));
        return i = (i = i.join("")).substring(0, t - 1)
}

function extractfeed(e) {
    var t = e.feed.entry,
    n = t.length,
    r = new Array;
    for (r[1] = "Jan", r[2] = "Feb", r[3] = "Mar", r[4] = "Apr", r[5] = "May", r[6] = "Jun", r[7] = "Jul", r[8] = "Aug", r[9] = "Sep", r[10] = "Oct", r[11] = "Nov", r[12] = "Dec", i = 0; i < n; i++) {
        var a, l = t[i].title.$t,
        s = t[i].published.$t,
        u = s.substring(0, 4),
        o = s.substring(5, 7),
        f = s.substring(8, 10),
        g = (s.substring(11, 16), f + " " + r[parseInt(o, 10)] + "," + u);
        "summary" in t[i] ? a = t[i].summary.$t : "content" in t[i] && (a = t[i].content.$t);
        var m = removetag(a, 150);
        if ("media$thumbnail" in t[i]) h = (h = t[i].media$thumbnail.url).replace("/s72-c/", "/s210/");
        else var h = "https://1.bp.blogspot.com/-P6sIgHwSrZU/XrncUn1POBI/AAAAAAAABK4/cpGgDNNzCuIDFXn5Uqmey4qh23efe-f_QCLcBGAsYHQ/s210/no-image-compress.jpg";
        for (var c = h, v = 0; v < t[i].link.length; v++) {

            if ("alternate" == t[i].link[v].rel) {
                var A = t[i].link[v].href;
                break
            }
        }
        var b = t[i].author[0].name.$t;
        allrelatedfeedorigin.push({
            title: l,
            link: A,
            images: c,
            author: b,
            date: g,
            snippet: m
        }), 0
    }
}

function shuffle(e) {
    for (var t, i, n = e.length; 0 !== n;) i = Math.floor(Math.random() * n), t = e[n -= 1], e[n] = e[i], e[i] = t;
        return e
}
const removeDupliactes = e => {
    let t = e.map(e => Object.values(e).join(""));
    return e.filter((e, i) => t.indexOf(t[i]) === i)
};

function createrelated(){
    var maxrelated = 5;
    write = document.getElementById('related-post-write');
    var allrelatedfeed = shuffle(removeDupliactes(allrelatedfeedorigin));
    var allrelatedfeedlength = allrelatedfeed.length;
    var url_path = location.protocol + '//' + location.host + location.pathname;
    for (var xx = 0; xx < allrelatedfeedlength; xx++) {
        if (allrelatedfeedlength != 1 && allrelatedfeed[xx].link !== url_path) {
            $("#related-post-title-write").removeClass('u-hidden-visually');
        }
        if (allrelatedfeed[xx].link !== url_path) {
            html = '<div class="col-lg-4 col-md-6 col-sm-12 col-12 u-ph-xsmall u-mb-xsmall">';
            html += '<article class="c-event u-m-zero u-p-zero">';
            html += '<div class="c-event__img u-m-zero u-hidden-down@mobile">';
            html += '   <a href="'+allrelatedfeed[xx].link+'" title="'+allrelatedfeed[xx].title+'" style="display:grid">';
            html += '       <img src="data:image/svg+xml,%3Csvg xmlns=&apos;http://www.w3.org/2000/svg&apos; viewBox=&apos;0 0 3 2&apos;%3E%3C/svg%3E" class="c-post-image" data-src="'+allrelatedfeed[xx].images+'" alt="'+allrelatedfeed[xx].title+'"/>';
            html += '   </a>';
            html += '</div>';
            html += '<div class="c-event__meta u-ph-small u-pt-xsmall related-cards-title" data-mh="related-cards">';                                                           
            html += '<a class="c-post-title-link" href="'+allrelatedfeed[xx].link+'" title="'+allrelatedfeed[xx].title+'">';
            html += '   <h2 class="c-event__title">';
            html +=         allrelatedfeed[xx].title;
            html += '   </h2>';
            html += '</a>';
            html += '</div>';
            html += '</div>';
            html += '</div>';
            write.insertAdjacentHTML('beforeend', html)
            if (xx >= maxrelated) {
                break;
            }
            /* end if maxrelated */
        }
        /* if not this post */
    }
    /* end for */
}
