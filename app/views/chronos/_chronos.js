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
		var time=$( this).text().trim();
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
	$("#slider-range").slider({
		range: true,
		min: 0,
		max: 1440,
		step: 15,
		values: [0, 1440],
		slide: function (e, ui) {
			var hours1 = Math.floor(ui.values[0] / 60);
			var minutes1 = ui.values[0] - (hours1 * 60);
			if (hours1 < 10 ) hours1 = '0' + hours1;
			if (minutes1 < 10) minutes1 = '0' + minutes1;
			if (minutes1 == 0) minutes1 = '00';
			$('#slider-time').html(hours1 + ':' + minutes1);

			var hours2 = Math.floor(ui.values[1] / 60);
			var minutes2 = ui.values[1] - (hours2 * 60);

			if (hours2.length < 10) hours2 = '0' + hours2;
			if (minutes2.length < 10) minutes2 = '0' + minutes2;
			if (minutes2 == 0) minutes2 = '00';
			$('#slider-time2').html(hours2 + ':' + minutes2);
			filterDataOnTime(hours1 + ':' + minutes1, hours2 + ':' + minutes2);
		}
	});
	function filterDataOnTime(timeFrom, timeTo) {
		$('#jobList tbody tr').show();
		$( ".jobTime").each(function() {
			var time=$( this).text().split(' ')[4].trim();
			if(time == "" || time < timeFrom || time > timeTo){
				console.log(time+" -- "+timeFrom+" to  "+timeTo+"    TRUE")
				$(this).parent().parent().hide();
			}else{
				console.log(time+" -- "+timeFrom+" to  "+timeTo+"   FALSE")
			}

		});
	}

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