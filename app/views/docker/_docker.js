$(function(){
});

function getTagDetail(repo, tag){
	$.ajax({ 
      type: 'GET', 
      dataType: "json",
      url: '/getTagDetail', 
      data: {'repo' : repo, 
            'tag' : tag},
      success: function(data){
        alert(data);
      },
      complete: function() {
      	$("#jobDetails").modal('show');
      }
    });
}
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