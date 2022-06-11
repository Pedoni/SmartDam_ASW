module.exports = class DamData {

	constructor() {
		this.damCapacity = 30000000;
	}
	
	getActualWaterVolume(waterLevel) {
		return 0;
	}

    getVolumePercentage(waterLevel){
        return this.getActualWaterVolume(waterLevel) / this.damCapacity;
    }
    
}
