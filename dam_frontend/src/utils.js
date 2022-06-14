exports.arrayMin = (arr) => arr.reduce((a, b) => Math.min(a, b));

exports.arrayMax = (arr) => arr.reduce((a, b) => Math.max(a, b));

exports.arrayAvg = (arr) => (arr.reduce((a, b) => a + b, 0) / arr.length) || 0;

exports.formatData = (date) => date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();