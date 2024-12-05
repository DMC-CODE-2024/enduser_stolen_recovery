package org.gl.ceir.CeirPannelCode.Controller;

import java.io.BufferedOutputStream;
import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.gl.ceir.CeirPannelCode.PropertyReader;
import org.gl.ceir.CeirPannelCode.Feignclient.FeignCleintImplementation;
import org.gl.ceir.CeirPannelCode.Feignclient.FileCopierFeignClient;
import org.gl.ceir.CeirPannelCode.Model.AddMoreFileModel;
import org.gl.ceir.CeirPannelCode.Model.CopyFileRequest;
import org.gl.ceir.CeirPannelCode.Model.Destination;
import org.gl.ceir.CeirPannelCode.Model.GenricResponse;
import org.gl.ceir.CeirPannelCode.Model.LostStolenModel;
import org.gl.ceir.CeirPannelCode.Model.OTPRequest;

import org.gl.ceir.CeirPannelCode.Request.LocResponse;
import org.gl.ceir.CeirPannelCode.Util.UtilDownload;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import com.google.gson.Gson;

@Controller
public class LostStolenController {

	
	private final Logger log = LoggerFactory.getLogger(getClass());

	@Autowired
	UtilDownload utildownload;
	
	@Autowired
    PropertyReader propertyReader;

	@Autowired
	AddMoreFileModel addMoreFileModel,urlToUpload,urlToMove;
	
	@Autowired

	FeignCleintImplementation feignCleintImplementation;
	
	@Autowired
	FileCopierFeignClient fileCopierFeignClient;
	
	@RequestMapping(value={"/request"},method={org.springframework.web.bind.annotation.RequestMethod.GET,org.springframework.web.bind.annotation.RequestMethod.POST})
	public ModelAndView  viewLostStolenRecovery( HttpSession session , HttpServletRequest request,
			@RequestParam(name="type" ,required = false,defaultValue = "0") Integer type,@RequestParam(name="lang",required = false,defaultValue = "en") String lang) {
		ModelAndView mv = new ModelAndView();
		String locUrl=propertyReader.locationFeignClientPath;
		String testing=propertyReader.testing;
		mv.addObject("lang", lang);
		String ipAddress = request.getRemoteAddr();
		log.info("request send to the get location api="+locUrl+" and IP Is ["+ipAddress+"] and test status ["+testing+"]");
		try {
			if(testing.equalsIgnoreCase("false")) {
				if(!checkLocation(ipAddress,locUrl)) {
					  log.info("Non cambodian user ,returing to error page");
					  mv.setViewName("NonCambodianUser"); 
					  return mv; 
					  }	
			}
			
		} catch (IOException e1) {
			// TODO Auto-generated catch block
			log.info("ip locaton error."+e1);
		}
		try {
			
			  if(type==0) {
				mv.setViewName("LostStolen");
			}
			else if(type==1) {
				mv.setViewName("FoundRecovery");
			}
			else if(type==2) {
				mv.setViewName("CheckRequestID");
			}
			
		}
		catch (Exception e) {
			// TODO: handle exception
			log.info("this is catch block session is blank or something went wrong."+e);
		}
				
				return mv; 
			}
	
	
			public boolean checkLocation(String ip,String url ) throws IOException {
				String ipType="ipv4";
				if(ip.contains(":")) {
					ipType="ipv6";
				}
		        String json = "{\"ip\":\""+ip+"\",\"ipType\":\""+ipType+"\"}";
		        URL obj = new URL(url);
		        HttpURLConnection con = (HttpURLConnection) obj.openConnection();
		        con.setRequestMethod("POST");
		        con.setRequestProperty("Content-Type", "application/json");
		        con.setDoOutput(true);
		 
		        DataOutputStream wr = new DataOutputStream(con.getOutputStream());
		        wr.writeBytes(json);
		        wr.flush();
		        wr.close();
		 
		        int responseCode = con.getResponseCode();
		        System.out.println("Response Code: " + responseCode);
		        BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));
		        String inputLine;
		        StringBuffer response = new StringBuffer();
		 
		        while ((inputLine = in.readLine()) != null) {
		            response.append(inputLine);
		        }
		        in.close();
		        log.info("location response from api " +response.toString());
		        Gson gson=new Gson();
		        LocResponse resp=gson.fromJson(response.toString(), LocResponse.class);
		        log.info("Gson location response from api " +resp.toString());
		        if(resp.getStatusCode()==202 || resp.getStatusCode()==200 ) {
		        	return true;
		        }else {
		        	return false;
		        }
				//return response.toString();
			}
	//@PostMapping("lawfulIndivisualStolen")
	@RequestMapping(value= {"/lostStolenSave"},method= RequestMethod.POST,consumes = "multipart/form-data") 
	public @ResponseBody GenricResponse register(@RequestParam(name="file",required = false) MultipartFile file,
			@RequestParam(name="nidFileName",required = false) MultipartFile nidFileName,
			HttpServletRequest request,HttpSession session) {
		log.info("inside controller lost Stolen-------request---------"+request.getParameter("request"));

		//String userName=session.getAttribute("username").toString();
		//Integer userId= (Integer) session.getAttribute("userid");
		//String roletype=session.getAttribute("usertype").toString();
		//String name=session.getAttribute("name").toString();
		String txnNumber="L" + utildownload.getTxnId();
		log.info("Random transaction id number="+txnNumber);
		
		  CopyFileRequest fileCopyRequest=new CopyFileRequest(); 
		  ArrayList<Destination> destination=new ArrayList<Destination>(); 
		  Destination dest=new Destination();
		 
		
		CopyFileRequest fileCopyRequest1=new CopyFileRequest();
		ArrayList<Destination> destination1=new ArrayList<Destination>();

        Destination dest1=new Destination();
		//String filter = request.getParameter("request");
	//	String filter = request.getParameter("request").replace("&#34;", "\"");
		String filter = request.getParameter("request").replace("&#34;", "\"").replace("&#64;", "@");
	//	FileCopyToOtherServer fileCopyRequest= new FileCopyToOtherServer();

		addMoreFileModel.setTag("system_upload_filepath");
		urlToUpload=feignCleintImplementation.addMoreBuutonCount(addMoreFileModel);
		
				
				try {

					byte[] bytes = file.getBytes();
					String rootPath = urlToUpload.getValue()+"/"+txnNumber+"/"; 
							File dir =   new File(rootPath + File.separator);
							File dir1 =   new File(urlToUpload.getValue()+txnNumber+"/" + File.separator);
							if (!dir.exists())
								{
								dir.mkdirs(); // Create the file on server // Calendar now = Calendar.getInstance();
								dir.setReadable(true,false);
								dir.setWritable(true,false);
								dir.setExecutable(true,false);
								dir1.setReadable(true,false);
								dir1.setWritable(true,false);
								dir1.setExecutable(true,false);
								}
							File serverFile = new File(rootPath+file.getOriginalFilename());
							log.info("uploaded file path on server" + serverFile); BufferedOutputStream
							stream = new BufferedOutputStream(new FileOutputStream(serverFile));
							serverFile.setExecutable(true,false);
							serverFile.setReadable(true,false);
							serverFile.setWritable(true,false);
							stream.write(bytes); stream.close();
							//dest.setDestFilePath(rootPath);
							dest.setDestFilePath(propertyReader.destFilePath+ txnNumber);
							dest.setDestServerName(propertyReader.destServerName);
							destination.add(dest);
							fileCopyRequest.setDestination(destination);
							fileCopyRequest.setSourceFilePath(rootPath);
							fileCopyRequest.setTxnId(txnNumber);
							fileCopyRequest.setSourceFileName(file.getOriginalFilename());
							fileCopyRequest.setSourceServerName(propertyReader.sourceServerName);
							fileCopyRequest.setAppName("Bulk File Upload");
							fileCopyRequest.setRemarks("File Copy mango one server to mango2");
							log.info("request passed to for uploaded_file_to_sync DB Mobile invoice==" + fileCopyRequest);
							GenricResponse FileUploadResponse = fileCopierFeignClient.saveCopyFileOnANotherServer(fileCopyRequest);
							log.info("file move api response Mobile invoice===" + FileUploadResponse);
							//  grievanceRequest.setFileName(file.getOriginalFilename());

				}
				catch (Exception e) { //
					// TODO: handle exception e.printStackTrace(); }

					// set reaquest parameters into model class

				}
				
				try {

					byte[] bytes = nidFileName.getBytes();
					String rootPath = urlToUpload.getValue()+"/"+txnNumber+"/"; 
							File dir =   new File(rootPath + File.separator);
							File dir1 =   new File(urlToUpload.getValue()+txnNumber+"/" + File.separator);
							if (!dir.exists())
								{
								dir.mkdirs(); // Create the file on server // Calendar now = Calendar.getInstance();
								dir.setReadable(true,false);
								dir.setWritable(true,false);
								dir.setExecutable(true,false);
								dir1.setReadable(true,false);
								dir1.setWritable(true,false);
								dir1.setExecutable(true,false);
								}
							File serverFile = new File(rootPath+nidFileName.getOriginalFilename());
							log.info("uploaded nid file  on server" + serverFile); BufferedOutputStream
							stream = new BufferedOutputStream(new FileOutputStream(serverFile));
							serverFile.setExecutable(true,false);
							serverFile.setReadable(true,false);
							serverFile.setWritable(true,false);
							stream.write(bytes); stream.close();
						//	dest1.setDestFilePath(rootPath);
							dest1.setDestFilePath(propertyReader.destFilePath+ txnNumber);
							dest1.setDestServerName(propertyReader.destServerName);
							destination1.add(dest1);
							fileCopyRequest1.setDestination(destination1);
							fileCopyRequest1.setSourceFilePath(rootPath);
							fileCopyRequest1.setTxnId(txnNumber);
							fileCopyRequest1.setSourceFileName(nidFileName.getOriginalFilename());
							fileCopyRequest1.setSourceServerName(propertyReader.sourceServerName);
							fileCopyRequest1.setAppName("Bulk File Upload");
							fileCopyRequest1.setRemarks("File Copy mango one server to mango2");
							log.info("request passed to for uploaded_file_to_sync DB in NID file  upload==" + fileCopyRequest1);
							GenricResponse FileUploadResponse = fileCopierFeignClient.saveCopyFileOnANotherServer(fileCopyRequest1);
							log.info("file move api response NID file  upload===" + FileUploadResponse);
							//  grievanceRequest.setFileName(file.getOriginalFilename());

				}
				catch (Exception e) { //
					// TODO: handle exception e.printStackTrace(); }

					// set reaquest parameters into model class

				}
			Gson gson= new Gson(); 
		log.info("*********"+filter);

		//addMoreFileModel.setTag("system_upload_filepath");
		//urlToUpload=feignCleintImplementation.addMoreBuutonCount(addMoreFileModel);

		LostStolenModel lawfulIndivisualStolen  = gson.fromJson(filter, LostStolenModel.class);
		log.info(""+lawfulIndivisualStolen.toString());
		lawfulIndivisualStolen.setRequestId(txnNumber);
		lawfulIndivisualStolen.setRequestType("Stolen");
		 lawfulIndivisualStolen.setMobileInvoiceBill(file.getOriginalFilename());

         
		 
		 String userAgent = request.getHeader("User-Agent");
	     String ip = request.getRemoteAddr();
	     lawfulIndivisualStolen.setPublicIp(ip);
	     lawfulIndivisualStolen.setUserAgent(userAgent);
	     lawfulIndivisualStolen.setBrowser(getBrowser(userAgent));
	     lawfulIndivisualStolen.setCreatedBy("End User");
	     lawfulIndivisualStolen.setRequestMode("Single");
		 lawfulIndivisualStolen.setDeviceOwnerNationalIdUrl(nidFileName.getOriginalFilename());
		log.info("request passed to the save stolen device api"+lawfulIndivisualStolen);
		GenricResponse response = new GenricResponse();
		try {
			response=feignCleintImplementation.saveStolenDevice(lawfulIndivisualStolen);
		log.info("---------response--------"+response);
		}
		catch (Exception e) {
			// TODO: handle exception
			log.info("exception in stolen lost"+e);
			e.printStackTrace();

		}
		return response;
	}
	
	
	@RequestMapping(value= {"/lostStolenUpdate"},method= RequestMethod.POST,consumes = "multipart/form-data") 
	public @ResponseBody GenricResponse UpdateDevice(@RequestParam(name="file",required = false) MultipartFile file,
			@RequestParam(name="nidFileName",required = false) MultipartFile nidFileName,
			HttpServletRequest request,HttpSession session) {
		log.info("inside controller lost Stolen-------request---------"+request.getParameter("request"));
		String filter = request.getParameter("request").replace("&#34;", "\"").replace("&#64;", "@");
		//String userName=session.getAttribute("username").toString();
		//Integer userId= (Integer) session.getAttribute("userid");
		//String roletype=session.getAttribute("usertype").toString();
		//String name=session.getAttribute("name").toString();
		Gson gson= new Gson(); 
		log.info("*********"+filter);
		LostStolenModel lawfulIndivisualStolen  = gson.fromJson(filter, LostStolenModel.class);
		String txnNumber=lawfulIndivisualStolen.getRequestId();
		log.info(" Request number is="+txnNumber);
		
	

		addMoreFileModel.setTag("system_upload_filepath");
		urlToUpload=feignCleintImplementation.addMoreBuutonCount(addMoreFileModel);
		
				if(file!=null) {
				try {

					byte[] bytes = file.getBytes();
					String rootPath = urlToUpload.getValue()+"/"+txnNumber+"/"; 
							File dir =   new File(rootPath + File.separator);
							File dir1 =   new File(urlToUpload.getValue()+txnNumber+"/" + File.separator);
							if (!dir.exists())
								{
								dir.mkdirs(); // Create the file on server // Calendar now = Calendar.getInstance();
								dir.setReadable(true,false);
								dir.setWritable(true,false);
								dir.setExecutable(true,false);
								dir1.setReadable(true,false);
								dir1.setWritable(true,false);
								dir1.setExecutable(true,false);
								}
							File serverFile = new File(rootPath+file.getOriginalFilename());
							log.info("uploaded file path on server" + serverFile); BufferedOutputStream
							stream = new BufferedOutputStream(new FileOutputStream(serverFile));
							serverFile.setExecutable(true,false);
							serverFile.setReadable(true,false);
							serverFile.setWritable(true,false);
							stream.write(bytes); stream.close();
							 lawfulIndivisualStolen.setMobileInvoiceBill(file.getOriginalFilename());
							 
							//  grievanceRequest.setFileName(file.getOriginalFilename());

				}
				catch (Exception e) { //
					// TODO: handle exception e.printStackTrace(); }

					// set reaquest parameters into model class

				}
				}
				else {
					 lawfulIndivisualStolen.setMobileInvoiceBill(lawfulIndivisualStolen.getPreviousMobileInvoice());
				}
				if(nidFileName!=null) {
				try {

					byte[] bytes = nidFileName.getBytes();
					String rootPath = urlToUpload.getValue()+"/"+txnNumber+"/"; 
							File dir =   new File(rootPath + File.separator);
							File dir1 =   new File(urlToUpload.getValue()+txnNumber+"/" + File.separator);
							if (!dir.exists())
								{
								dir.mkdirs(); // Create the file on server // Calendar now = Calendar.getInstance();
								dir.setReadable(true,false);
								dir.setWritable(true,false);
								dir.setExecutable(true,false);
								dir1.setReadable(true,false);
								dir1.setWritable(true,false);
								dir1.setExecutable(true,false);
								}
							File serverFile = new File(rootPath+nidFileName.getOriginalFilename());
							log.info("uploaded nid file  on server" + serverFile); BufferedOutputStream
							stream = new BufferedOutputStream(new FileOutputStream(serverFile));
							serverFile.setExecutable(true,false);
							serverFile.setReadable(true,false);
							serverFile.setWritable(true,false);
							stream.write(bytes); stream.close();
							 lawfulIndivisualStolen.setDeviceOwnerNationalIdUrl(nidFileName.getOriginalFilename());
							//  grievanceRequest.setFileName(file.getOriginalFilename());

				}
				catch (Exception e) { //
					// TODO: handle exception e.printStackTrace(); }

					// set reaquest parameters into model class

				}
				}
				else {
					 lawfulIndivisualStolen.setDeviceOwnerNationalIdUrl(lawfulIndivisualStolen.getPreviousNIDFile());
				}

		//addMoreFileModel.setTag("system_upload_filepath");
		//urlToUpload=feignCleintImplementation.addMoreBuutonCount(addMoreFileModel);

			

	            

		
		log.info(""+lawfulIndivisualStolen.toString());
		lawfulIndivisualStolen.setRequestType("Stolen");
		
		
		 String userAgent = request.getHeader("User-Agent");
	     String ip = request.getRemoteAddr();
	     lawfulIndivisualStolen.setPublicIp(ip);
	     lawfulIndivisualStolen.setUserAgent(userAgent);
	     lawfulIndivisualStolen.setBrowser(getBrowser(userAgent));
	     lawfulIndivisualStolen.setCreatedBy("End User");
	     lawfulIndivisualStolen.setRequestMode("Single");
	     
	     log.info("request passed to the save stolen device api"+lawfulIndivisualStolen);
		GenricResponse response = new GenricResponse();
		try {
			response=feignCleintImplementation.updateStolenDevice(lawfulIndivisualStolen);
		log.info("---------response--------"+response);
		}
		catch (Exception e) {
			// TODO: handle exception
			log.info("exception in stolen lost"+e);
			e.printStackTrace();

		}
		return response;
	}
	
	
	public static String getBrowser(String userAgent) {

	        String browser = "";

	        String version = "";

	        Integer startLen = 0;

	        Integer endLen = 0;

	        if (userAgent.toLowerCase().indexOf("msie") != -1) {

	            browser = "IE";

	            startLen = userAgent.toLowerCase().indexOf("msie");

	            endLen = userAgent.indexOf(";", startLen);

	            version = userAgent.substring(startLen + 5, endLen);

	        } else if (userAgent.toLowerCase().indexOf("trident/7") != -1) {

	            browser = "IE";

	            startLen = userAgent.toLowerCase().indexOf("rv:") + 3;

	            endLen = userAgent.indexOf(")", startLen);

	            version = userAgent.substring(startLen, endLen);

	        } else if (userAgent.toLowerCase().indexOf("chrome") != -1) {

	            browser = "CHROME";

	            startLen = userAgent.toLowerCase().indexOf("chrome") + 7;

	            endLen = userAgent.indexOf(" ", startLen);

	            version = userAgent.substring(startLen, endLen);

	        } else if (userAgent.toLowerCase().indexOf("firefox") != -1) {

	            browser = "FIREFOX";

	            startLen = userAgent.toLowerCase().indexOf("firefox") + 8;

	            endLen = userAgent.length();

	            version = userAgent.substring(startLen, endLen);
	 
	        } else if (userAgent.toLowerCase().indexOf("safari") != -1) {

	            browser = "SAFARI";

	            startLen = userAgent.toLowerCase().indexOf("version") + 8;

	            endLen = userAgent.indexOf(" ", startLen);

	            version = userAgent.substring(startLen, endLen);

	        } else if (userAgent.toLowerCase().indexOf("opera") != -1) {

	            browser = "OPERA";

	            startLen = userAgent.toLowerCase().indexOf("opera") + 6;

	            endLen = userAgent.length();

	            version = userAgent.substring(startLen, endLen);

	        } else {

	            browser = "OTHER";

	        }
	 
	        return browser + "_" + version;
	 
	    }
	@RequestMapping(value= {"/verifyOTPRequest"},method= RequestMethod.POST,consumes = "multipart/form-data") 
	public @ResponseBody GenricResponse OTPRequest(
			HttpServletRequest request,HttpSession session) {
		log.info("inside OTP verify request---------"+request.getParameter("request"));
		
		Gson gson= new Gson(); 
		String filter = request.getParameter("request").replace("&#34;", "\"");
		OTPRequest OTPrequest  = gson.fromJson(filter, OTPRequest.class);
		OTPrequest.setOtp(OTPrequest.getOtpBox1()+OTPrequest.getOtpBox2()+OTPrequest.getOtpBox3()+OTPrequest.getOtpBox4()+OTPrequest.getOtpBox5()+OTPrequest.getOtpBox6());
		String userAgent = request.getHeader("User-Agent");
	     String ip = request.getRemoteAddr();
	     OTPrequest.setPublicIp(ip);
	     OTPrequest.setUserAgent(userAgent);
	     OTPrequest.setBrowser(getBrowser(userAgent));
		log.info(" get otp request ="+ OTPrequest);
		GenricResponse response = new GenricResponse();
		response=feignCleintImplementation.verifyOTP(OTPrequest);
		log.info("response from verify OTP "+response);
		return response;
		}
	
	@RequestMapping(value= {"/verifyOTPRequestUpdatStolen"},method= RequestMethod.POST,consumes = "multipart/form-data") 
	public @ResponseBody GenricResponse verifyOTPRequestUpdatStolen(
			HttpServletRequest request,HttpSession session) {
		log.info("inside OTP verify request for stolen update form---------"+request.getParameter("request"));
		
		Gson gson= new Gson(); 
		String filter = request.getParameter("request").replace("&#34;", "\"");
		log.info("*********"+filter);
		OTPRequest OTPrequest  = gson.fromJson(filter, OTPRequest.class);
		OTPrequest.setOtp(OTPrequest.getOtpBox1()+OTPrequest.getOtpBox2()+OTPrequest.getOtpBox3()+OTPrequest.getOtpBox4()+OTPrequest.getOtpBox5()+OTPrequest.getOtpBox6());
		String userAgent = request.getHeader("User-Agent");
	     String ip = request.getRemoteAddr();
	     OTPrequest.setPublicIp(ip);
	     OTPrequest.setUserAgent(userAgent);
	     OTPrequest.setBrowser(getBrowser(userAgent));
		log.info(" get otp request ="+ OTPrequest);
		GenricResponse response = new GenricResponse();
		response=feignCleintImplementation.verifyOTPUpdateStolen(OTPrequest);
		log.info("response from verify OTP "+response);
		return response;
		}


	@RequestMapping(value= {"/verifyOTPCancelRequest"},method= RequestMethod.POST,consumes = "multipart/form-data")
	public @ResponseBody GenricResponse verifyOTPCancelRequest(
			HttpServletRequest request,HttpSession session) {
		Gson gson= new Gson();
		String filter = request.getParameter("request").replace("&#34;", "\"");
		OTPRequest OTPrequest  = gson.fromJson(filter, OTPRequest.class);
		OTPrequest.setOtp(OTPrequest.getOtpBox1()+OTPrequest.getOtpBox2()+OTPrequest.getOtpBox3()+OTPrequest.getOtpBox4()+OTPrequest.getOtpBox5()+OTPrequest.getOtpBox6());
		String userAgent = request.getHeader("User-Agent");
		String ip = request.getRemoteAddr();
		OTPrequest.setPublicIp(ip);
		OTPrequest.setUserAgent(userAgent);
		OTPrequest.setBrowser(getBrowser(userAgent));
		GenricResponse response = new GenricResponse();
		response=feignCleintImplementation.verifyCancelRequestOTP(OTPrequest);
		log.info("response from verify OTP "+response);
		return response;
	}
	@RequestMapping(value= {"/resendOTPRequest"},method= RequestMethod.POST,consumes = "multipart/form-data") 
	public @ResponseBody GenricResponse resendOTPRequest(
			HttpServletRequest request,HttpSession session) {
		log.info("inside  resend OTP  request---------"+request.getParameter("request"));
		
		Gson gson= new Gson(); 
		String filter = request.getParameter("request").replace("&#34;", "\"");
		log.info("*********"+filter);
		OTPRequest OTPrequest  = gson.fromJson(filter, OTPRequest.class);
		String userAgent = request.getHeader("User-Agent");
	     String ip = request.getRemoteAddr();
	     OTPrequest.setPublicIp(ip);
	     OTPrequest.setUserAgent(userAgent);
	     OTPrequest.setBrowser(getBrowser(userAgent));
		GenricResponse response = new GenricResponse();
		response=feignCleintImplementation.resendOTP(OTPrequest);
		log.info("response from resend OTP "+response);
		
		return response;
		}
	
	@RequestMapping(value= {"/getOTPRequest"},method= RequestMethod.POST,consumes = "multipart/form-data") 
	public @ResponseBody GenricResponse getOTPRequest(
			HttpServletRequest request,HttpSession session) {
		log.info("inside  get OTP  request---------"+request.getParameter("request"));
		
		Gson gson= new Gson(); 
		String filter = request.getParameter("request").replace("&#34;", "\"");
		log.info("*********"+filter);
		String txnNumber="R" + utildownload.getTxnId();
		log.info("Random recovery request id number="+txnNumber);
		LostStolenModel OTPrequest  = gson.fromJson(filter, LostStolenModel.class);
		OTPrequest.setOldRequestId(OTPrequest.getRequestId());
		OTPrequest.setRequestId(txnNumber);
		String userAgent = request.getHeader("User-Agent");
	     String ip = request.getRemoteAddr();
	     OTPrequest.setPublicIp(ip);
	     OTPrequest.setUserAgent(userAgent);
	     OTPrequest.setBrowser(getBrowser(userAgent));
	     OTPrequest.setCreatedBy("End User");
	     OTPrequest.setRequestMode("Single");
		GenricResponse response = new GenricResponse();
		response=feignCleintImplementation.getOTP(OTPrequest);
		log.info("response from resend OTP "+response);
		return response;
		}
	
	@RequestMapping(value= {"/getOTPForCheckRequest"},method= RequestMethod.POST,consumes = "multipart/form-data") 
	public @ResponseBody GenricResponse getOTPForCheckRequest(
			HttpServletRequest request,HttpSession session) {
		log.info("inside  check status request---------"+request.getParameter("request"));
		
		 Gson gson= new Gson(); 
		 String filter = request.getParameter("request").replace("&#34;", "\"");
		 log.info("*********"+filter);
		
		 LostStolenModel OTPrequest  = gson.fromJson(filter, LostStolenModel.class);
		 String userAgent = request.getHeader("User-Agent");
	     String ip = request.getRemoteAddr();
	     OTPrequest.setPublicIp(ip);
	     OTPrequest.setUserAgent(userAgent);
	     OTPrequest.setBrowser(getBrowser(userAgent));
	     OTPrequest.setCreatedBy("End User");
	     OTPrequest.setRequestMode("Single");
		GenricResponse response = new GenricResponse();
		response=feignCleintImplementation.getOTPForCheckRequest(OTPrequest);
		log.info("response from check status OTP "+response);
		return response;
		}
	@RequestMapping(value= {"/getOTPForCancelRequest"},method= RequestMethod.POST,consumes = "multipart/form-data")
	public @ResponseBody GenricResponse getOTPForCancelRequest(
			HttpServletRequest request,HttpSession session) {
		Gson gson= new Gson();
		String filter = request.getParameter("request").replace("&#34;", "\"");
		LostStolenModel OTPrequest  = gson.fromJson(filter, LostStolenModel.class);
		String userAgent = request.getHeader("User-Agent");
		String ip = request.getRemoteAddr();
		OTPrequest.setPublicIp(ip);
		OTPrequest.setUserAgent(userAgent);
		OTPrequest.setBrowser(getBrowser(userAgent));
		OTPrequest.setCreatedBy("End User");
		OTPrequest.setRequestMode("Single");
		GenricResponse response = new GenricResponse();
		response=feignCleintImplementation.getOTPForCancelRequest(OTPrequest);
		log.info("response from check status OTP "+response);
		return response;
	}
	
	
	@RequestMapping(value= {"/recoveryFoundSave"},method= RequestMethod.POST,consumes = "multipart/form-data") 
	public @ResponseBody GenricResponse recoverySave(HttpServletRequest request,HttpSession session) {
		String filter = request.getParameter("request").replace("&#34;", "\"");
		log.info("inside controller recovery-------request---------"+filter);
		
		Gson gson= new Gson(); 
		GenricResponse response = new GenricResponse();
		LostStolenModel lawfulIndivisualStolen  = gson.fromJson(filter, LostStolenModel.class);
		//lawfulIndivisualStolen.setRequestId(txnNumber);
		String userAgent = request.getHeader("User-Agent");
	     String ip = request.getRemoteAddr();
	     lawfulIndivisualStolen.setPublicIp(ip);
	     lawfulIndivisualStolen.setUserAgent(userAgent);
	     lawfulIndivisualStolen.setBrowser(getBrowser(userAgent));
		lawfulIndivisualStolen.setRequestType("Recover");
		lawfulIndivisualStolen.setCreatedBy("End User");
	     lawfulIndivisualStolen.setRequestMode("Single");
		response=feignCleintImplementation.saveRecoveryFound(lawfulIndivisualStolen);
		return response;
		
	}

	@RequestMapping(value= {"/saveCancelReason"},method= RequestMethod.POST,consumes = "multipart/form-data")
	public @ResponseBody GenricResponse saveCancelReason(HttpServletRequest request,HttpSession session) {
		String filter = request.getParameter("request").replace("&#34;", "\"");
		Gson gson= new Gson();
		GenricResponse response = new GenricResponse();
		LostStolenModel lawfulIndivisualStolen  = gson.fromJson(filter, LostStolenModel.class);
		String userAgent = request.getHeader("User-Agent");
		String ip = request.getRemoteAddr();
		lawfulIndivisualStolen.setPublicIp(ip);
		lawfulIndivisualStolen.setUserAgent(userAgent);
		lawfulIndivisualStolen.setBrowser(getBrowser(userAgent));
		log.info("Cancellation Reason request"+lawfulIndivisualStolen);
		response=feignCleintImplementation.saveCancelRequest(lawfulIndivisualStolen);
		log.info("Cancellation Reason response"+response);
		return response;

	}
	
	@RequestMapping(value= {"/checkRequestStatus"},method= RequestMethod.POST,consumes = "multipart/form-data") 
	public @ResponseBody GenricResponse checkRequestStatus(HttpServletRequest request,HttpSession session) {
		String filter = request.getParameter("request").replace("&#34;", "\"");
		log.info("inside controller recovery stolen check status-------request---------"+filter);
		Gson gson= new Gson(); 
		GenricResponse response = new GenricResponse();
		LostStolenModel lawfulIndivisualStolen  = gson.fromJson(filter, LostStolenModel.class);
		String userAgent = request.getHeader("User-Agent");
	     String ip = request.getRemoteAddr();
	     lawfulIndivisualStolen.setPublicIp(ip);
	     lawfulIndivisualStolen.setUserAgent(userAgent);
	     lawfulIndivisualStolen.setBrowser(getBrowser(userAgent));
		response=feignCleintImplementation.checkRequestStatus(lawfulIndivisualStolen);
		log.info("response---------"+response);
		return response;
	}
	
	@RequestMapping(value= {"/checkRequestId"},method= RequestMethod.POST,consumes = "multipart/form-data") 
	public @ResponseBody LostStolenModel checkRequestId(HttpServletRequest request,HttpSession session) {
		String filter = request.getParameter("request").replace("&#34;", "\"");
		log.info("inside controller check requestID -----request---------"+filter);
		Gson gson= new Gson(); 
		LostStolenModel response = new LostStolenModel();
		LostStolenModel lawfulIndivisualStolen  = gson.fromJson(filter, LostStolenModel.class);
		String userAgent = request.getHeader("User-Agent");
	     String ip = request.getRemoteAddr();
	     lawfulIndivisualStolen.setPublicIp(ip);
	     lawfulIndivisualStolen.setUserAgent(userAgent);
	     lawfulIndivisualStolen.setBrowser(getBrowser(userAgent));
		response=feignCleintImplementation.getByRequestID(lawfulIndivisualStolen);
		log.info("response---requestID -----"+response);
		return response;
	}
}
