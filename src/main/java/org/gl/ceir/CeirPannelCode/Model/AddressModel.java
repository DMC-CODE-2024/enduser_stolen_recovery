package org.gl.ceir.CeirPannelCode.Model;

import org.springframework.stereotype.Component;

@Component
public class AddressModel {
	private String province;
	private String district;
	private String commune;
	private String lang;
	private  int id;
	private Long districtID;
	private Long communeID;
	public String getProvince() {
		return province;
	}
	public void setProvince(String province) {
		this.province = province;
	}
	public Long getDistrictID() {
		return districtID;
	}
	public void setDistrictID(Long districtID) {
		this.districtID = districtID;
	}
	public Long getCommuneID() {
		return communeID;
	}
	public void setCommuneID(Long communeID) {
		this.communeID = communeID;
	}

	public String getDistrict() {
		return district;
	}

	public void setDistrict(String district) {
		this.district = district;
	}

	public String getCommune() {
		return commune;
	}

	public void setCommune(String commune) {
		this.commune = commune;
	}

	public String getLang() {
		return lang;
	}

	public void setLang(String lang) {
		this.lang = lang;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	@Override
	public String toString() {
		return "AddressModel{" +
				"province='" + province + '\'' +
				", district='" + district + '\'' +
				", commune='" + commune + '\'' +
				", lang='" + lang + '\'' +
				", id=" + id +
				", districtID=" + districtID +
				", communeID=" + communeID +
				'}';
	}
}
