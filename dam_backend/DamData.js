module.exports = class DamData {
	constructor() {
		this.damCapacity = 30_000_000;
		this.maxHeight = 150;
	}

	getTotalDamCapacity() {
		return this.damCapacity;
	}

	getActualWaterVolume(waterlevel) {
		var area = waterlevel * this.damCapacity / this.maxHeight; // waterlevel : 150 = area : 30'000'000
		return waterlevel * area / 3;
	}

	getVolumePercentage(waterlevel) {
		return this.getActualWaterVolume(waterlevel) / this.damCapacity;
	}
}
