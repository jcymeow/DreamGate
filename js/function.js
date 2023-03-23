var DATA = {
    MISSION : new URL(/DreamGate/js/data/mission.json)
}

function initMissionMenu() {
    $('#menu4').empty();
    var links = new Array();
    $.getJSON(DATA.MISSION, function (list) {
        $(list).each(function kk(i, series) {
            links.push('<a href="')
            links.push(series.path);
            links.push(series.data[0].page);
            links.push('?index=');
            links.push(i);
            links.push('">');
            links.push(series.name);
            links.push('</a><br>');
        });
        $('#menu4').append(links.join(''));
    });
    
}

function initMissionPage(){
    var index = getUrlParam("index");
    var idx = getUrlParam("idx") || 0;
    $.getJSON(DATA.MISSION, function(list){
        $(list).each(function(i, series){
            if(index == i){
                var sel = new Array();
                sel.push('<select onChange="gotourl(this.value)">');
                $(series.data).each(function(j, mission){
                    sel.push('<option value="');
                    sel.push(series.path);
                    sel.push(mission.page);
                    sel.push('?index=');
                    sel.push(i);
                    sel.push('&idx=');
                    sel.push(j)
                    sel.push('" ');
                    if(j == idx){
                        sel.push(' selected="selected" ');
                    }
                    sel.push('>');
                    sel.push(mission.name);
                    sel.push('</option>');
                });
                sel.push('</select>');
                $("#crumb").html(sel.join(''));
            }
        });
    })
}

function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substring(1).match(reg);
    if (r != null) return decodeURI(r[2]); return null;
}

function gotourl(loca) {
    parent.frames['main'].document.location = loca;
}