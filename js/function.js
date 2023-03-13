function initMissionPage(){
    var id = getUrlParam("id");
    var idx = getUrlParam("idx");
    $.getJSON('./data/mission.json', function(list){
        $(list).each(function(i, series){
            if(series.id == id){
                var sel = new Array();
                sel.push('<select onChange="gotourl(this.value)">');
                $(series.data).each(function(j, mission){
                    sel.push('<option value="./');
                    sel.push(mission.page);
                    sel.push('?id=');
                    sel.push(series.id);
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
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}

function gotourl(loca) {
    parent.frames['main'].document.location = loca;
}