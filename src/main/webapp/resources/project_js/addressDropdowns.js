/**
 * 
 */
 $(document).ready(function() {

     var lang= $('#langList').val();
     $.i18n().locale = lang;
    var provinceLang= lang=='en'? 'province': 'provinceKm';
    var districtLang= lang=='en'? 'district': 'districtKm';
    var communeLang= lang=='en'? 'commune': 'communeKm';
    provinceDropDown(provinceLang);
 });

 
	/*$.getJSON('./getAllProvince', function(data) {
		$('#provinceCity').empty();
		$('#provinceCity').append(html);
		for (i = 0; i < data.length; i++) {
			var html='<option value="'+data[i].province+'">'+data[i].province+'</option>';
			$('#provinceCity').append(html);	
			
		}
	});
*/

function provinceDropDown(provinceLangVal){
    var token = $("meta[name='_csrf']").attr("content");
	var header = $("meta[name='_csrf_header']").attr("content");
	let lang =$("body").attr("data-lang-param");
	var request = {
            		"lang" : lang
            	}
	$.ajaxSetup({
		headers : {
			'X-CSRF-TOKEN' : token
		}
	});
$.ajax({
url: "./getAllProvince",
dataType : 'json',
data : JSON.stringify(request),
contentType: 'application/json; charset=utf-8',
type: 'POST',
success: function(data) {
for (i = 0; i < data.length; i++){
$('<option>').val(data[i].id).text(data[i].name).appendTo('#provinceCity');
}
},
error: function() {
// Handle error
}
});
}


function getDistrict(province) {
	var provinceVal=$('#'+province).val();
	let lang =$("body").attr("data-lang-param");
	var request = {
        		"id" : provinceVal,
        		"lang":lang
        	}
	var token = $("meta[name='_csrf']").attr("content");
	var header = $("meta[name='_csrf_header']").attr("content");
	$.ajaxSetup({
		headers : {
			'X-CSRF-TOKEN' : token
		}
	});
	$.ajax({
				url : './getDistrict',
				type : 'POST',
				dataType : 'json',
				data : JSON.stringify(request),
				async: false,
				contentType : 'application/json; charset=utf-8',
				success : function(data, textStatus, jqXHR) {
					var result = data;
					$('#district').empty();
					var html='<option value="">'+$.i18n('selectdistrict')+'</option>';
					$('#district').append(html);
                    let lang =$("body").attr("data-lang-param");

                    for (i = 0; i < result.length; i++) {
                    						var html='<option value="'+result[i].id+'">'+result[i].name+'</option>';
                    						$('#district').append(html);
                    					}


},
				error : function(jqXHR, textStatus, errorThrown) {
					//////console.log("error in ajax")
				}
			});
}

function getCommune(district) {
	var districtValue=$('#'+district).val();
	let lang =$("body").attr("data-lang-param");
    	var request = {
            		"id" : districtValue,
            		"lang":lang
            	}
	var token = $("meta[name='_csrf']").attr("content");
	var header = $("meta[name='_csrf_header']").attr("content");
	$.ajaxSetup({
		headers : {
			'X-CSRF-TOKEN' : token
		}
	});
	$.ajax({
				url : './getCommune',
				type : 'POST',
				data : JSON.stringify(request),
				dataType : 'json',
				async: false,
				contentType : 'application/json; charset=utf-8',
				success : function(data, textStatus, jqXHR) {
					var result = data;
					$('#commune').empty();
					var html='<option value="">'+$.i18n('selectcommune')+'</option>';
					$('#commune').append(html);
					let lang =$("body").attr("data-lang-param");

                    for (i = 0; i < result.length; i++) {
                    						var html='<option value="'+result[i].id+'">'+result[i].name+'</option>';
                    						$('#commune').append(html);
                    					}


},
				error : function(jqXHR, textStatus, errorThrown) {
					//////console.log("error in ajax")
				}
			});
}



function getPolice(commune) {
	var communeVal=$('#'+commune).val();
	let lang =$("body").attr("data-lang-param");
        	var request = {
                		"id" : communeVal,
                		"lang":lang
                	}
	var token = $("meta[name='_csrf']").attr("content");
	var header = $("meta[name='_csrf_header']").attr("content");
	$.ajaxSetup({
		headers : {
			'X-CSRF-TOKEN' : token
		}
	});
	$.ajax({
				url : './getPolice',
				type : 'POST',
				data : JSON.stringify(request),
				dataType : 'json',
				async: false,
				contentType : 'application/json; charset=utf-8',
				success : function(data, textStatus, jqXHR) {
					var result = data;
					$('#policeStation').empty();
					var html='<option value="">'+$.i18n('selectPolice')+'</option>';
					$('#policeStation').append(html);
					 for (i = 0; i < result.length; i++) {
                    						var response='<option value="'+result[i].id+'">'+result[i].name+'</option>';
                                            $('#policeStation').append(response);
                    					}

},
				error : function(jqXHR, textStatus, errorThrown) {
					//////console.log("error in ajax")
				}
			});
}










function getVillage(current) {
	var request = {
		"communeID" : parseInt(current.value)
	}
	var token = $("meta[name='_csrf']").attr("content");
	var header = $("meta[name='_csrf_header']").attr("content");
	$.ajaxSetup({
		headers : {
			'X-CSRF-TOKEN' : token
		}
	});
	$.ajax({
				url : './getallVillage',
				type : 'POST',
				data : JSON.stringify(request),
				async: false,
				dataType : 'json',
				contentType : 'application/json; charset=utf-8',
				success : function(data, textStatus, jqXHR) {
					var result = data;
					$('#village').empty();
					var html='<option value="">'+$.i18n('selectvillage')+'</option>';
					$('#village').append(html);	
					 for (i = 0; i < result.length; i++) {
						
						var html='<option value="'+result[i].id+'">'+result[i].village+'</option>';
						$('#village').append(html);	
					} 

				},
				error : function(jqXHR, textStatus, errorThrown) {
					//////console.log("error in ajax")
				}
			});
}

