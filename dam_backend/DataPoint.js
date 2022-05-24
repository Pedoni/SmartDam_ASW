module.exports = class DataPoint {

	constructor(value, time, place) {
		this.value = value;
		this.time = time;
		this.place = place;
	}
	
	getValue() {
		return this.value;
	}
	
	getTime() {
		return this.time;
	}
	
	getPlace() {
		return this.place;
	}
    
}
