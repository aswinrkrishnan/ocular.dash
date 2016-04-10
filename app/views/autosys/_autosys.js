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
		var time=$(this).text().trim();
		if(time != "")
			$( this ).text(timeDifference(time).replace(" GMT+1100 (AEDT)",""))
	});
	$( ".jobActualTime").each(function() {
		var time=$(this).text().trim();
		if(time != "")
			$( this ).text(new Date(time))
	});
	$("#jobPrefix-btn").click(function(){
		var keyword = $("#jobPrefix").val()//.replace("%","%25")
		window.location.href = 'index?'+$.param({'keyword':keyword});
	});

	$("#job_search").keyup(function() {
		removeSelectionInfoBox()
		var value = this.value;
		$("#jobList").find("tr").each(function(index) {
			if (!index) return;
			var id = $(this).find("td").text();
			$(this).toggle(id.indexOf(value) !== -1);
		});
	});

	$(".autosysJobName").click(function(){
		getJobRunDetail($(this).text())
		
	});
	
	function getJobRunDetail(jobName){
		$.ajax({
			type: 'GET', 
			dataType: 'html',
			url: 'getJobRunDetail', 
			data: { jobName: jobName},
			beforeSend: function(){$("#load-screen").show();},
			success: function(data){
				$("#jobDetails #jobName").text(jobName);
				$("#load-screen").hide();
				loadModal();
				var job = JSON.parse(data);
				$('#jobDetailsTable').find("tr:gt(0)").remove();
				for(var i = 0; i < job.length; i++ ){
					$('#jobDetailsTable > tbody:last-child').append('<tr><td>'+job[i].mode+'</td><td>'+job[i].start+'</td><td>'+job[i].end+'</td><td>'+job[i].machine+'</td><td>'+job[i].status+'</td></tr>');
				}
				getPreviousRuns(jobName)
			},
			error: function() {
				alert("ERROR")
			}
		});
	}

	function getPreviousRuns(jobName){
		$.ajax({ 
			type: 'GET', 
			dataType: 'html',
			data: { jobName: jobName},
			url: 'jobPreviousRuns', 
			success: function(data){
				var job = JSON.parse(data)
				$('#jobPreviousRuns').find("tr:gt(0)").remove();
				for(var i = 0; i < job.length; i++ ){
					if(job[i].status == 'SU')
						statusIcon = '<p class="statusIcon label label-success">success</p>'
					else if(job[i].status == 'FA')
						statusIcon = '<p class="statusIcon label label-danger">failed</p>'
					else if(job[i].status == 'OH')
						statusIcon = '<p class="statusIcon label label-warning">on-hold</p>'
					else
						statusIcon = '<p class="statusIcon label label-warning">idle</p>'
					$('#jobPreviousRuns > tbody:last-child').append('<tr><td>'+job[i].start+'</td><td>'+job[i].end+'</td><td>'+statusIcon+'</td></tr>');
				}
				loadJobDesc(jobName)
			},
			error: function() {
				alert("ERROR")
			}
		});
	}
	function loadJobDesc(jobName){
		$.ajax({
			type: 'GET', 
			dataType: 'html',
			url: 'getJobDesc', 
			data: { jobName: jobName},
			success: function(data){
				var job = JSON.parse(data);
				$('#jobDescTable').find("tr:gt(0)").remove();
				for(var i = 0; i < job.length; i++ ){
					$('#jobDescTable > tbody:last-child').append('<tr><td>'+job[i][0]+'</td><td>'+job[i][1]+'</td></tr>');
				}
			},
			error: function() {
				alert("ERROR")
			}
		});
	}

	function loadModal(){
		$("#jobDetails .nav-tabs-custom li").removeClass("active");
		$("#jobDetails .nav-tabs-custom li#detailTab").addClass("active");
		$("#jobDetails .tab-content>div").removeClass("active");
		$("#jobDetails .tab-content #jobDetailsPane").addClass("active");
		$("#jobDetails").modal('show');
	}

	$("#slider-range").slider({
		range: true,
		min: 0,
		max: 1440,
		step: 15,
		values: [0, 1440],
		slide: function (e, ui) {
			$('#jobList tbody tr').show();
			var hours1 = Math.floor(ui.values[0] / 60);
			var minutes1 = ui.values[0] - (hours1 * 60);
			if (hours1 < 10 ) hours1 = '0' + hours1;
			if (minutes1 < 10) minutes1 = '0' + minutes1;
			if (minutes1 == 0) minutes1 = '00';
			$('#slider-time').html(hours1 + ':' + minutes1);

			var hours2 = Math.floor(ui.values[1] / 60);
			var minutes2 = ui.values[1] - (hours2 * 60);
			if (hours2 < 10) hours2 = '0' + hours2;
			if (minutes2.length < 10) minutes2 = '0' + minutes2;
			if (minutes2 == 0) minutes2 = '00';
			$('#slider-time2').html(hours2 + ':' + minutes2);
			filterDataOnTime(hours1 + ':' + minutes1+":00", hours2 + ':' + minutes2+":00");
		}
	});
	function filterDataOnTime(timeFrom, timeTo) {
		$( ".jobDetailList").each(function() {
			var startTime=$(this).find('.startTime').text().split(' ')[1].trim()+"";
			var endTime=$(this).find('.endTime').text().split(' ')[1].trim()+"";
			console.log(startTime+" - "+endTime+" => "+timeFrom+" - "+timeTo)
			if(startTime == "" || ((startTime < timeFrom || startTime > timeTo) && (endTime < timeFrom || endTime > timeTo))){
				$(this).hide();
			}
		});
	}
	$("#timeFilter").click(function(){
		$("#timeSlider").slideToggle();
		$("#slider-range").slider('values',0,0);
		$("#slider-range").slider('values',1,1440); 
		$('#slider-time').html('00:00');
		$('#slider-time2').html('24:00');
	});

	function removeSelectionInfoBox(){
		$(".info-box").removeClass("bg-green");
		$(".info-box").removeClass("bg-red");
		$(".info-box").removeClass("bg-yellow");
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

function removeSelectionInfoBox(){
	$(".info-box").removeClass("bg-green");
	$(".info-box").removeClass("bg-red");
	$(".info-box").removeClass("bg-yellow");
}
function resetSlider(){
	$("#slider-range").slider('values',0,0);
	$("#slider-range").slider('values',1,1440); 
	$('#slider-time').html('00:00');
	$('#slider-time2').html('23:59');
}
function showAllJobs(){
	$('#jobList tbody tr').show();
}
function filterTable(value, e){
	if(value == 'all'){
		resetSlider()
		removeSelectionInfoBox();
		$('#jobList tbody tr').show();
	}else{
		if(value == 'failed'){
			if($(e).children(".info-box").hasClass("bg-red")){
				removeSelectionInfoBox();
				showAllJobs();
			}
			else{
				$(e).children(".info-box").addClass("bg-red");	
				$('#jobList tr:not(:contains("'+value+'"))').hide();

			}
		}
		else if(value == 'success'){
			if($(e).children(".info-box").hasClass("bg-green")){
				removeSelectionInfoBox();
				showAllJobs();
			}
			else{
				$(e).children(".info-box").addClass("bg-green");	
				$('#jobList tr:not(:contains("'+value+'"))').hide();

			}
		}
		else{
			if($(e).children(".info-box").hasClass("bg-yellow")){
				removeSelectionInfoBox();
				showAllJobs();
			}
			else{
				$(e).children(".info-box").addClass("bg-yellow");	
				$('#jobList tr:not(:contains("idle") || tr:not(:contains("on-hold"))').hide();

			}
		}
		
	}
}

function downloadLog(fileName,logType,timeSuffix){
	$.ajax({
		type: 'GET', 
		dataType: 'html',
		url: 'getJobLog', 
		data: { 'fileName': fileName, 'logType': logType, 'timeSuffix':timeSuffix},
		beforeSend: function(){$("#load-screen").show();},
		success: function(data){
			$("#load-screen").hide();
			if(data == "")
				alert("Log file is empty");
			else if(data == "No_File_found")
				alert("Log file not found");
			else{
				var blob=new Blob([data]);
				var link=document.createElement('a');
				link.href=window.URL.createObjectURL(blob);
				link.download=fileName+"."+logType+timeSuffix;
				link.click();
			}
		},
		error: function() {
			alert("ERROR")
		}
	});
}

function showJobDetails(jobDetail){
	alert(jobDetail.html);
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