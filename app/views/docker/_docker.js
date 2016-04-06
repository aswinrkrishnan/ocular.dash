$(function(){
});

function getTagDetail(repo, tag){
	$.ajax({ 
      type: 'GET', 
      dataType: 'html',
      data: { repo: repo, tag: tag },
      url: 'getTagDetail', 
      success: function(data){
      	var tagDetail = JSON.parse(data)
        $("#tagDetails").modal('show');
        $("#tagDetails #repoName").text(tagDetail.name)
        $("#tagDetails #tag").text(tagDetail.tag)
        $("#tagDetails #architecture").text(tagDetail.architecture)
        var history = jQuery.parseJSON(tagDetail.history[0].v1Compatibility)
        $("#tagDetails #created").text(new Date(history.created))
        $("#tagDetails #image").text(history.Image)
        $("#tagDetails #container").text(history.container)
        $("#jobDetails #dockerVersion").text(history.docker_version)
        $("#tagDetails #os").text(history.os)
        $("#tagDetails #size").text(history.Size)
      },
      error: function() {
      	alert("ERROR")
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