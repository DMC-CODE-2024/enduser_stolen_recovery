package org.gl.ceir.CeirPannelCode.Request;
public class OTPRequest {

	private String otpBox1;
	private String otpBox2;
	private String otpBox3;
	private String otpBox4;
	private String otpBox5;
	private String otpBox6;
	private int statusCode;
	private String requestID;
	private String requestType;
	private String statusMsg;
	private String otp;
	private String oldRequestID;
	private String lang;
	
	
	public String getOtpBox1() {
		return otpBox1;
	}
	public void setOtpBox1(String otpBox1) {
		this.otpBox1 = otpBox1;
	}
	public String getOtpBox2() {
		return otpBox2;
	}
	public void setOtpBox2(String otpBox2) {
		this.otpBox2 = otpBox2;
	}
	public String getOtpBox3() {
		return otpBox3;
	}
	public void setOtpBox3(String otpBox3) {
		this.otpBox3 = otpBox3;
	}
	public String getOtpBox4() {
		return otpBox4;
	}
	public void setOtpBox4(String otpBox4) {
		this.otpBox4 = otpBox4;
	}
	public String getRequestID() {
		return requestID;
	}
	public void setRequestID(String requestID) {
		this.requestID = requestID;
	}
	public String getRequestType() {
		return requestType;
	}
	public void setRequestType(String requestType) {
		this.requestType = requestType;
	}
	public int getStatusCode() {
		return statusCode;
	}
	public void setStatusCode(int statusCode) {
		this.statusCode = statusCode;
	}
	public String getStatusMsg() {
		return statusMsg;
	}
	public void setStatusMsg(String statusMsg) {
		this.statusMsg = statusMsg;
	}
	public String getOtp() {
		return otp;
	}
	public void setOtp(String otp) {
		this.otp = otp;
	}
	public String getOldRequestID() {
		return oldRequestID;
	}
	public void setOldRequestID(String oldRequestID) {
		this.oldRequestID = oldRequestID;
	}
	
	public String getOtpBox5() {
		return otpBox5;
	}
	public void setOtpBox5(String otpBox5) {
		this.otpBox5 = otpBox5;
	}
	public String getOtpBox6() {
		return otpBox6;
	}
	public void setOtpBox6(String otpBox6) {
		this.otpBox6 = otpBox6;
	}
	
	public String getLang() {
		return lang;
	}
	public void setLang(String lang) {
		this.lang = lang;
	}
	@Override
	public String toString() {
		return "OTPRequest [otpBox1=" + otpBox1 + ", otpBox2=" + otpBox2 + ", otpBox3=" + otpBox3 + ", otpBox4="
				+ otpBox4 + ", otpBox5=" + otpBox5 + ", otpBox6=" + otpBox6 + ", statusCode=" + statusCode
				+ ", requestID=" + requestID + ", requestType=" + requestType + ", statusMsg=" + statusMsg + ", otp="
				+ otp + ", oldRequestID=" + oldRequestID + ", lang=" + lang + "]";
	}
	
	
//	@Override
//	public String toString() {
//		return "OTPRequest [otpBox1=" + otpBox1 + ", otpBox2=" + otpBox2 + ", otpBox3=" + otpBox3 + ", otpBox4="
//				+ otpBox4 + ", statusCode=" + statusCode + ", requestID=" + requestID + ", requestType=" + requestType
//				+ ", statusMsg=" + statusMsg + ", otp=" + otp + ", oldRequestID=" + oldRequestID + "]";
//	}
	
	
	
	
	
}
