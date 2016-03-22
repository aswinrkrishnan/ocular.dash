$(function(){
	var data = JSON.parse($("#opsLogicalData").text())
	var envExists=false;
	var env = "";
	var projectArray = []
	var envMap = {};
	data.forEach(function(obj) {
		if(obj.text.startsWith("environment(")){
			if(envExists == true){
				envMap[env] = projectArray
				projectArray = []
			}
			envExists=true
			env=obj.text.replace("environment(","").replace(")(","")
		}
		if(envExists==true){
			if(obj.text.trim().startsWith("deploy("))
				projectArray.push(obj.text.replace(/([*+?^=!${}()|\[\]"\/\\])/g, '').replace('deploy',''));
		}
	});
    $("#scoringProdCount").text(envMap['env.scoring.prod'].length)
    $("#dsProdCount").text(envMap['env.datascience.prod'].length)
    
	for(var repo in envMap['env.scoring.prod']){
		project = envMap['env.scoring.prod'][repo].split(',')
		$('#scoringProdRepoList tr:last').after(
			'<tr><td>'+project[0]+'</td><td><p class="label bg-blue"><i class="fa fa-tags"></i>'+ project[1]+'</p></td></tr>'
			);
	}

	for(var repo in envMap['env.datascience.prod']){
		project = envMap['env.datascience.prod'][repo].split(',')
		$('#dsProdRepoList tr:last').after(
			'<tr><td>'+project[0]+'</td><td><p class="label bg-blue"><i class="fa fa-tags"></i>'+ project[1]+'</p></td></tr>'
			);
	}

	// for(var env in envMap){
	// 	projectArray = envMap[env];
	// 	$('#repoList tr:last').after('<tr><th>'+env+'</th></tr>');
	// 	for(var repo in projectArray){
	// 		project = projectArray[repo].split(',')
	// 		$('#repoList tr:last').after('<tr><td>'+project[0]+'</td><td>'+project[1]+'</td></tr>');
	// 	}
	// }
})
