const excerpt = (str, max, suffix) =>
	str.length < max ? str : `${str.substr(0, str.substr(0, max - suffix.length).lastIndexOf(' '))} ${suffix}`;

module.exports = excerpt;
