d3.json("data/publications.json", function (error, pubs) {
    if (error) throw error;
    //Reviewer section
    d3.select("#total_reviews").text(function () {
        return d3.sum(pubs.reviewer,function (d) {
            return d.conf_papers;
        });
    });
    var table_tbody = d3.select("#reviewer").selectAll("tr").data(pubs.reviewer).enter().append("tr");
   
    var table_conf = table_tbody.append("td").attr("data-toggle","tooltip").attr("itemprop","reviewer").attr("title",function (d) {
        return d.conf_long;
    }).text(function (d) {
        return d.conf_short;
    });
    var table_total = table_tbody.append("td").text(function (d,i) {
        return d.conf_papers;
    });
	 var table_year = table_tbody.append("td").attr("scope","row").text(function (d,i) {
        return d.conf_venue;
    });

    // Publication section
    d3.select("#pub_count").text(function () {
        return pubs.publications.length;
    });
    var container = d3.select("#publications").selectAll(".item")
        .data(pubs.publications)
        .enter();
    var rows = container.append("div").attr("class", "row border-bottom publications").attr("data-date",function (d) {
        return d.pub_year +"-"+d.pub_month+"-"+d.pub_day;
    });

    var item_image = rows.append("div")
        .attr("class", "col-md-3")
        .append("img").attr("itemprop", "image").attr("height","250").attr("width","480")
        .attr("class", "img-fluid")
        .attr("src", function (d) {
            return d.pub_img;
        });
    var item_description = rows.append("div").attr("class", "col-md-9");
    var item_title = item_description.append("h6").attr("itemprop", "name").text(function (d) {
        return d.pub_title;
    });
    var item_author = item_description.append("h7").attr("itemprop", "author").append("i").html(function (d) {
        return d.pub_author;
    });
    var item_des_detail = item_description.append("div").attr("itemprop", "conference").append("p").text(function (d) {
        return d.pub_proceeding;
    }).append("p").attr("itemprop", "venue").text(function (d) {
        return d.pub_venue;
    });

    var item_icon = item_description.append("ul").attr("class", "text-right list-inline");
    var item_li = item_icon.selectAll("li").data(function (d) {
        return d.pub_icons;
    }).enter().append("li").attr("data-toggle","tooltip").attr("title",function (e) {
        return e.icon_alt;
    }).attr("class", "list-inline-item").append("a").attr("alt", function (d) {
        return d.icon_alt;
    }).attr("target", "_blank").attr("class", "icon-links").attr("itemprop", "sameAs").attr("href", function (d) {
        return d.icon_url;
    }).append("i").attr("class", function (d) {
        return d.icon_code;
    });
    var parseTime = d3.timeParse("%Y-%m-%d");
    $( '#pub_sort_asc' ).on( 'click', function( event ) {

        d3.selectAll("#publications div.row")
            .datum(function() { return this.dataset; })
            .sort(function(a, b) { return d3.ascending(parseTime(a.date), parseTime(b.date)); })
    });
    $( '#pub_sort_desc' ).on( 'click', function( event ) {
        d3.selectAll("#publications div.row")
            .datum(function() { return this.dataset; })
            .sort(function(a, b) { return d3.descending(parseTime(a.date),parseTime(b.date)); });
    });
    $('[data-toggle="tooltip"]').tooltip();
});