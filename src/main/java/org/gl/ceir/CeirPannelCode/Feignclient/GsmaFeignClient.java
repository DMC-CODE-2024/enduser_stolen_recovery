package org.gl.ceir.CeirPannelCode.Feignclient;

import org.gl.ceir.CeirPannelCode.Model.Dropdown;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.List;

@Service
@FeignClient(url="${deviceRepositoryfeignClientPath}",value = "profileUrlsgsma")
public interface GsmaFeignClient {
    @RequestMapping(value="/gsma/brandName" ,method= RequestMethod.GET)
    public List<Dropdown> viewAllProductList();
}
