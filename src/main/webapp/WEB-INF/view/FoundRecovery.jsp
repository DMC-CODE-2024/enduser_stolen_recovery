<!DOCTYPE html>
<html class="no-js" lang="en" dir="ltr">
<head><title>EIRS Portal</title>
<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!-- Security Tags -->
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<sec:csrfMetaTags />
<!-- Security Tags -->
<c:set var="context" value="${pageContext.request.contextPath}" />

<!--<title>Currency Management</title>-->
<meta http-equiv='cache-control' content='no-cache'>
<meta http-equiv='expires' content='-1'>
<meta http-equiv='pragma' content='no-cache'>
<meta name="fragment" content="!">
<meta charset="utf-8" />
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black">
<meta content="" name="description" />
<meta content="" name="author" />

<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="icon" type="image/x-icon"
	href="${context}/resources/assets/images/logo.png">

<link rel="stylesheet"
	href="${context}/resources/assets/css/bootstrap.min.css">
<script src="${context}/resources/assets/js/jquery.min.js"></script>
<script src="${context}/resources/assets/js/popper.min.js"></script>
<script src="${context}/resources/assets/js/bootstrap.min.js"></script>


<!-- Security Tags -->
<meta name="_csrf" content="${_csrf.token}"/>
<!-- default header name is X-CSRF-TOKEN -->
<meta name="_csrf_header" content="${_csrf.headerName}"/>
<!-- Security Tags -->

<script type="text/javascript"
	src="${context}/resources/js/plugins/jquery-1.11.2.min.js"></script>
<script type="text/javascript">
	var path = "${context}";
</script>
<link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap" rel="stylesheet">

<link rel="stylesheet"
	href="${context}/resources/custom_js/jquery-ui.css">
<script src="${context}/resources/custom_js/1.12.1_jquery-ui.min.js"></script>
<link
	href="${context}/resources/js/plugins/data-tables/css/jquery.dataTables.min.css"
	type="text/css" rel="stylesheet" media="screen,projection">

<!-- CSS for icons(to remove later) -->
<link rel="stylesheet"
	href="${context}/resources/project_css/iconStates.css">

<link
	href="${context}/resources/font/font-awesome/css/font-awesome.min.css"
	type="text/css" rel="stylesheet" media="screen,projection">

 <!-- CORE CSS-->


<link rel="stylesheet" href="${context}/resources/assets/css/style.css">
<link rel="stylesheet" href="${context}/resources/assets/css/FoundRecovery.css">

<c:if test="${pageContext.response.locale=='en'}">

        <link media="print" onload="this.media='all'" rel="stylesheet" href="${context}/resources/assets/css/en.css">

</c:if>

<c:if test="${pageContext.response.locale=='km'}">

        <link media="print" onload="this.media='all'" rel="stylesheet" href="${context}/resources/assets/css/km.css">

</c:if>
<style type="text/css">
body {
    background:white !important;
    overflow: auto !important;
   
}
html, body {
                scroll-behavior: smooth;            }
           :root {
  scroll-behavior: auto !important;
}
 
</style>
</head>
<body data-roleType="${usertype}" data-userTypeID="${usertypeId}" data-userID="${userid}" data-selected-roleType="${selectedUserTypeId}"
	data-selected-username="${username}" data-lang-param="${pageContext.response.locale}"
	data-timeout="<spring:eval expression="@environment.getProperty('otp-timeout')" />"
	data-stolenselected-roleType="${stolenselectedUserTypeId}">

<input type="text" id="langList" value="${lang}" style="display:none">
	<div class="dashboard-layout">
	<!-- <div id="initialloader"></div> -->
        <%-- <div class="dashboard-header navbar navbar-expand navbar-dark align-items-center">
            <!-- Brand -->
            <a class="navbar-brand" href="#">
                 <img src="${context}/resources/assets/images/logo.png" alt="logo" class="img-fluid">
             <span style="color: white !important"><spring:message code="page.ceir" /></span>
            </a>

        </div> --%>
        
        <%-- <div class="alert alert-National fade show alert-dismissible alertID  alert-position1 mb-4 " role="alert" id="invalidOTP" style="display:none">
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true"><img src="${context}/resources/assets/images/close.png" alt="close" class=""></span>
            </button>
            <strong><i class="fa fa-info-circle" aria-hidden="true"></i></strong><spring:message code="input.invalidOTP1" />            
          </div> --%>
          <div class="popup-header">
         <h1><spring:message code="recovery.heading" /></h1>
       </div>
        <div class="Status-form StolenDevices" id="RecoveryFormBlock">
          
		<%--  <div class="alert alert-National fade show alert-dismissible alertID  alert-position mb-4" role="alert" id="invalidPairBlock" style="display:none">
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true"><img src="${context}/resources/assets/images/close.png" alt="close" class=""></span>
            </button>
            <strong><i class="fa fa-info-circle" aria-hidden="true"></i></strong><spring:message code="input.NIDMessage1" /><br><spring:message code="input.NIDMessage2" />            
          </div> --%>
          
         
          
           <div class="form-content UnBlocking">
            <form  onsubmit="return submitRecoveryDeviceRequest()" action="">
            	<div class="form-row">
                    <div class="form-group col-md-12">
                        <label for=""  ><spring:message code="recovery.requestNumber" /> <span class="star" id="requestIDLabel">*</span></label>
                        <input type="text" autocomplete="off" class="form-control" id="recoveryRequestID" onkeypress="enterRequestID()"  onpaste="enterRequestID()" maxlength="18"  required="required"
                         pattern="<spring:eval expression="@environment.getProperty('pattern.transactionId')" />"  placeholder="<spring:message code="placeholder.requestID" />"
                          oninput="InvalidMsg(this,'input','<spring:message code="recovery.requestID" />');"
												oninvalid="InvalidMsg(this,'input','<spring:message code="recovery.requestID" />');">
                      </div>
                </div>
				<h3><spring:message code="stolen.OR" /></h3>
                <div class="form-row">
                    <div class="form-group col-md-12">
                        <label for="" ><spring:message code="recovery.contactNumber" /> <span class="star" id="contactNumberLabel"></span></label>
                        <input type="text" autocomplete="off" class="form-control" id="recoverycontactNumber" maxlength="13" onpaste="enterContactNumber()" onkeypress="enterContactNumber()" 
                         pattern="<spring:eval expression="@environment.getProperty('pattern.StolencontactNo')" />" placeholder="<spring:message code="placeholder.contact" />"
                          oninput="InvalidMsg(this,'input','<spring:message code="AssigneContactNumber" />');"
												oninvalid="InvalidMsg(this,'input','<spring:message code="AssigneContactNumber" />');">
                      </div>
                </div>
                <p class="mt-2 mb-4"><spring:message code="stolen.Mandatory" /> <span class="red">*</span></p>
              	<div class="form-group" id="recpatchaDiv">
											<div class="g-recaptcha" data-callback="recaptchaCallback"  data-sitekey="<spring:eval expression="@environment.getProperty('captcha.dataSitekey')" />"></div>
											<!-- <div class="g-recaptcha" data-callback="recaptchaCallback" data-sitekey="6LfCwuUpAAAAAKOtJvGQbL2OWYzzQHBv5kcKpDq8"></div>-->
											<!-- <div class="g-recaptcha"  data-sitekey="6LeLYSwmAAAAAFPrU8jvMZc1ziENdczQw9tZ4QYZ"></div> -->
											<span id="errorMsgOnModal"  class="text-danger" style="display: none" ><spring:message code="imei.invalidCaptcha" /></span>
											</div>
			<div class="row">
                <div class="col-lg-12">
                    <div class="no-border">
                       
                        <button type="submit" id="recoveryFoundButton" class="btn save-button-dark"><spring:message code="button.submit" /></button>
                    </div>
                </div>
            </div> 
            
				</form>
        </div>
            
        </div><!------Status-form close------>



<div class="Validate-form" id="verifyRecoveryOtpForm" style="display:none">
           <div class="UnBlock">
              <h1 class="mb-4 mb-70" ><spring:message code="OTP.heading" />  </h1>
            <h6 class="mb-4"><spring:message code="OTP.verficationequest" /></h6>
            <h6 class="mb-2"><spring:message code="OTP.verficationequest1" /></h6>
            <P id="phoneNumberOTP"><spring:message code="OTP.verficationequest2" /> </P>
			<P id="emailOTPMsg" style="display:none"><spring:message code="OTP.emailMsg" /> </P>
            <div class="Validate-box">
                <form onsubmit="return submitOTPRequest()" action="">
                    <div class="form-group text-center mt-20"  id="inputs">
                    <input class="otp" autocomplete="off" type="text" required oninput='digitValidate(this)' id="OtpBox1"  maxlength=1 >
                    <input class="otp" autocomplete="off" type="text" required oninput='digitValidate(this)' id="OtpBox2"  maxlength=1 >
                    <input class="otp" autocomplete="off" type="text" required oninput='digitValidate(this)' id="OtpBox3"  maxlength=1 >
                    <input class="otp" autocomplete="off" type="text" required oninput='digitValidate(this)' id="OtpBox4"  maxlength=1 >
                     <input class="otp" autocomplete="off" type="text" required oninput='digitValidate(this)' id="OtpBox5"  maxlength=1 >
                    <input class="otp" autocomplete="off" type="text" required oninput='digitValidate(this)' id="OtpBox6"  maxlength=1 >
                    <input type="text" id="OTPRequestId" style=display:none >
                    <input type="text" id="OTPRequestIdPrevious" style=display:none >
                </div>
                <div class="">
                    <div class="col-md-12 mb-2 text-left timer">
                        <a href="#" id="resendOTPclick" ><spring:message code="OTP.resend" />  </a>
                        <p id="resendOTPclick_time"><spring:message code="OTP.timeDuration" /> <span id="recoverycountdown"></span></p>
                    </div>
                   <%--  <div class="col-md-3"> <a href="" class="btn-block text-right"><spring:message code="OTP.back" /></a></div> --%>
                  </div>
               <div class="no-border center">
                 <%--  <button type="button" class="btn cancel-btn"><spring:message code="OTP.back" /></button> --%>

                  <button type="button" onclick="backToSaveForm()" class="btn cancel-btn"><spring:message code="OTP.back" /></button>
                  <button type="submit" class="btn save-button-dark"><spring:message code="OTP.verify" /></button>
                  </div>
                  </form>
            </div>
			</div>
        </div>

	 <div class="Status-form" style="display:none" id="successOTPScreen">
           <div class="UnBlock">
            <p><img src="${context}/resources/assets/images/check.png" alt="logo" class="img-fluid"></p>
            <h1><spring:message code="verifyOTPOTP.h1Msg" /> </h1>
          <p id="verifyOTPrequestid"><spring:message code="verifyOTPOTP.p1Msg" />  </p>
          <p><spring:message code="recovery.p2Msg" />.<br> <spring:message code="verifyOTPOTP.p3Msg" /></p>
          <a href="${context}/request?type=1"    class="btn save-button-dark" style="margin-top: 20px;" ><spring:message code="Stolen.done" /></a>
        </div>
            
        </div>
        
      
        
        
        
         <div class="Status-form" style="display:none" id="otplimitExceed">
           <div class="UnBlock">
            <p class="Rejected"><img src="${context}/resources/assets/images/limitaccess.png" alt="logo" class="img-fluid"></p>
            <h1><spring:message code="verifyOTPOTP.limitExceed" /> </h1>
             <button type="submit" onclick="viewSaveForm('RecoveryFormBlock2')" class="btn save-button-dark"><spring:message code="OTP.back" /></button>
        </div>
            
        </div>
       <%--  <div class="sidear-footer copyright"><spring:message code="stolen.copyright" /></div> --%>
       </div>

<div class="Status-form" style="display:none" id="otpExpired">
                  <div class="UnBlock">
                   <p class="Rejected"><img src="${context}/resources/assets/images/limitaccess.png" alt="logo" class="img-fluid"></p>
                   <h1><spring:message code="otpExpire" /> </h1>
                  <button type="submit" onclick="backToSaveForm()" class="btn save-button-dark"><spring:message code="OTP.back" /></button>
               </div>

               </div>
               <%-- <div class="sidear-footer"><spring:message code="stolen.copyright" /></div> --%>
</div>

<!--------------invalid OTP modal  -------------->
 <div class="modal fade modalBackdrop hidden"  data-toggle="modal fade" data-target="1233189" id="invalidOTP" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle2" aria-hidden="true" style="display:none">
  <div class="modal-dialog modal-sm transform-10" id="1233189" role="document">
    <div class="modal-content">
      <div class="modal-body">
        <button type="button" class="alert-close close"  onclick="closeModal('invalidOTP')" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true"><img src="${context}/resources/assets/images/close.png" alt="close"></span>
        </button>
 
        <p class="Rejected">
          <spring:message code="input.invalidOTP1" />
        </p>
      </div>
    </div>
  </div>
</div>

<!--------------invalid OTP modal  -------------->

<!-------------- modal limit exceed -------------->
<div class="modal fade modalBackdrop hidden"  data-toggle="modal fade" data-target="1233111" id="otplimitExceed" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle1" aria-hidden="true" style="display:none">
  <div class="modal-dialog modal-sm transform-10" id="1233111" role="document">
    <div class="modal-content">
      <div class="modal-body">
        <button type="button" class="alert-close close"  onclick="closeModal('otplimitExceed')" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true"><img src="${context}/resources/assets/images/close.png" alt="close"></span>
        </button>
 
        <p class="Rejected">
          <spring:message code="input.NIDMessage1" /><br>
            <spring:message code="input.NIDMessage2" />
        </p>
      </div>
    </div>
  </div>
</div>  

 <!-------------- modal limit exceed -------------->
	   <!-------------- Modal National ID -------------->
<div class="modal fade modalBackdrop hidden"  data-toggle="modal fade" data-target="12331" id="invalidPairBlock" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" style="display:none">
  <div class="modal-dialog modal-sm transform-10" id="12331" role="document">
    <div class="modal-content">
      <div class="modal-body">
        <button type="button" class="alert-close close"  onclick="closeModal('invalidPairBlock')" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true"><img src="${context}/resources/assets/images/close.png" alt="close"></span>
        </button>
 
        <p class="Rejected">
          <spring:message code="inputrequestIdMessage1" /><br>
            <spring:message code="inputrequestIdMessage2" />
        </p>
      </div>
    </div>
  </div>
</div>  

<!-- <div class="modal fade modalBackdrop hidden"  data-toggle="modal fade" data-target="123319" id="blockedDatatable" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" style="display:none">
  <div class="modal-dialog modal-sm transform-10" id="123319" role="document">
    <div class="modal-content">
      <div class="modal-body">
        <table border="2" id="mytable">
</table>
      </div>
    </div>
  </div>
</div>  --> 

<div class="table-box TableBorder">
  <div class="Status-formDB" style="display:none" id="blockedDatatable">
    <%-- <h1><spring:message code="recovery.heading" /></h1> --%>
           <div class="UnBlock table-box TableBorder">         
<table id="data-table" class="table-responsive display table align-left no-footer-border">
    <thead class="thead-dark">
        <tr>
           <th><spring:message code="stolen.db.id" /></th>
            <th><spring:message code="stolen.db.dateTime" /></th>
            <th><spring:message code="stolen.db.RequestNumber" /></th>
            <th><spring:message code="stolen.db.Request_type" /></th>
            <th><spring:message code="stolen.db.Device_type" /></th>
            <th><spring:message code="stolen.db.Device_brand" /></th>
            <th><spring:message code="stolen.db.Device_model" /></th>
            <th><spring:message code="stolen.db.Status" /></th>
            <th><spring:message code="stolen.db.Action" /></th>
            <!-- Add more headers as needed -->
        </tr>
    </thead>
    <tbody>
        <!-- Table body will be dynamically populated -->
    </tbody>
</table>

        </div>
            
        </div></div>


<div class="modal fade modalBackdrop hidden"  data-toggle="modal fade" data-target="123311" id="alreadyUnBlocked" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" style="display:none">
  <div class="modal-dialog modal-sm transform-10" id="12331" role="document">
    <div class="modal-content">
      <div class="modal-body">
        <button type="button" class="alert-close close"  onclick="closeModal('alreadyUnBlocked')" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true"><img src="${context}/resources/assets/images/close.png" alt="close"></span>
        </button>
 
        <p class="Rejected">
          <spring:message code="inputrequestIdUnblocked" />
        </p>
      </div>
    </div>
  </div>
</div>  

<!-------------- Modal National ID Close-------------->
	   <div class="modal fade" id="saveConfirmationMessage" role="dialog">
<div class="modal-dialog modal-sm">
<div class="modal-content success-popup">
<div class="modal-body">
<p><img src="${context}/resources/assets/images/check.svg" alt="" class="">  <spring:message code="modal.requestOtpResent" /></p>
</div>
</div>
</div>
</div>
	   
<!-- --------Request Unblock form -->
 <div class="Status-form " id="RecoveryFormBlock2" style="display:none">

           <div class="form-content UnBlockingRecovery">
           <%--  <h1><spring:message code="recovery.heading" /></h1> --%>
            <form  onsubmit="return getOTP()" action="" id="recoveryFormId">
              <h4><spring:message code="stolen.heading2" /></h4>
                
                <div class="form-row">
                    <!-- <div class="form-group col-md-6">
                        <label for=""><spring:message code="stolen.contact1" /> <span class="star"></span></label>
                        <input type="text" class="form-control" id="unblockContactNumber"  
                          pattern="<spring:eval expression="@environment.getProperty('pattern.contactNo')" />" 
                          oninput="InvalidMsg(this,'input','<spring:message code="AssigneContactNumber" />');"
												oninvalid="InvalidMsg(this,'input','<spring:message code="AssigneContactNumber" />');"
                          >
			   		</div> -->
			   		<div class="form-group col-md-6">
                                                            <label for=""><spring:message code="recovery.Reason" /> <span class="star">*</span></label>




                                     <textarea class="form-control" id="recoveryReason" rows="2" maxlength="1000"
                                                                             placeholder="<spring:message code="placeholder.incident" />" required="" title=" "
                                                                             oninput="validateTextarea(this,'stolenLostButton','error-message','<spring:eval expression='@environment.getProperty(\"pattern.Incident\")'/>')"
                                                                             data-tooltip-id="892d22b4-0262-51ca-d0b3-0c5ced343cb3"></textarea>
                                   <p id="error-message" style="color: red; display: none;"><spring:message code="validation.StolenInicdent" /></p>
                                      </div>
			   		 <div class="form-group col-md-6">
                      <label for=""><spring:message code="checkStatus.UnblockRequestid" /> <span class="star">*</span></label>
                      <input type="text" class="form-control" id="unblockRequestId"  required >
                    </div>
				</div>
				<h4><spring:message code="recovery.Place" /></h4>
                <div class="form-row">
                                            <div class="form-group col-md-6">
                                                <label for=""><spring:message code="recovery.date" /> <span class="star">*</span></label>
                                                <input type="date"  id="stolenDate" class="form-control text-uppercase" required >
                                              </div>

                                              <div class="form-group col-md-6">
                                                <label for=""><spring:message code="stolen.time" /> <span class="star">*</span></label>
                                                <input type="time" id="stolenTime" class="form-control text-uppercase" required >
                                              </div>
                 </div>
                <div class="form-row">
                                  <div class="form-group col-md-6">
                                        <label for=""><spring:message code="lost.provinceCity" /> <span class="star">*</span></label>
                                        <select class="form-control" id="provinceCity" onchange="getDistrict('provinceCity')" required="required">
                                         <option value=""  selected><spring:message code="select.provinceCity" />
                                      </select>
                                  </div>
                                  <div class="form-group col-md-6">
                                        <label for=""><spring:message code="lost.district" /> <span class="star">*</span></label>
                                        <select class="form-control" id="district" required="required" onchange="getCommune('district')">
                                          <option value=""  selected><spring:message code="select.LostDistrict" />
                                      </select>
                                  </div>
                </div>
                <div class="form-row">
                                  <div class="form-group col-md-6">
                                        <label for=""><spring:message code="lost.commune" /> <span class="star">*</span></label>
                                        <select class="form-control" id="commune" required="required" onchange="getPolice('commune')">
                                          <option value=""  selected><spring:message code="select.LostCommune" />
                                      </select>
                                  </div>
                </div>


                
			<div class="row">
                <div class="col-lg-12">
                    <div class="no-border flex-end">
                       <!--  <button type="button" class="btn cancel-btn">Back</button> -->
                       <a href="#"   class="btn cancel-btn"><spring:message code="OTP.back" /></a>
                        <button type="submit" id="recoveryFormButton" class="btn save-button-dark"><spring:message code="button.submit" /></button>
                    </div>
                </div>
            </div> 
            </form>
        </div>   
	   </div>
	   


<div class="modal fade" id="recordNotFound" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-sm FlashPopup" role="document">
      <div class="modal-content">
        <div class="FlashPopup-header">
          <button type="button" class="close opacity1" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true"><img src="${context}/resources/assets/images/close.png" alt="close" ></span>
          </button>
        </div>
        <div class="modal-body pt-0">
          <h3><spring:message code="input.recordNotFound" /></h3>
        </div>

      </div>
    </div>
  </div>

	   <!-- OTP Limit Modal -->
<div class="modal fade" id="expiredOtpConfirmationMessage" role="dialog">
<div class="modal-dialog modal-sm">
<div class="modal-content Rejected">
<div class="modal-body">
<p><img src="${context}/resources/assets/images/circle.svg" alt="" class="">  <spring:message code="bulk.modal.requestOtpLimit" /></p>
</div>
</div>
</div>
</div>
<!-- OTP Limit Modal close-->
	   


	<script type="text/javascript"
		src="${context}/resources/js/materialize.js"></script>
	<script type="text/javascript"
		src="${context}/resources/js/plugins/data-tables/js/jquery.dataTables.min.js"></script>
	<script src="${context}/resources/assets/js/custom.js"></script>
<script src="https://www.google.com/recaptcha/api.js"></script>
	<script src="https://www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit&hl=en"
    async defer>
		<!-- i18n library -->
	<script type="text/javascript"
		src="${context}/resources/project_js/CLDRPluralRuleParser.js"></script>
	<script type="text/javascript"
		src="${context}/resources/i18n_library/i18n.js"></script>
	<script type="text/javascript"
		src="${context}/resources/i18n_library/messagestore.js"></script>

	<script type="text/javascript"
		src="${context}/resources/i18n_library/fallbacks.js"></script>

	<script type="text/javascript"
		src="${context}/resources/i18n_library/language.js"></script>

	<script type="text/javascript"
		src="${context}/resources/i18n_library/parser.js"></script>


	<script type="text/javascript"
		src="${context}/resources/i18n_library/emitter.js"></script>


	<script type="text/javascript"
		src="${context}/resources/i18n_library/bidi.js"></script>

	<script type="text/javascript"
		src="${context}/resources/i18n_library/history.js"></script>

	<script type="text/javascript"
		src="${context}/resources/i18n_library/min.js"></script>
		<script type="text/javascript"
		src="${context}/resources/project_js/globalVariables.js?version=<%= (int) (Math.random() * 10) %>"></script>
	<script type="text/javascript"
		src="${context}/resources/project_js/backbutton.js?version=<%= (int) (Math.random() * 10) %>"></script>
	<script type="text/javascript"
		src="${context}/resources/project_js/dragableModal.js?version=<%= (int) (Math.random() * 10) %>"></script>
	<script type="text/javascript"
		src="${context}/resources/project_js/enterKey.js?version=<%= (int) (Math.random() * 10) %>"></script>

	<script type="text/javascript"
		src="${context}/resources/project_js/FoundRecovery.js?version=<%= (int) (Math.random() * 10) %>"></script>
			<script type="text/javascript"
		src="${context}/resources/project_js/validationMsg.js?version=<%= (int) (Math.random() * 10) %>"></script>
	<script type="text/javascript"
		src="${context}/resources/project_js/_dateFunction.js?version=<%= (int) (Math.random() * 10) %>" async></script>
		<script type="text/javascript"
		src="${context}/resources/project_js/otp.js?version=<%= (int) (Math.random() * 10) %>"></script>
			<script type="text/javascript"
		src="" async></script>
		<script type="text/javascript"
        		src="${context}/resources/project_js/addressDropdowns.js?version=<%= (int) (Math.random() * 10) %>"></script>

<%-- <script type="text/javascript">$( document ).ready(function() {if($("body").attr("data-roleType") == '' || ($("body").attr("data-roleType") != window.parent.$("body").attr("data-roleType"))){window.top.location.href = "./login?isExpired=yes";} var timeoutTime = <%=session.getLastAccessedTime()%>;var timeout = <%=session.getMaxInactiveInterval()%>;timeoutTime += timeout;var currentTime;$("body").click(function(e) {$.ajaxSetup({headers:{ 'X-CSRF-TOKEN': $("meta[name='_csrf']").attr("content") }});$.ajax({url: './serverTime',type: 'GET',async: false,success: function (data, textStatus, jqXHR) {currentTime = data;},error: function (jqXHR, textStatus, errorThrown) {}});if( currentTime > timeoutTime ){window.top.location.href = "./login?isExpired=yes";}else{timeoutTime = currentTime + timeout;}});});</script> --%>


</body></html>


