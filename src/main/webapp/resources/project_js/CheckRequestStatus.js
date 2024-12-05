
	/**
 *
 */
 $(document).ready(function() {

    var lang= $('#langList').val();
  //  $.i18n().locale = lang;
});
 var otpVerifyLimit=3;
 var otpTry=1;
 var resendCount=1;
 var timeLeft;
 	var elem;
 	var timerId ;

$.i18n().load({
    'en' : './resources/i18n/en.json',
    'km' : './resources/i18n/km.json'
}).done(function() {
});


	document.getElementById("resendOTPclick").addEventListener('click',function ()
{

    resendOTP();
   }  );

   document.getElementById("cancelRequestresendOTPclick").addEventListener('click',function ()
   {
   	resendCancelOTP();
      }  );

   $.getJSON('./getDropdownList/category', function(data) {
			for (i = 0; i < data.length; i++) {
				$('<option>').val(data[i].value).text(data[i].interpretation)
				.appendTo('#category');
				//////console.log("...........");
			}
		});
		 $.getJSON('./getDropdownList/nationality', function(data) {
			for (i = 0; i < data.length; i++) {
				$('<option>').val(data[i].value).text(data[i].interpretation)
				.appendTo('#ownerNationality');
				//////console.log("...........");
			}
		});

		$.getJSON('./getDropdownList/device_type_tag', function(data) {
                			for (i = 0; i < data.length; i++) {
                				$('<option>').val(data[i].value).text(data[i].interpretation)
                				.appendTo('#deviceType');
                				//////console.log("...........");
                			}
                		});

                $.getJSON('./brandName', function(data) {
                        			for (i = 0; i < data.length; i++) {
                        				$('<option>').val(data[i].brandName).text(data[i].brandName)
                        				.appendTo('#stolenDeviceBrand');
                        				//////console.log("...........");
                        			}
                        		});


                 $.getJSON('./getCountryCode', function(data) {
                                 			for (i = 0; i < data.length; i++) {
                                 				$('<option>').val(data[i].phoneCode).text(data[i].phoneCode)
                                                 .appendTo('#contactCountryCode');

                                 			}
                                 		});



   function closeModal(id){
	$('#'+id).closeModal();
}
$('div#initialloader').delay(500).fadeOut('slow');





function submitCheckDeviceRequest(){

	var recaptcha=$("#g-recaptcha-response").val();
		if(recaptcha===""){

 		   $("#errorMsgOnModal").css("display", "block");
 		   return false;
 		}
		$('div#initialloader').fadeIn('fast');
		$("#recoveryFoundButton").prop('disabled', true);
		var recoveryRequestID=$('#recoveryRequestID').val();
		var recoverycontactNumber=$('#recoverycontactNumber').val();
		if (recoverycontactNumber.startsWith('0')) {
                // Remove the leading '0'
                console.log("zerofound");
                recoverycontactNumber = recoverycontactNumber.slice(1);
            }
		const prefix = '855';
           // Check if the number already starts with the prefix '855'
            if (!recoverycontactNumber.startsWith(prefix)) {
                // If it does not start with '855', prepend '855' to the number
                recoverycontactNumber = prefix + recoverycontactNumber;
            }

		var request={
			"requestId":recoveryRequestID,
			"contactNumberForOtp":recoverycontactNumber,
			}
	var formData;
	formData = new FormData();
	formData.append('request', JSON.stringify(request));
	var token = $("meta[name='_csrf']").attr("content");
			 var header = $("meta[name='_csrf_header']").attr("content");
			 $.ajaxSetup({
			 headers:
			 { 'X-CSRF-TOKEN': token }
			 });
			 $.ajax({
				url: './checkRequestStatus',
				type: 'POST',
				data: formData,
				processData: false,
				contentType: false,
				success: function (data, textStatus, jqXHR) {
				    var tableDetails=data.data;
				    var statusCode=data.statusCode;
					if(statusCode=="200" && data.data.length !==0 )
					{

					$('#unblockContactNumber').val(data.data[0].contactNumber);
						var status=data.data[0].status;
					var request_type=data.data[0].requestType
					$('div#initialloader').delay(500).fadeOut('slow');
						$("#RecoveryFormBlock").css("display", "none");
						$("#blockedDatatable").css("display", "block");

						 var table = $('#data-table').DataTable({
                          data: data.data,
                          "searching": false,
        "bPaginate": false,
         "bInfo" : false,
         "ordering": false,
           					 columns: [
                				{ data: null},
                				{ data: 'createdOn' },
               					{ data: 'requestId' },
             				    { data: 'requestType' },
             				    { data: 'deviceType' },
                                { data: 'deviceBrand' },
                                { data: 'deviceModel' },
                                { data: 'userStatus' },
                                {
                				    // Action column for unblock icon
                  				  data: 'requestId',
                  				  render: function(data, type, row) {

                                                    // Find the specific item in tableDetails that matches the current row's requestId
                                                   let item = tableDetails.find(item => item.requestId === row.requestId);
                                                if (item) {
                                                       if (item.status === "INIT" && item.requestType === "Stolen") {
                                                           console.log("1");
                                                           return '<div class="card-action"><a class="nav-link dropdown-toggle text-center p-0" data-toggle=dropdown>︙</a><div class="dropdown-menu dropdown-menu-right"><a id="editStolenRequestId" class="dropdown-item" ><img src="./resources/assets/images/edit-icon.svg" alt="icon" class="img-fluid">' + $.i18n('requestEdit') + '</a><br><a id="cancelRequestId" class="dropdown-item " ><img src="./resources/assets/images/cancel-Icon.svg" alt="icon" class="img-fluid cnl">' + $.i18n('requestCancel') + '</a></div></div>';
                                                       } else if ((item.status === 'DONE' || item.status === 'Cancel') && item.requestType === "Stolen") {
                                                           console.log("2");
                                                           return '<div class="card-action"><a class="nav-link dropdown-toggle text-center p-0" style="pointer-events: none;color: darkgrey" data-toggle=dropdown>︙</a><div class="dropdown-menu dropdown-menu-right"><a style="pointer-events: none;color: darkgrey" id="editStolenRequestId" class="dropdown-item" ><img src="./resources/assets/images/edit-icon.svg" alt="icon" class="img-fluid">' + $.i18n('requestEdit') + '</a><br><a id="cancelRequestId" style="pointer-events: none; color: darkgrey" class="dropdown-item " ><img src="./resources/assets/images/cancel-Icon.svg" alt="icon" class="img-fluid cnl">' + $.i18n('requestCancel') + '</a></div></div>';
                                                       } else if ((item.status !== 'DONE') && item.requestType === "Stolen") {
                                                           console.log("3");
                                                           return '<div class="card-action"><a class="nav-link dropdown-toggle text-center p-0" data-toggle=dropdown>︙</a><div class="dropdown-menu dropdown-menu-right"><a id="editStolenRequestId" style="pointer-events: none;color: darkgrey" class="dropdown-item" ><img src="./resources/assets/images/edit-icon.svg" alt="icon" class="img-fluid">' + $.i18n('requestEdit') + '</a><br><a id="cancelRequestId" class="dropdown-item " style="pointer-events: none;color: darkgrey" class="dropdown-item" ><img src="./resources/assets/images/cancel-Icon.svg" alt="icon" class="img-fluid cnl">' + $.i18n('requestCancel') + '</a></div></div>';
                                                       } else if (item.requestType === "RECOVER") {
                                                           console.log("4");
                                                           return '<div class="card-action"><a class="nav-link dropdown-toggle text-center p-0" style="pointer-events: none;color: darkgrey" data-toggle=dropdown>︙</a><div class="dropdown-menu dropdown-menu-right"><a style="pointer-events: none;color: darkgrey" id="editStolenRequestId" class="dropdown-item" ><img src="./resources/assets/images/edit-icon.svg" alt="icon" class="img-fluid">' + $.i18n('requestEdit') + '</a><br><a id="cancelRequestId" class="dropdown-item " ><img src="./resources/assets/images/cancel-Icon.svg" alt="icon" class="img-fluid cnl">' + $.i18n('requestCancel') + '</a></div></div>';
                                                       }
                                                       console.log("+++");
                                                   }
 								}
                				}
                				],
                				"columnDefs": [{
                  				   "targets": 0, // Target the first column (index 0)
            					   "render": function(data, type, row, meta) {
               					  // Render sequential numbers
               					  	 return meta.row + 1;
            }
        }]
        });

					}
					else if(statusCode=="201"){

						 //$("#invalidPairBlock").css("display", "block");
						 var modalBackdrop = document.getElementsByClassName("modalBackdrop")[0];
						// modalBackdrop.style.display = "block";
						 $('#invalidPairBlock').openModal({dismissible:false});
						 $("#recoveryFoundButton").prop('disabled', false);


						  $('div#initialloader').delay(500).fadeOut('slow');
					}
					else if(statusCode=="202"){

						var modalBackdrop = document.getElementsByClassName("modalBackdrop")[0];
						// modalBackdrop.style.display = "block";
						 $('#alreadyUnBlocked').openModal({dismissible:false});
						 $("#recoveryFoundButton").prop('disabled', false);
						  $('div#initialloader').delay(500).fadeOut('slow');
					}

					if(statusCode=="200" && data.data.length ===0)
					{
						var modalBackdrop = document.getElementsByClassName("modalBackdrop")[0];
						// modalBackdrop.style.display = "block";
						 $("#recordNotFound").openModal({dismissible:false});
						 $("#recoveryFoundButton").prop('disabled', false);

					}
					//sessionStorage.removeItem("nationalId");
				},
				error: function (jqXHR, textStatus, errorThrown) {
					////console.log("error in ajax")

				}
			});
			return false;

			 }

	function resendOTP(){
	var formData;
	var otpRequestID=$('#OTPRequestId').val();
	lang= $('#langList').val();
	$('#saveConfirmationMessage').openModal({dismissible:false});
	setTimeout(function() {
  		$('#saveConfirmationMessage').closeModal({
    	dismissible: false
      	});
	 }, 3000);
	 document.getElementById("resendOTPclick").style.pointerEvents = "none";
	 $('#resendOTPclick').css("color","#807a8759");


	var request={

				"requestID":otpRequestID,
				"lang":$('#langList').val()
			}
	formData = new FormData();
					formData.append('request', JSON.stringify(request));
			 var token = $("meta[name='_csrf']").attr("content");
			 var header = $("meta[name='_csrf_header']").attr("content");
			 $.ajaxSetup({
			 headers:
			 { 'X-CSRF-TOKEN': token }
			 });
			 $.ajax({
				url: './resendOTPRequest',
				type: 'POST',
				data: formData,
				processData: false,
				contentType: false,
				success: function (data, textStatus, jqXHR) {
					console.log("sucess"+data);
					var statusCode=data.statusCode;
					if(statusCode=="200")
					{
						$('#OtpBox1').val('');
						$('#OtpBox2').val('');
						$('#OtpBox3').val('');
						$('#OtpBox4').val('');
						$('#OtpBox5').val('');
						$('#OtpBox6').val('');
						timeLeft=$("body").attr("data-timeout");
    					elem = document.getElementById('recoverycountdown');
    					elem.innerHTML = timeLeft;
						timerId = setInterval(countdown, 1000);
						countdown();
						}

					 $('div#initialloader').delay(500).fadeOut('slow');
				},
				error: function (jqXHR, textStatus, errorThrown) {
					////console.log("error in ajax")

				}
			});
			return false;
	}

	function resendCancelOTP(){
    	var formData;
    	var otpCancelRequestID=$('#cancelOTPRequestId').val();
    	lang= $('#langList').val();
    	$('#saveConfirmationMessage').openModal({dismissible:false});
    	setTimeout(function() {
      		$('#saveConfirmationMessage').closeModal({
        	dismissible: false
          	});
    	 }, 3000);
    	 document.getElementById("cancelRequestresendOTPclick").style.pointerEvents = "none";
    	 $('#cancelRequestresendOTPclick').css("color","#807a8759");
    	var request={

    				"requestID":otpCancelRequestID,
    				"lang":$('#langList').val()
    			}
    	formData = new FormData();
    					formData.append('request', JSON.stringify(request));
    			 var token = $("meta[name='_csrf']").attr("content");
    			 var header = $("meta[name='_csrf_header']").attr("content");
    			 $.ajaxSetup({
    			 headers:
    			 { 'X-CSRF-TOKEN': token }
    			 });
    			 $.ajax({
    				url: './resendOTPRequest',
    				type: 'POST',
    				data: formData,
    				processData: false,
    				contentType: false,
    				success: function (data, textStatus, jqXHR) {
    					console.log("sucess"+data);
    					var statusCode=data.statusCode;
    					if(statusCode=="200")
    					{
    						$('#OtpBox1CancelRequest').val('');
    						$('#OtpBox2CancelRequest').val('');
    						$('#OtpBox3CancelRequest').val('');
    						$('#OtpBox4CancelRequest').val('');
    						$('#OtpBox5CancelRequest').val('');
    						$('#OtpBox6CancelRequest').val('');
    						timeLeft=$("body").attr("data-timeout");
        					elem = document.getElementById('cancelRequestrecoverycountdown');
        					elem.innerHTML = timeLeft;
    						timerId = setInterval(countdown, 1000);
    						countdown();
    						}

    					 $('div#initialloader').delay(500).fadeOut('slow');
    				},
    				error: function (jqXHR, textStatus, errorThrown) {
    					////console.log("error in ajax")

    				}
    			});
    			return false;
    	}

function submitStolenDeviceRequest(){
	    var countrycode=+865;
        $('div#initialloader').fadeIn('fast');
		$("#stolenLostButton").prop('disabled', true);
		var mgmtId=$('#stolenMgmtid').val();
		var stolenIMEI1=$('#stolenIMEI1').val();
		var stolenMobile1=$('#contactCountryCode').val()+$('#stolenMobile1').val();
	    var stolenIMEI2=$('#stolenIMEI2').val();
		var stolenIMEI3=$('#stolenIMEI3').val();
		var stolenIMEI4=$('#stolenIMEI4').val();
		var stolenDeviceBrand=$('#stolenDeviceBrand').val();
		var stolenDeviceModel=$('#stolenDeviceModel').val();
		var stolenDate=$('#stolenDate').val()+" "+$('#stolenTime').val();
		//var stolenTime=$('#stolenTime').val();
		var stolenOwner=$('#stolenOwner').val();
		var stolenEmail=$('#stolenEmail').val();
		var stolenOwnerAddress1=$('#stolenOwnerAddress1').val();
		var stolenOwnerAddress2=$('#stolenOwnerAddress2').val();
		var stolenOwnerNID=$('#stolenOwnerNID').val();
		var stolenOwnerOTPContact=$('#stolenOwnerOTPContact').val();
		var deviceOwnerNationality=$('#ownerNationality').val();
		var province=$('#provinceCity').val();
		var district=$('#district').val();
		var commune=$('#commune').val();
		var policeStation=$('#policeStation').val();
		var ownerDOB=$('#ownerDOB').val();
		var otpEmail=$('#stolenOtpEmail').val();
		var passportNumber=$('#stolenOwnerPassport').val();
		var category=$('#category').val();
		var requestId= $('#stolenMgmtRequestid').val();
		var language=$('#langList').val();
		var previousMobileInvoice=$('#fileNameEdit').val();
		var previousNIDFile=$('#fileNameEdit2').val();
		var createdOn= $('#createdOnEdit').val();
		var serialNumber=$('#serialNumber').val();
        var deviceType=$('#deviceType').val();
        var incidentDetail=$('#incidentDetail').val();
        var res=validationTAC(stolenIMEI1,stolenIMEI2,stolenIMEI3,stolenIMEI4);
                if(res===false){
                 $('#invalidPairBlock').openModal({dismissible:false});
                 return false;
                }
		const imeis = [stolenIMEI1];
	    if(stolenIMEI2!=="" && stolenIMEI2!==null){
		imeis.push(stolenIMEI2);
	    }
	    if(stolenIMEI3!=="" && stolenIMEI3!==null){
		imeis.push(stolenIMEI3);
	    }
	    if(stolenIMEI4!=="" && stolenIMEI4!==null){
		imeis.push(stolenIMEI4);
	    }

    	var resultimei= areValuesUnique(imeis);
    	if(resultimei==false){
		$('#duplicateIMEIBlock').openModal({dismissible:false});
				   $("#stolenLostButton").prop('disabled', false);
				   $('div#initialloader').delay(500).fadeOut('slow');
			       return false;
         }
		var mobilecheck1=	allZeroes(stolenMobile1);

		if(mobilecheck1==true){
			 $('#invalidMobileNumber').openModal({dismissible:false});
			 $("#stolenLostButton").prop('disabled', false);
			 $('div#initialloader').delay(500).fadeOut('slow');
			 return false
		}
	    if(stolenOwnerOTPContact=="" ||stolenOwnerOTPContact==null){
		stolenOwnerOTPContact="";
		}
		else{
		stolenOwnerOTPContact=countrycode+stolenOwnerOTPContact;
		}

		var request={
			"id":mgmtId,
			"imei1":stolenIMEI1,
			"contactNumber":stolenMobile1,
			"imei2":stolenIMEI2,
			"imei3":stolenIMEI3,
			"imei4":stolenIMEI4,
			"deviceBrand":stolenDeviceBrand,
			"deviceModel":stolenDeviceModel,
			"deviceLostDdateTime":stolenDate,
			"deviceOwnerName":stolenOwner,
			"deviceOwnerEmail":stolenEmail,
			"deviceOwnerAddress":stolenOwnerAddress1,
			"deviceOwnerAddress2":stolenOwnerAddress2,
			"deviceOwnerNationalID":stolenOwnerNID,
			"contactNumberForOtp":stolenOwnerOTPContact,
			"deviceOwnerNationality":deviceOwnerNationality,
			"province":province,
			"district":district,
			"commune":commune,
			"policeStation":policeStation,
			"ownerDOB":ownerDOB,
			"otpEmail":otpEmail,
			"passportNumber":passportNumber,
			"category":category,
			"requestId":requestId,
			"language":language,
			"previousMobileInvoice":previousMobileInvoice,
			"previousNIDFile":previousNIDFile,
			"createdOn":createdOn,
			"serialNumber":serialNumber,
            "deviceType":deviceType,
            "incidentDetail":incidentDetail
			}

	var formData;

	formData = new FormData();
	formData.append('file', $('#stolenMobileInvoice')[0].files[0]);
	formData.append('nidFileName', $('#stolenOwnerNIDfile')[0].files[0]);
	formData.append('request', JSON.stringify(request));
	         var token = $("meta[name='_csrf']").attr("content");
			 var header = $("meta[name='_csrf_header']").attr("content");
			 $.ajaxSetup({
			 headers:
			 { 'X-CSRF-TOKEN': token }
			 });
			 $.ajax({
				url: './lostStolenUpdate',
				type: 'POST',
				data: formData,
				processData: false,
				contentType: false,
				success: function (data, textStatus, jqXHR) {
					var statusCode=data.statusCode;
					if(statusCode=="200")
					{

						  $("#stolenFormID").css("display", "none");
						  $("#verifyRecoveryOtpForm").css("display", "none");
						  $("#successOTPScreen").css("display", "block");
						  $("#successRequestHeading").css("display", "block");
                          $("#cancelRequestHeading").css("display", "none");
						  $('#verifyOTPrequestid').append(" "+data.requestID);

					}
					else if(statusCode=="201"){

						 //$("#invalidPairBlock").css("display", "block");
						 var modalBackdrop = document.getElementsByClassName("modalBackdrop")[0];
						// modalBackdrop.style.display = "block";
						 $('#invalidInvalidDetail').openModal({dismissible:false});
						 $("#stolenLostButton").prop('disabled', false);
						 $('div#initialloader').delay(500).fadeOut('slow');
					}
					else if(statusCode=="502"){

						  $('#duplicateIMEIBlock').openModal({dismissible:false});
						 $("#stolenLostButton").prop('disabled', false);
						   $('div#initialloader').delay(500).fadeOut('slow');
					}
					//sessionStorage.removeItem("nationalId");
				},
				error: function (jqXHR, textStatus, errorThrown) {
					////console.log("error in ajax")

				}
			});
			return false;

			 }

function submitOTPRequest(){

				var t1=$('#OtpBox1').val();
			var t2=$('#OtpBox2').val();
			var t3=$('#OtpBox3').val();
			var t4=$('#OtpBox4').val();
			var t5=$('#OtpBox5').val();
			var t6=$('#OtpBox6').val();
			if(t1== null || t1==""){
				$('#OtpBox1').focus();
				//$('#OtpBox1').css("border", "1px solid #ced4da");
				return false;
			}
			if(t2== null || t2==""){
				$('#OtpBox2').focus();
				//$('#OtpBox2').css("border", "1px solid #ced4da");
				return false;
			}
			if(t3== null || t3==""){
				$('#OtpBox3').focus();
				//$('#OtpBox3').css("border", "1px solid #ced4da");
				return false;
			}
			if(t4== null || t4==""){
				$('#OtpBox4').focus();
				//$('#OtpBox4').css("border", "1px solid #ced4da");
				return false;
			}
			if(t5== null || t5==""){
				$('#OtpBox5').focus();
				//$('#OtpBox5').css("border", "1px solid #ced4da");
				return false;
			}
			if(t6== null || t6==""){
				$('#OtpBox6').focus();
				//$('#OtpBox6').css("border", "1px solid #ced4da");
				return false;
			}
			if(otpTry>otpVerifyLimit){
				  /*("#RequestFormVeriOTP").show();
					$("#verifyotpform").hide();*/
				  $('#otplimitExceed').openModal({dismissible:false});
				  $("#verifyRecoveryOtpForm").css("display", "none");
				 // $('#RequestFormVeriOTPButton').prop('disabled', false);
    			  $('#OtpBox1').val('');
				  $('#OtpBox2').val('');
				  $('#OtpBox3').val('');
				  $('#OtpBox4').val('');
				  $('#OtpBox5').val('');
				  $('#OtpBox6').val('');
				  otpTry=1;
				  return false;
			}
			$('div#initialloader').fadeIn('fast');
			var otpBox1=$('#OtpBox1').val();
			var otpBox2=$('#OtpBox2').val();
			var otpBox3=$('#OtpBox3').val();
			var otpBox4=$('#OtpBox4').val();
			var otpBox5=$('#OtpBox5').val();
			var otpBox6=$('#OtpBox6').val();
			var otpRequestID=$('#OTPRequestId').val();
			var oldRequestId= $('#OTPRequestIdPrevious').val();
			var request={
				"otpBox1":otpBox1,
				"otpBox2":otpBox2,
				"otpBox3":otpBox3,
				"otpBox4":otpBox4,
				"otpBox5":otpBox5,
				"otpBox6":otpBox6,
				"requestID":otpRequestID,
				"oldRequestID":oldRequestId,
				"requestType":"Stolen"
			}
			var formData;

	formData = new FormData();
					formData.append('request', JSON.stringify(request));
			 var token = $("meta[name='_csrf']").attr("content");
			 var header = $("meta[name='_csrf_header']").attr("content");
			 $.ajaxSetup({
			 headers:
			 { 'X-CSRF-TOKEN': token }
			 });
			 $.ajax({
				url: './verifyOTPRequestUpdatStolen',
				type: 'POST',
				data: formData,
				processData: false,
				contentType: false,
				success: function (data, textStatus, jqXHR) {
					var statusCode=data.statusCode;
					if(statusCode=="200")
					{
					$("#blockedDatatable").css("display", "none");
	 				$("#stolenFormBlock").css("display", "block");
	 				$("#verifyRecoveryOtpForm").css("display", "none");
					$('div#initialloader').delay(500).fadeOut('slow');
					setData(data.data);
					}
					else if (statusCode=="201"){
						//$("#invalidOTP").css("display", "block");
						 var modalBackdrop = document.getElementsByClassName("modalBackdrop")[0];
						// modalBackdrop.style.display = "block";
						 $('#invalidOTP').openModal({dismissible:false});
						  $('div#initialloader').delay(500).fadeOut('slow');
					}
					else if (statusCode=="202"){
                    						//$("#invalidOTP").css("display", "block");
                    						 var modalBackdrop = document.getElementsByClassName("modalBackdrop")[0];
                    						// modalBackdrop.style.display = "block";
                    						$("#verifyRecoveryOtpForm").css("display", "none");
                                            $("#otpExpired").css("display", "block");
                                            $('#otpExpired').openModal({dismissible:false});
                    						$('div#initialloader').delay(500).fadeOut('slow');

                    					}

				},
				error: function (jqXHR, textStatus, errorThrown) {
					////console.log("error in ajax")

				}
			});
			otpTry++;
			return false;

			}

function submitOTPCancelRequest(){
                        var t1=$('#OtpBox1CancelRequest').val();
            			var t2=$('#OtpBox2CancelRequest').val();
            			var t3=$('#OtpBox3CancelRequest').val();
            			var t4=$('#OtpBox4CancelRequest').val();
            			var t5=$('#OtpBox5CancelRequest').val();
            			var t6=$('#OtpBox6CancelRequest').val();
            			if(t1== null || t1==""){
            				$('#OtpBox1CancelRequest').focus();
            				//$('#OtpBox1').css("border", "1px solid #ced4da");
            				return false;
            			}
            			if(t2== null || t2==""){
            				$('#OtpBox2CancelRequest').focus();
            				//$('#OtpBox2').css("border", "1px solid #ced4da");
            				return false;
            			}
            			if(t3== null || t3==""){
            				$('#OtpBox3CancelRequest').focus();
            				//$('#OtpBox3').css("border", "1px solid #ced4da");
            				return false;
            			}
            			if(t4== null || t4==""){
            				$('#OtpBox4CancelRequest').focus();
            				//$('#OtpBox4').css("border", "1px solid #ced4da");
            				return false;
            			}
            			if(t5== null || t5==""){
            				$('#OtpBox5CancelRequest').focus();
            				//$('#OtpBox5').css("border", "1px solid #ced4da");
            				return false;
            			}
            			if(t6== null || t6==""){
            				$('#OtpBox6CancelRequest').focus();
            				//$('#OtpBox6').css("border", "1px solid #ced4da");
            				return false;
            			}
            			if(otpTry>otpVerifyLimit){
            				  $('#otplimitExceed').openModal({dismissible:false});
            				  $("#verifyOtpFormCancelRequest").css("display", "none");
            				  $('#OtpBox1CancelRequest').val('');
            				  $('#OtpBox2CancelRequest').val('');
            				  $('#OtpBox3CancelRequest').val('');
            				  $('#OtpBox4CancelRequest').val('');
            				  $('#OtpBox5CancelRequest').val('');
            				  $('#OtpBox6CancelRequest').val('');
            				  otpTry=1;
            				  return false;
            			}
            			$('div#initialloader').fadeIn('fast');
            			var otpBox1CancelRequest=$('#OtpBox1CancelRequest').val();
            			var otpBox2CancelRequest=$('#OtpBox2CancelRequest').val();
            			var otpBox3CancelRequest=$('#OtpBox3CancelRequest').val();
            			var otpBox4CancelRequest=$('#OtpBox4CancelRequest').val();
            			var otpBox5CancelRequest=$('#OtpBox5CancelRequest').val();
            			var otpBox6CancelRequest=$('#OtpBox6CancelRequest').val();
            			var otpRequestIDCancelRequest=$('#cancelOTPRequestId').val();
            			var oldRequestIdCancelRequest= $('#OTPRequestIdPrevious').val();
            			var request={
            				"otpBox1":otpBox1CancelRequest,
            				"otpBox2":otpBox2CancelRequest,
            				"otpBox3":otpBox3CancelRequest,
            				"otpBox4":otpBox4CancelRequest,
            				"otpBox5":otpBox5CancelRequest,
            				"otpBox6":otpBox6CancelRequest,
            				"requestID":otpRequestIDCancelRequest,
            				"requestType":"Stolen"
            			}
            			 var formData;
                         formData = new FormData();
            			 formData.append('request', JSON.stringify(request));
            			 var token = $("meta[name='_csrf']").attr("content");
            			 var header = $("meta[name='_csrf_header']").attr("content");
            			 $.ajaxSetup({
            			 headers:
            			 { 'X-CSRF-TOKEN': token }
            			 });
            			 $.ajax({
            				url: './verifyOTPCancelRequest',
            				type: 'POST',
            				data: formData,
            				processData: false,
            				contentType: false,
            				success: function (data, textStatus, jqXHR) {
            					var statusCode=data.statusCode;
            					if(statusCode=="200")
            					{
            					$("#blockedDatatable").css("display", "none");
            	 				$("#cancelOTPRequest").css("display", "block");
            	 				$("#verifyOtpFormCancelRequest").css("display", "none");
            					$('div#initialloader').delay(500).fadeOut('slow');
            					var modalBackdrop = document.getElementsByClassName("modalBackdrop")[0];
                                $('#cancelOtpReasonBox').openModal({dismissible:false});
                                $('div#initialloader').delay(500).fadeOut('slow');
                                $('#cancelReasonRequestID').val(data.requestID);
            					}
            					else if (statusCode=="201"){
            					var modalBackdrop = document.getElementsByClassName("modalBackdrop")[0];
            					$('#invalidOTP').openModal({dismissible:false});
            					$('div#initialloader').delay(500).fadeOut('slow');
            					}
                        else if (statusCode=="202"){
						//$("#invalidOTP").css("display", "block");
						 var modalBackdrop = document.getElementsByClassName("modalBackdrop")[0];
						// modalBackdrop.style.display = "block";
						$("#verifyOtpFormCancelRequest").css("display", "none");
                        $("#otpExpired").css("display", "none");
                        $('#otpExpired').openModal({dismissible:false});
						$('div#initialloader').delay(500).fadeOut('slow');
                       }
                            },
            				error: function (jqXHR, textStatus, errorThrown) {
            					////console.log("error in ajax")

            				}
            			});
            			otpTry++;
            			return false;

            			}

function saveCancelReason(){
                        var requestID=$('#cancelReasonRequestID').val();
            			var cancelReason= $('#cancelReason').val();
            			var request={
            				"requestId":requestID,
            				"remarks":cancelReason
            				}
            			var formData;
                        formData = new FormData();
            			formData.append('request', JSON.stringify(request));
            			 var token = $("meta[name='_csrf']").attr("content");
            			 var header = $("meta[name='_csrf_header']").attr("content");
            			 $.ajaxSetup({
            			 headers:
            			 { 'X-CSRF-TOKEN': token }
            			 });
            			 $.ajax({
            				url: './saveCancelReason',
            				type: 'POST',
            				data: formData,
            				processData: false,
            				contentType: false,
            				success: function (data, textStatus, jqXHR) {
            					var statusCode=data.statusCode;
            					if(statusCode=="200")
            					{
            				    $("#blockedDatatable").css("display", "none");
            	 				$("#cancelOtpReasonBox").css("display", "none");
            	 				$("#successOTPScreen").css("display", "block");
            	 				    successOTPScreen
            	 				$("#successRequestHeading").css("display", "none");
            	 				$("#cancelRequestHeading").css("display", "block");
            	 				$('#verifyOTPrequestid').append(" "+data.data.requestId);
            	 				$('div#initialloader').delay(500).fadeOut('slow');
                                }
            					else if (statusCode=="201"){
            						 var modalBackdrop = document.getElementsByClassName("modalBackdrop")[0];
            						 $('#invalidOTP').openModal({dismissible:false});
            						 $('div#initialloader').delay(500).fadeOut('slow');
            					}

            				},
            				error: function (jqXHR, textStatus, errorThrown) {
            					////console.log("error in ajax")

            				}
            			});
            			return false;
}


function enterRequestID(){

		  $('#recoverycontactNumber').val('');
		  $("#contactNumberLabel").css("display", "none");
		  document.getElementById("recoverycontactNumber").required = false;

}
function enterContactNumber(){
	      $('#recoveryRequestID').val('');
		  $("#requestIDLabel").css("display", "none");
		  document.getElementById("recoveryRequestID").required = false;
		  $("#contactNumberLabel").css("display", "block");
}

 $('#data-table tbody').on('click', '#editStolenRequestId', function() {
            var rowData = $(this).closest('tr').find('td').map(function() {
                return $(this).text();
            }).get();
             getOTP(rowData[2]);
        });
        $('#data-table tbody').on('click', '#cancelRequestId', function() {
                    var rowData = $(this).closest('tr').find('td').map(function() {
                        return $(this).text();
                    }).get();
                    // Populate form fields with row data
                  // setRecoverPageData(rowData[2]);
                    // Populate more form fields with other row data as needed
                    getCancelOTP(rowData[2]);
                });


function getOTP(recoveryRequestID){
        console.log("in otp again");
		$('div#initialloader').fadeIn('fast');
		$("#recoveryFoundButton").prop('disabled', true);


		var request={
			"requestId":recoveryRequestID,
			"language":$('#langList').val()
			}
	var formData;
	formData = new FormData();
	formData.append('request', JSON.stringify(request));
	var token = $("meta[name='_csrf']").attr("content");
			 var header = $("meta[name='_csrf_header']").attr("content");
			 $.ajaxSetup({
			 headers:
			 { 'X-CSRF-TOKEN': token }
			 });
			 $.ajax({
				url: './getOTPForCheckRequest',
				type: 'POST',
				data: formData,
				processData: false,
				contentType: false,
				success: function (data, textStatus, jqXHR) {
					console.log("sucess------&&&&--"+JSON.stringify(data.data));
					var statusCode=data.statusCode;

					if(statusCode=="200")
					{
						$('#verifyRecoveryOtpForm input').val('');
						  $("#stolenFormBlock").css("display", "none");
						  $("#verifyRecoveryOtpForm").css("display", "block");
						  $("#blockedDatatable").css("display", "none");
                            $('#OTPRequestId').val(data.data.requestId);
						    $('#OTPRequestIdPrevious').val(data.data.requestId);
						  document.getElementById("resendOTPclick").style.pointerEvents = "none";

						   if(data.data.deviceOwnerNationality==0){
						   let cleanedPhoneNumber = data.data.contactNumberForOtp.replace(/^855/, '');
							var mobile=cleanedPhoneNumber.replace(/\d(?=\d{4})/g, "x");
						    $('#phoneNumberOTP').append(mobile);
                            const element = document.getElementById("phoneNumberOTP");
                           const text = element.innerText;
                             const cleanedText = text.replace(/(xxxxx\d{4})(?:\1)+/g, '$1');
                           // Update the content with the cleaned text
                           element.innerText = cleanedText;
						} else if(data.data.deviceOwnerNationality==1){
							var userEMail=data.data.otpEmail;
							  var atIndex = userEMail.indexOf('@');
                              var dotIndex = userEMail.indexOf('.', atIndex);
							var maskedEmail = 'xxxxx' + userEMail.substring(dotIndex);
							 $("#phoneNumberOTP").css("display", "none");
							  $("#emailOTPMsg").css("display", "block");
						    $('#emailOTPMsg').append(maskedEmail);
                            const element = document.getElementById("emailOTPMsg");
                            const text = element.innerText;
                            // Use regex to find and remove the repeated part after the phone number
                            const cleanedText = text.replace(/(xxxxx\.com)(?=\1)/g, '');
                            // Update the content with the cleaned text
                            element.innerText = cleanedText;
						}
						 // var mobile=data.tag.replace(/\d(?=\d{4})/g, "x");
						   // $('#phoneNumberOTP').append(mobile);
						   timeLeft = $("body").attr("data-timeout");
						   elem = document.getElementById('recoverycountdown');
						   timerId = setInterval(countdown, 1000);
						   countdown();
						   $('div#initialloader').delay(500).fadeOut('slow');
					}
					else if(statusCode=="201"){
						console.log("unblock request is already  registered");
						 var modalBackdrop = document.getElementsByClassName("modalBackdrop")[0];
						 $('#invalidPairBlock').openModal({dismissible:false});
						 $("#recoveryFoundButton").prop('disabled', false);
						 $('div#initialloader').delay(500).fadeOut('slow');
					}
					else if(statusCode=="202"){

						var modalBackdrop = document.getElementsByClassName("modalBackdrop")[0];
						// modalBackdrop.style.display = "block";
						 $('#alreadyUnBlocked').openModal({dismissible:false});
						 $("#recoveryFoundButton").prop('disabled', false);
						  $('div#initialloader').delay(500).fadeOut('slow');
					}
					//sessionStorage.removeItem("nationalId");
				},
				error: function (jqXHR, textStatus, errorThrown) {
					////console.log("error in ajax")

				}
			});
			return false;

			 }

function getCancelOTP(recoveryRequestID){
             		$('div#initialloader').fadeIn('fast');
             		$("#recoveryFoundButton").prop('disabled', true);
             	    var request={
             			"requestId":recoveryRequestID,
             			"language":$('#langList').val()
             			}
             	var formData;
             	formData = new FormData();
             	formData.append('request', JSON.stringify(request));
             	var token = $("meta[name='_csrf']").attr("content");
             			 var header = $("meta[name='_csrf_header']").attr("content");
             			 $.ajaxSetup({
             			 headers:
             			 { 'X-CSRF-TOKEN': token }
             			 });
             			 $.ajax({
             				url: './getOTPForCancelRequest',
             				type: 'POST',
             				data: formData,
             				processData: false,
             				contentType: false,
             				success: function (data, textStatus, jqXHR) {
             				    var statusCode=data.statusCode;
             					if(statusCode=="200")
             					{
             					      $('#verifyOtpFormCancelRequest input').val('');
             						  $("#stolenFormBlock").css("display", "none");
             						  $("#verifyOtpFormCancelRequest").css("display", "block");
             						  $("#blockedDatatable").css("display", "none");
             	 				      $('#cancelOTPRequestId').val(data.data.requestId);
             						  $('#OTPRequestIdPrevious').val(data.data.requestId);
             						  document.getElementById("cancelRequestresendOTPclick").style.pointerEvents = "none";
             						  if(data.data.deviceOwnerNationality==0){
             							let cleanedPhoneNumber = data.data.contactNumberForOtp.replace(/^855/, '');
             							var mobile=cleanedPhoneNumber.replace(/\d(?=\d{4})/g, "x");
             						    $('#phoneNumberOTPCancelRequest').append(mobile);
                                      const element = document.getElementById("phoneNumberOTPCancelRequest");
                                      const text = element.innerText;
                                      const cleanedText = text.replace(/(xxxxx\d{4})(?:\1)+/g, '$1');
                                      // Update the content with the cleaned text
                                    element.innerText = cleanedText;
             						  } else if(data.data.deviceOwnerNationality==1){
             							  var userEMail=data.data.otpEmail;
             							  var atIndex = userEMail.indexOf('@');
                                           var dotIndex = userEMail.indexOf('.', atIndex);
             							var maskedEmail = 'xxxxx' + userEMail.substring(dotIndex);
             							 $("#phoneNumberOTPCancelRequest").css("display", "none");
             							  $("#emailOTPMsgCancelRequest").css("display", "block");
             						    $('#emailOTPMsgCancelRequest').append(maskedEmail);
                                        const element = document.getElementById("emailOTPMsgCancelRequest");
                            const text = element.innerText;
                            // Use regex to find and remove the repeated part after the phone number
                            const cleanedText = text.replace(/(xxxxx\.com)(?=\1)/g, '');
                            // Update the content with the cleaned text
                            element.innerText = cleanedText;
             						}
             						  timeLeft = $("body").attr("data-timeout");
             						   elem = document.getElementById('cancelRequestrecoverycountdown');
             						   timerId = setInterval(countdown, 1000);
             						   countdown();
             						   $('div#initialloader').delay(500).fadeOut('slow');
             					}
             					else if(statusCode=="201"){
             						 var modalBackdrop = document.getElementsByClassName("modalBackdrop")[0];
             						 $('#invalidCancelRequestBlock').openModal({dismissible:false});
             						 $("#recoveryFoundButton").prop('disabled', false);
             						 $('div#initialloader').delay(500).fadeOut('slow');
             					}

             				},
             				error: function (jqXHR, textStatus, errorThrown) {
             					////console.log("error in ajax")
             				}
             			});
             			return false;
              }

function  setRecoverPageData(unblockRequestId){


       $('div#initialloader').fadeIn('fast');
		var formData;
	//var otpRequestID=$('#OTPRequestId').val();
	var request={

				"requestId":unblockRequestId
			}
	formData = new FormData();
					formData.append('request', JSON.stringify(request));
			 var token = $("meta[name='_csrf']").attr("content");
			 var header = $("meta[name='_csrf_header']").attr("content");
			 $.ajaxSetup({
			 headers:
			 { 'X-CSRF-TOKEN': token }
			 });
			 $.ajax({
				url: './checkRequestId',
				type: 'POST',
				data: formData,
				processData: false,
				contentType: false,
				success: function (data, textStatus, jqXHR) {
					console.log("sucess-----"+JSON.stringify(data));
					var stolenData=data;
					$("#blockedDatatable").css("display", "none");
	 				$("#stolenFormBlock").css("display", "block");
					$('div#initialloader').delay(500).fadeOut('slow');

					setData(stolenData);
				},
				error: function (jqXHR, textStatus, errorThrown) {
					////console.log("error in ajax")

				}
			});

	}
	function setData(stolenData){
        var stolenDate=stolenData.deviceLostDdateTime.substring(0,10);
		var stolentime=stolenData.deviceLostDdateTime.substring(11);
		var OtpContactNumber=stolenData.contactNumberForOtp.substring(3,13);
        var selectedCountryCode =stolenData.contactNumber.replace(/(\d{9})$/, '');
        var countrycodesign="+";
        console.log("change in db "+countrycodesign+selectedCountryCode);
		 $('#stolenMgmtid').val(stolenData.id);
		 $('#stolenMgmtRequestid').val(stolenData.requestId);
		 $('#stolenMobile1').val(stolenData.contactNumber.slice(-9));
		 $('#stolenIMEI1').val(stolenData.imei1);
		 $('#stolenIMEI2').val(stolenData.imei2);
		 $('#stolenIMEI3').val(stolenData.imei3);
		 $('#stolenIMEI4').val(stolenData.imei4);
		 $('#stolenDate').val(stolenData.deviceLostDdateTime);
		 $('#stolenDeviceBrand').val(stolenData.deviceBrand).change();
		 $('#stolenDeviceModel').val(stolenData.deviceModel);
		 $('#stolenDate').val(stolenDate);
		 $('#stolenTime').val(stolentime);
		 $('#stolenOwner').val(stolenData.deviceOwnerName);
		 $('#stolenEmail').val(stolenData.deviceOwnerEmail);
		 $('#stolenOwnerAddress1').val(stolenData.deviceOwnerAddress);
		 $('#stolenOwnerAddress2').val(stolenData.deviceOwnerAddress2);
		 $('#stolenOwnerNID').val(stolenData.deviceOwnerNationalID);
		 $('#stolenOwnerOTPContact').val(OtpContactNumber);
		 $('#ownerNationality').val(stolenData.deviceOwnerNationality).change();
		 $('#provinceCity').val(stolenData.province).change();
		 $('#district').val(stolenData.district).change();
		 $('#commune').val(stolenData.commune).change();
		 $('#ownerDOB').val(stolenData.ownerDOB);
		 $('#stolenOtpEmail').val(stolenData.otpEmail);
		 $('#stolenOwnerPassport').val(stolenData.passportNumber);
		 $('#category').val(stolenData.category);
		 $('#createdOnEdit').val(stolenData.createdOn);
		 $('#fileNameEdit').val(stolenData.mobileInvoiceBill);
		 $('#fileNameEdit2').val(stolenData.deviceOwnerNationalIdUrl);
		// $('#stolenOwnerNIDfile').val(stolenData.deviceOwnerNationalIdUrl);
		 $('#stolenPreviewID').attr("onclick",'previewStolenFile("'+stolenData.firCopyUrl+'","'+stolenData.mobileInvoiceBill+'","'+stolenData.requestId+'")');
		 $('#stolenPreviewID2').attr("onclick",'previewStolenFile("'+stolenData.firCopyUrl+'","'+stolenData.deviceOwnerNationalIdUrl+'","'+stolenData.requestId+'")');
		 $('#serialNumber').val(stolenData.serialNumber);
         $('#deviceType').val(stolenData.deviceType).change();
         $('#incidentDetail').val(stolenData.incidentDetail);
         $('#contactCountryCode').val(countrycodesign+selectedCountryCode);
         $('#policeStation').val(stolenData.policeStation);
         }

		 function formDisabled(){
			var form = document.getElementById("stolenFormID");
  var fields = form.querySelectorAll("input, textarea, select");

  for (var i = 0; i < fields.length; i++) {
    fields[i].disabled = true;
  }
}



function chooseNationality(){
		var nationality=$('#ownerNationality').val();
		if(nationality==="1"){
		 $("#ownerDOBlDiv").css("display", "block");
		  $("#ownerEmailDiv").css("display", "none");
		  $("#ownerPassportDiv").css("display", "block");
		  $("#ownerNIDdiv").css("display", "none");
		  $("#otpEmailDiv").css("display", "block");
		  $("#otpContactDiv").css("display", "none");
		  document.getElementById("stolenOtpEmail").required = true;
		  document.getElementById("stolenOwnerOTPContact").required = false;
		  document.getElementById("stolenEmail").required = false;
		  document.getElementById("stolenOwnerNID").required = false;


		}
		else{
			$("#ownerDOBlDiv").css("display", "none");
		  $("#ownerEmailDiv").css("display", "block");
		  $("#ownerPassportDiv").css("display", "none");
		  $("#ownerNIDdiv").css("display", "block");
		  $("#otpEmailDiv").css("display", "none");
		  $("#otpContactDiv").css("display", "block");
		  document.getElementById("stolenOtpEmail").required = false;
		  document.getElementById("stolenOwnerOTPContact").required = true;
		  document.getElementById("stolenEmail").required = true;
		}
}



function countdown() {
	//alert(timeLeft);
    if (timeLeft == -1) {
        clearTimeout(timerId);
        doSomething();
        if(resendCount>3){
			$('#expiredOtpConfirmationMessage').openModal({dismissible:false});
			setTimeout(function() {
  				$('#expiredOtpConfirmationMessage').closeModal({
    			dismissible: false
      		});
	 		}, 4000);
			$('#resendOTPclick').css("display", "none");
			$('#resendOTPclick_time').css("display", "none");
			$('#cancelRequestresendOTPclick').css("display", "none");
			$('#cancelRequestresendOTPclick_time').css("display", "none");
			resendCount=1;
		}
    	} else {
        	elem.innerHTML = timeLeft;
        	timeLeft--;
    	}
}
function doSomething() {
    document.getElementById("resendOTPclick").style.pointerEvents = "auto";
    $('#resendOTPclick').css('color', 'blue');
    document.getElementById("cancelRequestresendOTPclick").style.pointerEvents = "auto";
        $('#cancelRequestresendOTPclick').css('color', 'blue');

}



function validationTAC(imei1, imei2, imei3, imei4) {
    // Filter out empty or null IMEI values and ensure that the remaining IMEIs are at least 8 characters long
    const imeis = [imei1, imei2, imei3, imei4].filter(imei => imei && imei.length >= 8);

    // If the array has no valid IMEIs, return false
    if (imeis.length === 0) return false;

    // Extract the first 8 digits of the first valid IMEI
    const first8Digits = imeis[0].substring(0, 8);

    // Check if all remaining IMEIs start with the same 8 digits
    const allMatch = imeis.every(imei => imei.substring(0, 8) === first8Digits);

    return allMatch;
}
function allZeroes(input) {
   console.log("new function==");
    return /^0+$/.test(input);
}

function closeModal1(){
	document.body.style.overflow = 'revert';
}
function areValuesUnique(inputs) {

   // var inputs = document.querySelectorAll('input[type="text"]');
    for (var i = 0; i < inputs.length; i++) {

        for (var j = i + 1; j < inputs.length; j++) {

            if (inputs[i] === inputs[j]) {
               alert("i ki value="+inputs[i]+" j ki value="+inputs[j]);

                return false; // Found a duplicate value

            }

        }

    }

    return true; // All values are unique

}


document.querySelector('.custom-file-button').addEventListener('click', function() {
               document.getElementById('stolenMobileInvoice').click();
});
document.querySelector('.NidFile').addEventListener('click', function() {
               document.getElementById('stolenOwnerNIDfile').click();
});

           // Update custom button text when a file is selected
document.getElementById('stolenMobileInvoice').addEventListener('change', function() {
               var fileName = this.files[0] ? this.files[0].name : ''; // If file selected, show name; else, show "Choose File" in Khmer
               document.getElementById('file-name').textContent = fileName;
});
document.getElementById('stolenOwnerNIDfile').addEventListener('change', function() {
               var fileName1 = this.files[0] ? this.files[0].name : ''; // If file selected, show name; else, show "Choose File" in Khmer
               document.getElementById('file-nameNid').textContent = fileName1;

});


// Adding form submit event to handle custom validation
    document.getElementById('stolenFormID').addEventListener('submit', function(event) {
        const textarea = document.getElementById('incidentDetail');
        validateTextarea(textarea);

        if (!textarea.checkValidity()) {
            event.preventDefault(); // Prevent form submission if textarea is invalid
        }
    });
    document.getElementById('cancelFormID').addEventListener('submit', function(event) {
      const textareaCancel = document.getElementById('cancelReason');
            validateTextarea(textareaCancel,'');

            if (!textareaCancel.checkValidity()) {
                event.preventDefault(); // Prevent form submission if textarea is invalid
            }
        });



 function backToDatatable(){
  $("#verifyOtpFormCancelRequest").css("display", "none");
  $("#verifyRecoveryOtpForm").css("display", "none");
  $("#cancelOtpReasonBox").css("display", "none");
  $("#otpExpired").css("display", "none");
  $("#blockedDatatable").css("display", "block");
 }