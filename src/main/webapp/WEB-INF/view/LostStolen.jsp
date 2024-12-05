<!DOCTYPE html>
<html class="no-js"  dir="ltr" >
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
<link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap" rel="stylesheet">


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
 .file-input-wrapper,.file-input-wrapper1 {
            position: relative;
            width: 200px;
            height: 40px;
        }
 .stolenFiles {
            position: absolute;
            width: 200px;
            height: 40px;
            top: 0;
            left: 0;
            opacity: 0; /* Hide the actual file input */
            cursor: pointer;
        }
 .custom-file-button, .NidFile{
            position: absolute;
            width: 150px;
            height: 40px;
            top: 0;
            left: 0;
            background-color: orange;
            color: white;
            text-align: center;
            line-height: 40px;
            border-radius: 4px;
            cursor: pointer;
        }
 .file-name ,.file-nameNid{
                   display: inline-block;
                       margin-left: 160px;
                       max-width: 300px;
                       white-space: nowrap;
                       overflow: hidden;
                       text-overflow: ellipsis;
                       vertical-align: top;
                       font-size: 14px;
                       color: black !important;
          }
</style>
</head>
<body data-roleType="${usertype}" data-userTypeID="${usertypeId}" data-userID="${userid}" data-selected-roleType="${selectedUserTypeId}"
	data-selected-username="${username}" data-timeout="<spring:eval expression="@environment.getProperty('otp-timeout')" />"
	data-stolenselected-roleType="${stolenselectedUserTypeId}" data-lang-param="${pageContext.response.locale}"> 
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
        
        <div class="popup-header">
        <h1><spring:message code="stolen.heading" /></h1>
       </div>
        <%-- <div class="alert alert-National fade show alert-dismissible alertID  alert-position1 mb-4 " role="alert" id="invalidOTP" style="display:none">
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true"><img src="${context}/resources/assets/images/close.png" alt="close" class=""></span>
            </button>
            <strong><i class="fa fa-info-circle" aria-hidden="true"></i></strong><spring:message code="input.invalidOTP1" />            
          </div> --%>
        <div class="Status-form width-90-200" id="stolenFormBlock">
          

          
         
           
           <div class="form-content">
            <form  onsubmit="return submitStolenDeviceRequest()" id="fromStolenId" action="">
              <h4><spring:message code="stolen.heading2" /></h4>
                <div class="form-row">
                
                    <div class="form-group col-md-6">
                        <label for=""><spring:message code="stolen.contact1" /> <span class="star">*</span></label>
                      <div class="flex">
                        <div class="input-group-prepend">
                         <span class="caller pd-0" >
                         <select id="contactCountryCode" required class="CountryCode">
                         <option value=""  selected><spring:message code="select.countryCode" />
                         </select>
                         </span>
                      </div>
                        <input type="text" maxlength="9" autocomplete="off" class="orm-control border-none pl-6" id="stolenMobile1"  required placeholder="<spring:message code="placeholder.contact" />"
                          pattern="<spring:eval expression="@environment.getProperty('pattern.contactNo')" />"
                          oninput="InvalidMsg(this,'input','<spring:message code="AssigneContactNumber" />');"
												oninvalid="InvalidMsg(this,'input','<spring:message code="AssigneContactNumber" />');" >
												 
                    </div>
                    </div>
                        
                        <%-- <div class="form-group col-md-6">
                         <label for=""><spring:message code="stolen.contact1" /> <span class="star"></span></label>
                       <input type="text" maxlength="10" autocomplete="off" class="form-control" id="stolenMobile1"   placeholder="<spring:message code="placeholder.contact" />"
                          pattern="<spring:eval expression="@environment.getProperty('pattern.contactNo')" />" 
                          oninput="InvalidMsg(this,'input','<spring:message code="AssigneContactNumber" />');"
												oninvalid="InvalidMsg(this,'input','<spring:message code="AssigneContactNumber" />');" >

			   		</div>--%>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-6">
                        <label for=""><spring:message code="stolen.IMEI1" /> <span class="star">*</span></label>
                        <input type="text" maxlength="15" autocomplete="off" class="form-control" id="stolenIMEI1" required placeholder="<spring:message code="placeholder.imei" />"
                          pattern="<spring:eval expression="@environment.getProperty('pattern.IMEINumber')" />" 
                          oninput="InvalidMsg(this,'input','<spring:message code="validation.stolenIMEI" />');"
												oninvalid="InvalidMsg(this,'input','<spring:message code="validation.stolenIMEI" />');"
                          >
			   		</div>
			   		 <div class="form-group col-md-6">
                        <label for=""><spring:message code="stolen.IMEI2" /> </label>
                        <input type="text" class="form-control" maxlength="15" autocomplete="off" id="stolenIMEI2"  placeholder="<spring:message code="placeholder.imei" />"
                          pattern="<spring:eval expression="@environment.getProperty('pattern.IMEINumber')" />" 
                          oninput="InvalidMsg(this,'input','<spring:message code="validation.stolenIMEI" />');"
												oninvalid="InvalidMsg(this,'input','<spring:message code="validation.stolenIMEI" />');"
                          >
			   		</div>
			   		
						
                </div>
                 <div class="form-row">
                  <div class="form-group col-md-6">
                      <label for=""><spring:message code="stolen.IMEI3" /> </label>
                      <input type="text" maxlength="15" autocomplete="off" class="form-control" id="stolenIMEI3"  placeholder="<spring:message code="placeholder.imei" />"
                      pattern="<spring:eval expression="@environment.getProperty('pattern.IMEINumber')" />"  
											    oninput="InvalidMsg(this,'input','<spring:message code="validation.stolenIMEI" />');"
												oninvalid="InvalidMsg(this,'input','<spring:message code="validation.stolenIMEI" />');" 
                      >
                    </div>

                     <div class="form-group col-md-6">
                      <label for=""><spring:message code="stolen.IMEI4" /> </label>
                      <input type="text" maxlength="15" autocomplete="off" class="form-control" id="stolenIMEI4"   placeholder="<spring:message code="placeholder.imei" />"
                      pattern="<spring:eval expression="@environment.getProperty('pattern.IMEINumber')" />"  
											    oninput="InvalidMsg(this,'input','<spring:message code="validation.stolenIMEI" />');"
												oninvalid="InvalidMsg(this,'input','<spring:message code="validation.stolenIMEI" />');" 
                      >
                    </div>
              </div>
              <div class="form-row">
                    <div class="form-group col-md-6">
                                              <label for=""><spring:message code="stolen.deviceBrand" /> <span class="star">*</span></label>
                                              <select class="form-control" id="stolenDeviceBrand"  required="required">
                                              <option value=""  selected><spring:message code="select.deviceBrand" />
                                            </select>
                                          </div>

                       <div class="form-group col-md-6">
                        <label for=""><spring:message code="stolen.deviceModel" /> <span class="star">*</span></label>
                        <input type="text" class="form-control" autocomplete="off" id="stolenDeviceModel" placeholder="<spring:message code="placeholder.model" />"
                        required
                         pattern="<spring:eval expression="@environment.getProperty('pattern.ModelNumber')" />"
                         oninput="InvalidMsg(this,'input','<spring:message code="stolen.modelNumber.validation" />');"
                         oninvalid="InvalidMsg(this,'input','<spring:message code="stolen.modelNumber.validation" />');">
                      </div>

                      
                </div>
                
                <div class="form-row">
					<div class="form-group col-md-6">
                        <label for=""><spring:message code="lost.deviceType" /> <span class="star">*</span></label>
                        <select class="form-control" id="deviceType"  required="required">
                        <option value=""  selected><spring:message code="select.deviceType" />
                      </select>
                    </div>
                     <div class="form-group col-md-6">
                     <label for=""><spring:message code="stolen.serialNumber" /> </label>
                     <input type="text" maxlength="10" autocomplete="off" class="form-control" id="serialNumber"  placeholder="<spring:message code="placeholder.serialNumber" />"
                      pattern="<spring:eval expression="@environment.getProperty('pattern.serialNumber')" />"
											    oninput="InvalidMsg(this,'input','<spring:message code="stolen.serialNumber.validation" />');"
												oninvalid="InvalidMsg(this,'input','<spring:message code="stolen.serialNumber.validation" />');" 
                      >
                     </div>
					

                </div>
                <div class="form-row">
                <div class="form-group col-md-6">
                        <label for=""><spring:message code="stolen.devicePurchaseInvoice" /> <span class="star">*</span></label>
                        <div id="file-input-wrapper1" class="file-input-wrapper">
                        <input type="file" id="stolenMobileInvoice" onchange="isPdfAndImageValid('stolenMobileInvoice',1)" required class="input-file mb-1 stolenFiles" accept="image/*,.pdf">
                        <span id="file-name" class="file-name"></span>
                        <div class="custom-file-button"><spring:message code="stolen.ChooseFile" /></div>
                       </div>
                        <p><small><spring:message code="stolen.invoiceType" /></small></p>
                     </div>
                </div>
                 <h4><spring:message code="stolen.InfoHeading" /></h4>

                <div class="form-row">
                    <div class="form-group col-md-6">
                        <label for=""><spring:message code="stolen.date" /> <span class="star">*</span></label>
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
                      <div class="form-group col-md-6">
                        <label for=""><spring:message code="lost.policeStation" /> <span class="star">*</span></label>
                        <select class="form-control" id="policeStation"  required="required">
                        <option value=""  selected><spring:message code="select.PoliceStation" />
                        </select>
                      </div>

                  </div>
               <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for=""><spring:message code="lost.category" /> <span class="star">*</span></label>
                                  <select class="form-control" id="category"  required="required">
                                    <option value="" ><spring:message code="select.category" />
                                    <option value="1" ><spring:message code="select.categoryLost" />
                                    <option value="2"  ><spring:message code="select.categoryStolen" />
                                  </select>
                   </div>
                  <div class="form-group col-md-6">
                                        <label for=""><spring:message code="stolen.incident" /><span class="star">*</span> </label>
                                        <textarea class="form-control" id="incidentDetail" rows="2" maxlength="1000"
                                        placeholder="<spring:message code="placeholder.incident" />" required="" title=" "
                                        oninput="validateTextarea(this,'stolenLostButton','error-message','<spring:eval expression='@environment.getProperty(\"pattern.Incident\")'/>')"
                                        data-tooltip-id="892d22b4-0262-51ca-d0b3-0c5ced343cb3"></textarea>

                              <p id="error-message" style="color: red; display: none;"><spring:message code="validation.StolenInicdent" /></p>
                  </div>
               </div>

                
                 <h4><spring:message code="lost.Nationality" /></h4>
                <div class="form-row">
                   <div class="form-group col-md-6">
                        <label for=""><spring:message code="lost.Nationality" /> <span class="star">*</span></label>
                        <select class="form-control" id="ownerNationality" required="required" onchange="chooseNationality()">
                         <option value=""  selected><spring:message code="selectNationality" />
                      </select>
                      </div>
                </div>
 <h4><spring:message code="stolen.personalInfo" /></h4> 
                <div class="form-row">
                  <div class="form-group col-md-6">
                      <label for=""><spring:message code="stolen.owner" /> <span class="star">*</span></label>
                      <input type="text" required autocomplete="off" class="form-control " id="stolenOwner"  placeholder="<spring:message code="placeholder.name" />"
                       pattern="<spring:eval expression="@environment.getProperty('pattern.ownerName')" />"  
											    oninput="InvalidMsg(this,'input','<spring:message code="validation.Stolen20Character" />');"
												oninvalid="InvalidMsg(this,'input','<spring:message code="validation.Stolen20Character" />');"  >
                    </div>

                    <div class="form-group col-md-6" id="ownerEmailDiv" >
                      <label for=""><spring:message code="stolen.email" /> <span class="star">*</span></label>
                      <input type="text" class="form-control" maxlength="50" autocomplete="off" id="stolenEmail" required placeholder="<spring:message code="placeholder.email" />"
                        pattern="<spring:eval expression="@environment.getProperty('pattern.mail')" />"  
											    oninput="InvalidMsg(this,'input','<spring:message code="validation.stolenEmail" />');"
												oninvalid="InvalidMsg(this,'input','<spring:message code="validation.stolenEmail" />');">
                    </div>
                    
                    
                    <div class="form-group col-md-6" id="ownerDOBlDiv" style="display: none">
                        <label for=""><spring:message code="stolen.ownwerDOB" /> <span class="star">*</span></label>
                        <input type="date"  id="ownerDOB" class="form-control text-uppercase" >
                      </div>
                   

                   
              </div>
			<div class="form-row">
			 <div class="form-group col-md-6">
                      <label for=""><spring:message code="stolen.Address1" /> <span class="star">*</span></label>
                      <input type="text" required autocomplete="off" class="form-control" id="stolenOwnerAddress1" placeholder="<spring:message code="placeholder.address1" />"
                       pattern="<spring:eval expression="@environment.getProperty('pattern.address')" />"  
											    oninput="InvalidMsg(this,'input','<spring:message code="validation.StolenAddress20characters" />');"
												oninvalid="InvalidMsg(this,'input','<spring:message code="validation.StolenAddress20characters" />');">
                    </div>

                <div class="form-group col-md-6">
                    <label for=""><spring:message code="stolen.Address2" />  </label>
                    <input type="text" class="form-control" autocomplete="off" id="stolenOwnerAddress2" placeholder="<spring:message code="placeholder.address2" />"
                     pattern="<spring:eval expression="@environment.getProperty('pattern.address')" />"  
											    oninput="InvalidMsg(this,'input','<spring:message code="validation.StolenAddress20characters" />');"
												oninvalid="InvalidMsg(this,'input','<spring:message code="validation.StolenAddress20characters" />');">
                  </div>
</div>
				<div class="form-row">
              
            
                <div class="form-group col-md-6" id="ownerNIDdiv">
                  <label for=""> <spring:message code="stolen.nid" />  <span class="star">*</span></label>
                  <input type="text" maxlength="13" autocomplete="off" required class="form-control" id="stolenOwnerNID" placeholder="<spring:message code="placeholder.nid" />"
                   pattern="<spring:eval expression="@environment.getProperty('pattern.nid')" />"  
											    oninput="InvalidMsg(this,'input','<spring:message code="validation.Stolen12NID" />');"
												oninvalid="InvalidMsg(this,'input','<spring:message code="validation.Stolen12NID" />');">
                </div>
                
                <div class="form-group col-md-6" id="ownerPassportDiv" style="display:none">
                  <label for=""> <spring:message code="stolen.passport" />  <span class="star">*</span></label>
                  <input type="text" maxlength="13" autocomplete="off" class="form-control" id="stolenOwnerPassport" placeholder="<spring:message code="placeholder.passport" />"
                   pattern="<spring:eval expression="@environment.getProperty('pattern.nid')" />"  
											    oninput="InvalidMsg(this,'input','<spring:message code="validation.Stolen12NID" />');"
												oninvalid="InvalidMsg(this,'input','<spring:message code="validation.Stolen12NID" />');">
                </div>

               <%--  <div class="form-group col-md-6" id="otpContactDiv">
                  <label for=""><spring:message code="stolen.OTPContact" /> <span class="star">*</span></label>
                  <input type="text" maxlength="10" autocomplete="off" required class="form-control" id="stolenOwnerOTPContact" placeholder="<spring:message code="placeholder.contact" />"
                   pattern="<spring:eval expression="@environment.getProperty('pattern.contactNo')" />"  
											    oninput="InvalidMsg(this,'input','<spring:message code="validation.StolenContact" />');"
												oninvalid="InvalidMsg(this,'input','<spring:message code="validation.StolenContact" />');">
                </div> --%>
                
                 <div class="form-group col-md-6" id="otpContactDiv">
                        <label for=""><spring:message code="stolen.OTPContact" /> <span class="star">*</span></label>
                       <div class="flex">
                        <div class="input-group-prepend">
                        <span class="caller" id="">+855</span>
                      </div>
                   <input type="text" maxlength="9" autocomplete="off" required class="form-control border-none pl-0" id="stolenOwnerOTPContact" placeholder="<spring:message code="placeholder.contact" />"
                   pattern="<spring:eval expression="@environment.getProperty('pattern.StolencontactNo')" />"  
				   oninput="InvalidMsg(this,'input','<spring:message code="validation.StolenContact" />');"
				   oninvalid="InvalidMsg(this,'input','<spring:message code="validation.StolenContact" />');">
				   </div></div>
                
                <div class="form-group col-md-6" id="otpEmailDiv" style="display:none">
                      <label for=""><spring:message code="stolen.emailPassport" /> <span class="star">*</span></label>
                      <input type="text" class="form-control" maxlength="50" autocomplete="off" id="stolenOtpEmail" placeholder="<spring:message code="placeholder.email" />"
                        pattern="<spring:eval expression="@environment.getProperty('pattern.mail')" />"  
											    oninput="InvalidMsg(this,'input','<spring:message code="validation.stolenEmail" />');"
												oninvalid="InvalidMsg(this,'input','<spring:message code="validation.stolenEmail" />');">
                    </div>
          </div>

        <div class="form-row">
          <div class="form-group col-md-12">
            <label for="" id="NIDblockLabel"><spring:message code="stolen.nidUpload" /> <span class="star">*</span></label>
             <label for="" id="PassportblockLabel"style="display: none"><spring:message code="stolen.passportUpload" /> <span class="star">*</span></label>
            <div id="file-input-wrapper" class="file-input-wrapper1">
            <input type="file" required class="input-file mb-1 stolenFiles" id="stolenOwnerNIDfile" onchange="isPdfAndImageValid('stolenOwnerNIDfile',1)" accept="image/*,.pdf">
            <span id="file-nameNid" class="file-nameNid"></span>
            <div class="NidFile"><spring:message code="stolen.ChooseFile" /></div>
            </div>

            <p><small><spring:message code="stolen.complaintCopyType" /></small></p>
            </div>
      </div>   
      
      <div class="form-group">
      <p class="mt-2 mb-6"><spring:message code="stolen.Mandatory" /> <span class="red">*</span></p>
      <div class="form-check">
        <input class="form-check-input" type="checkbox" id="gridCheck" required>
        <label class="form-check-label" for="gridCheck"><spring:message code="stolen.Declaration" />
          
        </label>
      </div>
    </div>
    
    <div class="form-group">
											 <div class="g-recaptcha" data-callback="recaptchaCallback" data-sitekey="<spring:eval expression="@environment.getProperty('captcha.dataSitekey')" />"></div>
											<!--<div class="g-recaptcha" data-callback="recaptchaCallback" data-sitekey="6LfCwuUpAAAAAKOtJvGQbL2OWYzzQHBv5kcKpDq8"></div>-->
											<!-- <div class="g-recaptcha"  data-sitekey="6LeLYSwmAAAAAFPrU8jvMZc1ziENdczQw9tZ4QYZ"></div> -->
											<span id="errorMsgOnModal"  class="text-danger" style="display: none" ><spring:message code="imei.invalidCaptcha" /></span>
											</div>
			<div class="row">
                <div class="col-lg-12">
                    <div class="no-border flex-end">
                      <button type="submit" id="stolenLostButton" class="btn save-button-dark"><spring:message code="button.submit" /></button>
                    </div>
                </div>
            </div> 
            
				</form>
        </div>
            
        </div><!------Status-form close------>



<div class="Validate-form" id="verifyOtpForm" style="display:none">
           <div class="UnBlock" style="padding-top: 1px !important;">
            <h1 class="mb-4 mb-70" ><spring:message code="OTP.heading" />  </h1>
            <h6 class="mb-4"><spring:message code="OTP.verficationequest" /></h6>
            <h6 class="mb-2"><spring:message code="OTP.verficationequest1" /></h6>
            <P id="phoneNumberOTP"><spring:message code="OTP.verficationequest2" /> </P>
			<P id="emailOTPMsg" style="display:none"><spring:message code="OTP.emailMsg" /> </P>
            <div class="Validate-box">
                <form onsubmit="return submitOTPRequest()" action="" >
                    <div class="form-group text-center mt-20" id="inputs">
                    
                    <input class="otp" autocomplete="off" type="text" required oninput='digitValidate(this)' id="OtpBox1" onkeyup='tabChange(1)' maxlength=1 >
                    <input class="otp" autocomplete="off" type="text" required oninput='digitValidate(this)' id="OtpBox2" onkeyup='tabChange(2)' maxlength=1 >
                    <input class="otp" autocomplete="off" type="text" required oninput='digitValidate(this)' id="OtpBox3" onkeyup='tabChange(3)' maxlength=1 >
                    <input class="otp" autocomplete="off" type="text" required oninput='digitValidate(this)' id="OtpBox4" onkeyup='tabChange(4)' maxlength=1 >
                     <input class="otp" autocomplete="off" type="text" required oninput='digitValidate(this)' id="OtpBox5" onkeyup='tabChange(5)' maxlength=1 >
                    <input class="otp" autocomplete="off" type="text" required oninput='digitValidate(this)' id="OtpBox6" onkeyup='tabChange(6)' maxlength=1 >
                    <input type="text" id="OTPRequestId" style=display:none >
                
                  
                    <div class="col-md-12 mb-2 text-left timer">
                        <a href="#" id="resendOTPclick" ><spring:message code="OTP.resend" />  </a>
                        <p id="resendOTPclick_time" ><spring:message code="OTP.timeDuration" /> <span id="countdown"></span></p>
                    </div>
                    <%-- <div class="col-md-3"> <a href="ForgotTicket.html" class="btn-block text-right"><spring:message code="OTP.back" /></a></div> --%>
                  
                </div>
                
                  <%-- <button type="button" class="btn cancel-btn"><spring:message code="OTP.back" /></button> --%>
                   <div class="no-border center">

                  <button type="button" onclick="backToSaveForm()" class="btn cancel-btn"><spring:message code="OTP.back" /></button>
                  <button type="submit" class="btn save-button-dark"><spring:message code="OTP.verify" /></button>
                  </div>
                  </form>
            </div>

           
        </div>
            
        </div>

	 <div class="Status-form" style="display:none" id="successOTPScreen">
           <div class="UnBlock" style="padding-top: 1px !important;">
            <p><img src="${context}/resources/assets/images/check.png" alt="logo" class="img-fluid"></p>
            <h1 style="font-size: 2.5rem !important;"><spring:message code="verifyOTPOTP.h1Msg" /> </h1>
          <p id="verifyOTPrequestid"><spring:message code="verifyOTPOTP.p1Msg" />  </p>
          <p><spring:message code="verifyOTPOTP.p2Msg" />.<br> <spring:message code="verifyOTPOTP.p3Msg" /></p>
              <a href="${context}/request?type=0"    class="btn save-button-dark" style="margin-top: 20px;" ><spring:message code="Stolen.done" /></a>
        </div>
            
        </div>
        
         <div class="Status-form" style="display:none" id="otplimitExceed">
           <div class="UnBlock">
            <p class="Rejected"><img src="${context}/resources/assets/images/limitaccess.png" alt="logo" class="img-fluid"></p>
            <h1><spring:message code="verifyOTPOTP.limitExceed" /> </h1>
           <button type="submit" onclick="viewSaveForm('stolenFormBlock')" class="btn save-button-dark"><spring:message code="OTP.back" /></button>
        </div>
            
        </div>
        <%-- <div class="sidear-footer"><spring:message code="stolen.copyright" /></div> --%>
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
          <spring:message code="input.tacNotexist" /><br>
            <spring:message code="input.tacNotexist1" />
        </p>
      </div>
    </div>
  </div>
</div>

<div class="modal fade modalBackdrop hidden"  data-toggle="modal fade" data-target="12331" id="invalidInvalidDetail" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" style="display:none">
  <div class="modal-dialog modal-sm transform-10" id="12331" role="document">
    <div class="modal-content">
      <div class="modal-body">
        <button type="button" class="alert-close close"  onclick="closeModal('invalidInvalidDetail')" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true"><img src="${context}/resources/assets/images/close.png" alt="close"></span>
        </button>

        <p class="Rejected">
          <spring:message code="input.tacDeatilsInvalid" /><br>
            <spring:message code="input.tacDeatilsInvalid1" />
        </p>
      </div>
    </div>
  </div>
</div>


<div class="modal fade modalBackdrop hidden"  data-toggle="modal fade" data-target="123311" id="invalidTACBlock" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" style="display:none">
  <div class="modal-dialog modal-sm transform-10" id="123311" role="document">
    <div class="modal-content">
      <div class="modal-body">
        <button type="button" class="alert-close close"  onclick="closeModal('invalidTACBlock')" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true"><img src="${context}/resources/assets/images/close.png" alt="close"></span>
        </button>
 
        <p class="Rejected">
          <spring:message code="input.duplicteTAC" /><br>
            <spring:message code="input.duplicteTAC1" />
        </p>
      </div>
    </div>
  </div>
</div> 

<div class="modal fade modalBackdrop hidden"  data-toggle="modal fade" data-target="123311" id="duplicateIMEIBlock" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" style="display:none">
  <div class="modal-dialog modal-sm transform-10" id="12331" role="document">
    <div class="modal-content">
      <div class="modal-body">
        <button type="button" class="alert-close close"  onclick="closeModal('duplicateIMEIBlock')" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true"><img src="${context}/resources/assets/images/close.png" alt="close"></span>
        </button>
 
        <p class="Rejected">
        <spring:message code="input.duplicateIMEI" />
            <spring:message code="input.duplicateIMEI2" />
        </p>
      </div>
    </div>
  </div>
</div>  


<!-------------- Modal National ID Close-------------->
	   
<!--------------invalid Mobile number modal  -------------->
 <div class="modal fade modalBackdrop hidden"  data-toggle="modal fade" data-target="123318911" id="invalidMobileNumber" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle2" aria-hidden="true" style="display:none">
  <div class="modal-dialog modal-sm transform-10" id="1233189" role="document">
    <div class="modal-content">
      <div class="modal-body">
        <button type="button" class="alert-close close"  onclick="closeModal('invalidMobileNumber')" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true"><img src="${context}/resources/assets/images/close.png" alt="close"></span>
        </button>
 
        <p class="Rejected">
          <spring:message code="input.invalidMobileNumber" />
        </p>
      </div>
    </div>
  </div>
</div>

<!--------- model for file formate ---->

<div class="modal fade modalBackdrop hidden"  data-toggle="modal fade" data-target="123318911" id="fileFormateModal1" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle2" aria-hidden="true" style="display:none">
  <div class="modal-dialog modal-sm transform-10" id="1233189" role="document">

    <div class="modal-content">
      <div class="modal-body">
        <button type="button" class="alert-close close"  onclick="closeModal('invalidMobileNumber')" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true"><img src="${context}/resources/assets/images/close.png" alt="close"></span>
        </button>

        <p class="Rejected">
          <h6 id="fileErrormessage1"><spring:message code="fileValidationName" /><br> <br> <spring:message code="fileValidationFormate" /> <br><br> <spring:message code="fileValidationSize" /> </h6>
        </p>
      </div>
    </div>
  </div>
</div>
<!--------- model for file formate ---->

<div id="fileFormateModal11" class="modal">
		<h6 class="modal-header"><spring:message code="fileValidationModalHeader" /></h6>
		<div class="modal-content">
			<div class="row">
				<h6 id="fileErrormessage11"><spring:message code="fileValidationName" /><br> <br> <spring:message code="fileValidationFormate" /> <br><br> <spring:message code="fileValidationSize" /> </h6>
			</div>
			<div class="row">
				<div class="input-field col s6 center">
					<div class="input-field col s6 center">
						<button class=" btn" onclick="clearFileName()"
							style="margin-left: 10px;"><spring:message code="modal.ok" /></button>
					</div>
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
	
	<!-- Save Modal -->
<div class="modal fade" id="saveConfirmationMessage" role="dialog">
<div class="modal-dialog modal-sm">
<div class="modal-content success-popup">
<div class="modal-body">
<p><img src="${context}/resources/assets/images/check.svg" alt="" class="">  <spring:message code="modal.requestOtpResent" /></p>
</div>
</div>
</div>
</div>
<!-- Save Modal close-->

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
        		src="${context}/resources/project_js/LostStolen.js?version=<%= (int) (Math.random() * 10) %>"></script>
		<script type="text/javascript"
		src="${context}/resources/project_js/globalVariables.js?version=<%= (int) (Math.random() * 10) %>"></script>
	<script type="text/javascript"
		src="${context}/resources/project_js/backbutton.js?version=<%= (int) (Math.random() * 10) %>"></script>
	<script type="text/javascript"
		src="${context}/resources/project_js/dragableModal.js?version=<%= (int) (Math.random() * 10) %>"></script>
	<script type="text/javascript"
		src="${context}/resources/project_js/enterKey.js?version=<%= (int) (Math.random() * 10) %>"></script>


			<script type="text/javascript"
		src="${context}/resources/project_js/validationMsg.js?version=<%= (int) (Math.random() * 10) %>"></script>
	<script type="text/javascript"
		src="${context}/resources/project_js/_dateFunction.js?version=<%= (int) (Math.random() * 10) %>" async></script>
		
			<script type="text/javascript"
		src="" async></script>
<%-- <script type="text/javascript">$( document ).ready(function() {if($("body").attr("data-roleType") == '' || ($("body").attr("data-roleType") != window.parent.$("body").attr("data-roleType"))){window.top.location.href = "./login?isExpired=yes";} var timeoutTime = <%=session.getLastAccessedTime()%>;var timeout = <%=session.getMaxInactiveInterval()%>;timeoutTime += timeout;var currentTime;$("body").click(function(e) {$.ajaxSetup({headers:{ 'X-CSRF-TOKEN': $("meta[name='_csrf']").attr("content") }});$.ajax({url: './serverTime',type: 'GET',async: false,success: function (data, textStatus, jqXHR) {currentTime = data;},error: function (jqXHR, textStatus, errorThrown) {}});if( currentTime > timeoutTime ){window.top.location.href = "./login?isExpired=yes";}else{timeoutTime = currentTime + timeout;}});});</script> --%>

<script type="text/javascript"
		src="${context}/resources/ajax/keyBoardShortcut.js?version=<%= (int) (Math.random() * 10) %>"></script>
		
		<script type="text/javascript"
		src="${context}/resources/project_js/otp.js?version=<%= (int) (Math.random() * 10) %>"></script>
		<script type="text/javascript"
		src="${context}/resources/project_js/addressDropdowns.js?version=<%= (int) (Math.random() * 10) %>"></script>
	
		<script src="${context}/resources/custom_js/jquery.blockUI.js"></script>
</body></html>


