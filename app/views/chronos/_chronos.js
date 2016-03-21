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
	$("#job_search").keyup(function() {
		var value = this.value;
		$("#jobList").find("tr").each(function(index) {
			if (!index) return;
			if($(this).is(":visible")){
				var id = $(this).find("td").text();
				$(this).toggle(id.indexOf(value) !== -1);
			}
		});
	});
})
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
function filterTable(value){
	if(value == 'all'){
		$('#jobList tbody tr').show();
	}else{
		$('#jobList tbody tr').show();
		$('#jobList tbody tr').hide();
		$('#jobList tr td:contains("'+value+'")').parent().toggle();
	}
}
function showJobDetails(jobDetail){
	var job = $(jobDetail).find(".jobDescription").data('job')
	$("#jobDetails").modal('show');
	$("#jobDetails #jobName").text(job.name);
	$("#jobDetails #description").text(job.description);
	$("#jobDetails #command").text(job.command);
	$("#jobDetails #owner").text(job.owner);
	$("#jobDetails #lastSuccess").text(timeDifference(job.lastSuccess));
	$("#jobDetails #successCount").text(job.successCount);
	$("#jobDetails #errorCount").text(job.errorCount);
	$("#jobDetails #lastError").text(timeDifference(job.lastError))
	$("#jobDetails #schedule").text(job.schedule)
	$('#volInfoTable').find("tr:gt(0)").remove();
	for(var i = 0; i < job.container.volumes.length; i++ ){
		var ico="";
		if(job.container.volumes[i].mode=="RO")
			ico="<i class='fa fa-lock'></i>"
		else
			ico="<i class='fa fa-unlock'></i>"
		$('#volInfoTable > tbody:last-child').append('<tr><td>'+job.container.volumes[i].hostPath+'</td><td>'+job.container.volumes[i].containerPath+'</td><td><div class="badge bg-blue">'+ico+job.container.volumes[i].mode+'</div></td></tr>');

	}
}