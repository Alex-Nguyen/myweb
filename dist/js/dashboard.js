$(document).ready(function () {
    let rows = d3.select("#publications").selectAll(".row").data(data.publications.features).enter();
    let otherRows = d3.select("#opublications").selectAll(".row").data(data.publications.otherpubs).enter();
    let rowEl = rows.append("div")
        .attr("class", "row border-bottom mt-2")
        .attr("data-date", d => d.pub_year + "-" + d.pub_month + "-" + d.pub_day)
    rowEl.append("div")
        .attr("class", "col-md-2")
        .append("img")
        .attr("itemprop", "image")
        .attr("src", d => "dist/" + d.pub_img)
        .attr("class", "img-fluid pad img-thumbnail");

    let orowEl = otherRows.append("div")
        .attr("class", "row border-bottom mt-2")
        .attr("data-date", d => d.pub_year + "-" + d.pub_month + "-" + d.pub_day)
    // orowEl.append("div")
    //     .attr("class", "col-md-2")
    //     .append("img")
    //     .attr("itemprop", "image")
    //     .attr("src", d => "dist/" + d.pub_img)
    //     .attr("class", "img-fluid pad img-thumbnail");

    let info = rowEl.append("div").attr("class", "col-md-10");
    info.append("h6").attr('class', "text-info").text((d,i) => d.pub_title).attr("itemprop", "name");
    info.append("p").attr("class", "text-left mb-1").html(d => d.pub_author).attr("itemprop", "author");
    info.append("p").attr("class", "mb-0").text(d => d.pub_proceeding).attr("itemprop", "conference");
    info.append("p").attr("class", "mb-0").attr("itemprop", "venue").text(d => d.pub_venue);
    let icons = info.append('ul').attr("class", "nav justify-content-end");
    icons.selectAll("li").data(d => d.pub_icons).enter()
        .append("li")
        .attr("class", "nav-link")
        .attr("data-toggle", "tooltip")
        .attr("title", e => e.icon_alt)
        .append("a").attr("href", e => e.icon_url)
        .attr("target", "_blank")
        .attr("alt", e => e.icon_alt)
        .attr("class", "text-secondary")
        .append("i").attr("class", e => e.icon_code)

    let oinfo = orowEl.append("div").attr("class", "col-md-12");
    oinfo.append("h6").attr('class', "text-info").text((d,i) => ++i + ". "+ d.pub_title).attr("itemprop", "name");
    oinfo.append("p").attr("class", "text-left mb-1").html(d => d.pub_author).attr("itemprop", "author");
    oinfo.append("p").attr("class", "mb-0").text(d => d.pub_proceeding).attr("itemprop", "conference");
    oinfo.append("p").attr("class", "mb-0").attr("itemprop", "venue").text(d => d.pub_venue);
    let oicons = oinfo.append('ul').attr("class", "nav justify-content-end");
    oicons.selectAll("li").data(d => d.pub_icons).enter()
        .append("li")
        .attr("class", "nav-link")
        .attr("data-toggle", "tooltip")
        .attr("title", e => e.icon_alt)
        .append("a").attr("href", e => e.icon_url)
        .attr("target", "_blank")
        .attr("alt", e => e.icon_alt)
        .attr("class", "text-secondary")
        .append("i").attr("class", e => e.icon_code);



    let reviews = d3.select("#reviewer")
        .selectAll("p")
        .data(data.reviewer)
        .enter();
    let text = reviews.append("p")
        .attr("data-toggle", "tooltip")
        .attr("title", d => d.conf_long)
        .on('mouseover', function (d) {
            d3.select(this).classed("bg-info", true)
        })
        .on('mouseleave', function () {
            d3.select(this).classed("bg-info", false)
        });
    text.text(d => d.conf_short);
    text.append("span").attr("class", "float-right").text(d => d.conf_venue);

    let parseTime = d3.timeParse("%Y-%m-%d");
    $('#pub_sort_asc').on('click', function (event) {

        d3.selectAll("#publications div.row")
            .datum(function () {
                return this.dataset;
            })
            .sort(function (a, b) {
                return d3.ascending(parseTime(a.date), parseTime(b.date));
            })
    });
    $('#pub_sort_asc_o').on('click', function (event) {

        d3.selectAll("#opublications div.row")
            .datum(function () {
                return this.dataset;
            })
            .sort(function (a, b) {
                return d3.ascending(parseTime(a.date), parseTime(b.date));
            })
    });
    $("#feature_pub").text(`Feature Publications (${data.publications.features.length})`)
    $("#other_pub").text(`Other Publications (${data.publications.otherpubs.length})`)
    $('#pub_sort_desc').on('click', function (event) {
        d3.selectAll("#publications div.row")
            .datum(function () {
                return this.dataset;
            })
            .sort(function (a, b) {
                return d3.descending(parseTime(a.date), parseTime(b.date));
            });
    });
    $('#pub_sort_desc_o').on('click', function (event) {
        d3.selectAll("#opublications div.row")
            .datum(function () {
                return this.dataset;
            })
            .sort(function (a, b) {
                return d3.descending(parseTime(a.date), parseTime(b.date));
            });
    });
    $('[data-toggle="tooltip"]').tooltip();


});
