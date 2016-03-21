$(function(){
$( "p.statusIcon").each(function() {
	var status=$( this ).text().trim();
    if(status=="success")
      $(this).addClass("label-success")
    else if(status=="failed")
      $(this).addClass("label-danger")
    else
      $(this).addClass("label-warning")
});
$( ".jobTime").each(function() {
	var time=$( this ).text().trim();
	if(time != "")
      $( this ).text(timeDifference(time).replace(" GMT+1100 (AEDT)",""))
});
function timeDifference(previous) {
    if(previous == ""){return "No Previous runs";}
    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var elapsed = new Date - new Date(previous);
    if (elapsed < msPerMinute) return Math.round(elapsed/1000) + ' seconds ago';
    else if (elapsed < msPerHour) return Math.round(elapsed/msPerMinute) + ' minutes ago';
    else if (elapsed < msPerDay ) return Math.round(elapsed/msPerHour ) + ' hours ago';
    else return new Date(previous)+"";
}
})