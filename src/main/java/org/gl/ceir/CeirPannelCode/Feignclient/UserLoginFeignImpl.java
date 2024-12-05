package org.gl.ceir.CeirPannelCode.Feignclient;

import java.util.List;

import org.gl.ceir.CeirPannelCode.Model.AddressModel;
import org.gl.ceir.CeirPannelCode.Model.AddressResponse;
import org.gl.ceir.CeirPannelCode.Model.FilterRequest;
import org.gl.ceir.CeirPannelCode.Model.GenricResponse;
import org.gl.ceir.CeirPannelCode.Util.HttpResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
@Service
@FeignClient(url="${apiUrl1}",value = "loginUrls")
public interface UserLoginFeignImpl { 
	
	
	
	
	//*******************************District DropDown****************************************
	
	@PostMapping("/getDistrict")
	public @ResponseBody List<AddressResponse> getAllTagsDistrictFeign(AddressModel addressModel);
	
	//*******************************Commune DropDown****************************************
	
	@PostMapping("/getCommune")
	public @ResponseBody List<AddressResponse> getAllCommuneFeign(AddressModel addressModel);
	
	//*******************************Village DropDown****************************************
	
	@PostMapping("/getVillage")
	public @ResponseBody List<AddressResponse> getAllVillageFeign(AddressModel addressModel);
	
	//*******************************Province DropDown****************************************
	
	@GetMapping("/getProvince")
	public @ResponseBody List<AddressResponse> getAllProvinceFeign();
	
	//*******************************Address Data Table Feign****************************************
	
	@RequestMapping(value="/viewAllLocality" ,method=RequestMethod.POST) 
	public Object viewAllLocality(@RequestBody FilterRequest filterRequest,
	@RequestParam(value = "pageNo", defaultValue = "0") Integer pageNo,
	@RequestParam(value = "pageSize", defaultValue = "10") Integer pageSize,
	@RequestParam(value = "file", defaultValue = "0") Integer file);
	
	//***************************************************Delete Address Management Feign********************************
	
	
		
}

