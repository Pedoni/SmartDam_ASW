module.exports = class DamData {
	constructor() {
		this.damCapacity = 30_000_000;
		this.maxHeight = 150;
	}

	getTotalDamCapacity() {
		return this.damCapacity;
	}

	getActualWaterVolume(waterlevel) {
		return waterlevel * 200_000 / 3; // The dam is approximated as a giant prism
	}

	getVolumePercentage(waterlevel) {
		return this.getActualWaterVolume(waterlevel) / this.damCapacity * 100;
	}
}
