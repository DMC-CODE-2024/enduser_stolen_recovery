/**
 * 
 */
 
 $(document).ready(function() {

    var lang= $('#langList').val();
    $.i18n().locale = lang;
});
 var otpVerifyLimit=3;
 var otpTry=1;
 var resendCount=1;
 var timeLeft;
 	var elem;
 	var timerId ;
 	
 /*$.getJSON('./getDropdownList/recovery_reason', function(data) {
			for (i = 0; i < data.length; i++) {
				$('<option>').val(data[i].value).text(data[i].interpretation)
				.appendTo('#recoveryReason');
				//////console.log("...........");
			}
		});*/
		
		
		$('div#initialloader').delay(500).fadeOut('slow');
		
		
 function submitRecoveryDeviceRequest(){

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
                    console.log("prefix number="+recoverycontactNumber)
		
		var language=$('#langList').val();
		var request={
			"requestId":recoveryRequestID,
			"contactNumberForOtp":recoverycontactNumber,
			"language":language
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
				url: './recoveryFoundSave',
				type: 'POST',
				data: formData,
				processData: false,
				contentType: false,
				success: function (data, textStatus, jqXHR) {
					var statusCode=data.statusCode;
					var tableDetails=data.data;
					
					if(statusCode=="200" && data.data.length !==0)
					{
					var status=data.data[0].status;
					var request_type=data.data[0].requestType
					$('#unblockContactNumber').val(data.data[0].contactNumber);
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
								 let item = tableDetails.find(item => item.requestId === row.requestId);
                                  if (item) {

								if(item.status === "Done" && item.requestType==='Stolen'){
								    return '<a href="#" class="unblock-btn"  data-id="' + row.id + '"><img src="./resources/assets/images/unlock-icon.svg" alt="icon" class="img-fluid"></a>';
									}
								else if(item.status=== "Done" && item.requestType==='Stolen'){
								return '<a href="#" class="unblock-btn" style="pointer-events: none;filter: grayscale(100%) invert(100%) contrast(20%);"  data-id="' + row.id + '"><img src="./resources/assets/images/unlock-icon.svg" alt="icon" class="img-fluid"></a>';
                                    }
								else if(item.requestType==='Recover'){
								        return '<a href="#" class="unblock-btn" style="pointer-events: none;filter: grayscale(100%) invert(100%) contrast(20%);"  data-id="' + row.id + '"><img src="./resources/assets/images/unlock-icon.svg" alt="icon" class="img-fluid"></a>';
                                		}
									else{
									     return '<a href="#" class="unblock-btn" style="pointer-events: none;color: darkgrey"  data-id="' + row.id + '"><img src="./resources/assets/images/unlock-icon.svg" alt="icon" class="img-fluid"></a>';
									}
									}
                   			   
                   						 }
                				}
             	                 
                // Add more columns as needed
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
						 $('#recordNotFound').openModal({dismissible:false});
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
				"requestType":"Recover"
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
				url: './verifyOTPRequest',
				type: 'POST',
				data: formData,
				processData: false,
				contentType: false,
				success: function (data, textStatus, jqXHR) {
					console.log("sucess"+data);
					
					var statusCode=data.statusCode;
					if(statusCode=="200")
					{
						console.log("-----");
						  $("#RecoveryFormBlock").css("display", "none");
						  $("#verifyRecoveryOtpForm").css("display", "none");
						  $("#successOTPScreen").css("display", "block");
						    $('#verifyOTPrequestid').append(data.requestID);
							$('div#initialloader').delay(500).fadeOut('slow');
						   
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
			
			
					
	function resendOTP(){
		//$('#RequestFormVeriOTPButton').prop('disabled', false);
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
				"lang":lang
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
    					console.log("---"+elem);
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
			resendCount++;
			return false;
	}		
	
	
	document.getElementById("resendOTPclick").addEventListener('click',function ()
{
	
    resendOTP();
   }  ); 
   
   
   function closeModal(id){
	$('#'+id).closeModal();
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

 $('#data-table tbody').on('click', '.unblock-btn', function() {
            var rowData = $(this).closest('tr').find('td').map(function() {
                return $(this).text();
            }).get();
            // Populate form fields with row data
           setRecoverPageData(rowData[2],rowData[3]);
            // Populate more form fields with other row data as needed
        });
function  setRecoverPageData(unblockRequestId,unblockContactNumber){
	 $("#blockedDatatable").css("display", "none");
	 $("#RecoveryFormBlock2").css("display", "block");
	// $('#unblockContactNumber').val(unblockContactNumber);
     $('#unblockRequestId').val(unblockRequestId);
     
       $("#unblockContactNumber").prop('disabled', true);
       $("#unblockRequestId").prop('disabled', true);
       
	}
	
	function getOTP(){

		$('div#initialloader').fadeIn('fast');
		$("#recoveryFoundButton").prop('disabled', true);
		var recoveryRequestID=$('#unblockRequestId').val();
		var recoverycontactNumber=$('#unblockContactNumber').val();
		var recoveryReason=$('#recoveryReason').val();
		var language=$('#langList').val();
		var stolenDate=$('#stolenDate').val()+" "+$('#stolenTime').val();
		var province=$('#provinceCity').val();
        var district=$('#district').val();
        var commune=$('#commune').val();
		var request={
			"requestId":recoveryRequestID,
			"contactNumber":recoverycontactNumber,
			"recoveryReason":recoveryReason,
			"language":language,
			"deviceLostDdateTime":stolenDate,
			"province":province,
            "district":district,
            "commune":commune
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
				url: './getOTPRequest',
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
					 $("#RecoveryFormBlock2").css("display", "none");
						  $("#verifyRecoveryOtpForm").css("display", "block");
						  $('#OTPRequestId').val(data.data.requestId);
						 
						   $('#OTPRequestIdPrevious').val(recoveryRequestID);
						   document.getElementById("resendOTPclick").style.pointerEvents = "none";
						   var nationalityInRecovery=data.data.deviceOwnerNationality;
						    if(nationalityInRecovery==0){
						     let cleanedPhoneNumber = data.data.contactNumberForOtp.replace(/^855/, '');
							 var mobile=cleanedPhoneNumber.replace(/\d(?=\d{4})/g, "x");
						    $('#phoneNumberOTP').append(mobile);
                            const element = document.getElementById("phoneNumberOTP");
                           const text = element.innerText;
                            // Use regex to find and remove the repeated part after the phone number
                            const cleanedText = text.replace(/(xxxxx\d{4})(?:\1)+/g, '$1');
                           // Update the content with the cleaned text
                           element.innerText = cleanedText;
						} else if(nationalityInRecovery==1){
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
					else if(statusCode=="502"){

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

 // Adding form submit event to handle custom validation
    document.getElementById('recoveryFormId').addEventListener('submit', function(event) {
        const textarea = document.getElementById('recoveryReason');
        validateTextarea(textarea);

        if (!textarea.checkValidity()) {
            event.preventDefault(); // Prevent form submission if textarea is invalid
        }
    });


function backToSaveForm(){
$("#RecoveryFormBlock2").css("display", "block");
$("#verifyRecoveryOtpForm").css("display", "none");
 $("#otpExpired").css("display", "none");
}
