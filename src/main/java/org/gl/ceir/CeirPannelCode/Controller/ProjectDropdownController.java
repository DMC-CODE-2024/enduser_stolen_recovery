package org.gl.ceir.CeirPannelCode.Controller;

import org.gl.ceir.CeirPannelCode.Feignclient.FeignCleintImplementation;
import org.gl.ceir.CeirPannelCode.Feignclient.GsmaFeignClient;
import org.gl.ceir.CeirPannelCode.Feignclient.UserLoginFeignImpl;
import org.gl.ceir.CeirPannelCode.Model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Comparator;
import java.util.List;
import java.util.Map;

@Controller
public class ProjectDropdownController {
    @Autowired
    FeignCleintImplementation feignCleintImplementation;
    
    @Autowired
    UserLoginFeignImpl userLoginFeignImpl;

    @Autowired
    GsmaFeignClient gsmaFeignClient;

    @ResponseBody
    @GetMapping("getDropdownList/{tag}")
    public List<Dropdown> getTaxPaidStatus(@PathVariable("tag") String tag) {
        List<Dropdown> dropdown = feignCleintImplementation.taxPaidStatusList(tag);
        dropdown.sort(Comparator.comparing(x -> x.getInterpretation()));
        return dropdown;
    }

   /* @PostMapping("/getallDistrict")
    public @ResponseBody Map<String, List<?>> getAllDistricts(@RequestBody List<String> list) {
    	return feignCleintImplementation.getAllTagsDistrictFeign(list);
    }

    @PostMapping("/getallCommune")
    public @ResponseBody Map<String, List<?>> getAllCommune(@RequestBody List<String> list) {
    	return feignCleintImplementation.getAllCommuneFeign(list);
    }*/

   /* @PostMappinAddressModelg("/getallVillage")
    public @ResponseBody List<String> getAllvillage(@RequestBody  addressModel) {
        List<AddressResponse> response = userLoginFeignImpl.getAllVillageFeign(addressModel);
        return response;
    }*/
    
    @ResponseBody
    @PostMapping("/getAllProvince")
    public List<AddressResp> getAllProvince(@RequestBody AddressModel addressModel) {
        return feignCleintImplementation.getAllProvinceFeign(addressModel.getLang());
    }

    @ResponseBody
    @PostMapping("/getDistrict")
    public List<AddressResp>  getDistrict(@RequestBody AddressModel addressModel) {
        return feignCleintImplementation.getDistrict(addressModel.getId(),addressModel.getLang());
    }
    @ResponseBody
    @PostMapping("/getCommune")
    public ResponseEntity<?> getCommune(@RequestBody AddressModel addressModel) {
        return feignCleintImplementation.getCommune(addressModel.getId(),addressModel.getLang());
    }
    @ResponseBody
    @PostMapping("/getPolice")
    public ResponseEntity<?> getPolice(@RequestBody AddressModel addressModel) {
        return feignCleintImplementation.getPolice(addressModel.getId(),addressModel.getLang());
    }




    @ResponseBody
    @GetMapping("/brandName")
    public List<Dropdown> productList() {
        List<Dropdown> dropdown = gsmaFeignClient.viewAllProductList();
        return dropdown;
    }

    @ResponseBody
    @GetMapping("/getCountryCode")
    public List<CountryCodeModel> getCountryCode() {
        List<CountryCodeModel> dropdown = feignCleintImplementation.getCountryCode();
       System.out.println(dropdown);
        return dropdown;
    }
}		
