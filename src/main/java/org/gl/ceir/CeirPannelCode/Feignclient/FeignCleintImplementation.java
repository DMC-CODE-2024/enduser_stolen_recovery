package org.gl.ceir.CeirPannelCode.Feignclient;

import org.gl.ceir.CeirPannelCode.Model.*;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import javax.servlet.jsp.tagext.Tag;
import java.util.List;
import java.util.Map;


@Service
@FeignClient(url = "${feignClientPath}",value = "dsj" )
public interface FeignCleintImplementation {


	@PostMapping("/system/viewTag")    
	public Dropdown dataByTag(Tag tag);       

	@RequestMapping(value="/system-config-list/by-tag-and-featureid/{tagId}/{featureId}" ,method=RequestMethod.GET) 
	public List<Dropdown> modeType(@PathVariable("tagId") String tagId, @PathVariable("featureId") Integer featureId);

	//Grace/ PostGrace Action Mapping

	@PostMapping(path ="gracePostgraceActionMapping")
	public @ResponseBody List<SystemConfigListDb> gracePostgraceActionMappingFiegn(@RequestParam(name = "tag", required = false) String tag);

	 @PostMapping("/system/viewTag")
	 public @ResponseBody AddMoreFileModel addMoreBuutonCount(AddMoreFileModel addMoreCount);

	  @RequestMapping(value = "system-config-list/{tag}", method = RequestMethod.GET)
	    public List<Dropdown> taxPaidStatusList(@PathVariable("tag") String tag);

	 
	 @PostMapping(value = "/lostStolen/save")
    public GenricResponse saveStolenDevice( @RequestBody LostStolenModel lostStolenModel);

    @PostMapping(value = "/verifyOTP")
    public GenricResponse verifyOTP( @RequestBody OTPRequest otpRequest);

    @PostMapping(value = "/resendOTP")
    public GenricResponse resendOTP( @RequestBody OTPRequest otpRequest);
    
    @PostMapping(value = "/recoveryFound/save")
    public GenricResponse saveRecoveryFound( @RequestBody LostStolenModel lostStolenModel);

    
    @PostMapping(value = "/checkRequestStatus")
    public GenricResponse checkRequestStatus( @RequestBody LostStolenModel lostStolenModel);
    
    @PostMapping(value = "/getOTP")
    public GenricResponse getOTP( @RequestBody LostStolenModel lostStolenModel);
    
    @PostMapping(value = "/getByRequestID")
    public LostStolenModel getByRequestID( @RequestBody LostStolenModel lostStolenModel);
    
    @PostMapping(value = "/lostStolen/update")
    public GenricResponse updateStolenDevice( @RequestBody LostStolenModel lostStolenModel);
    
    @PostMapping(value = "/verifyOTPUpdateStolen")
    public GenricResponse verifyOTPUpdateStolen( @RequestBody OTPRequest otpRequest);
    
    
    @PostMapping(value = "/getOTPForCheckRequest")
    public GenricResponse getOTPForCheckRequest( @RequestBody LostStolenModel lostStolenModel);

    @PostMapping(value = "/getOTPForCancelRequest")
    public GenricResponse getOTPForCancelRequest( @RequestBody LostStolenModel lostStolenModel);

    @PostMapping(value = "/verifyCancelRequestOTP")
    public GenricResponse verifyCancelRequestOTP( @RequestBody OTPRequest otpRequest);

    @PostMapping(value = "/saveCancelRequest")
    public GenricResponse saveCancelRequest( @RequestBody LostStolenModel lostStolenModel);

    @PostMapping(value = "/countryCodeList")
    public List<CountryCodeModel>  getCountryCode();

   /* @PostMapping("/v1/address-mgmt/address/getallDistrict")
    public @ResponseBody Map<String, List<?>> getAllTagsDistrictFeign(@RequestBody List<String> list);

    //*******************************Commune DropDown****************************************

    @PostMapping("/v1/address-mgmt/address/getallCommune")
    public @ResponseBody Map<String, List<?>>  getAllCommuneFeign(@RequestBody List<String> list);
*/

    @PostMapping("/v1/address-mgmt/address/getDistricts")
    public List<AddressResp> getDistrict(@RequestParam int id,@RequestParam String lang);

    @PostMapping("/v1/address-mgmt/address/getCommunes")
    public ResponseEntity<?> getCommune(@RequestParam int id,@RequestParam String lang);

    @PostMapping("/v1/address-mgmt/address/getPolices")
    public ResponseEntity<?> getPolice(@RequestParam int id,@RequestParam String lang);

    @PostMapping("/v1/address-mgmt/address/getProvinces")
    public @ResponseBody List<AddressResp>  getAllProvinceFeign(@RequestParam String lang);


}					





