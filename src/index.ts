const globalAny: any = global;
const windowAny: any = window;

interface options {
	link?: string;
	appStoreUrl?: string;
	playStoreUrl?: string;
	websiteUrl?: string;
}

const deepLink = (options: options = {}) => {
	const { link, appStoreUrl, playStoreUrl, websiteUrl } = options;

	const userAgent =
		globalAny.navigator.userAgent ||
		globalAny.navigator.vendo ||
		globalAny.opera;
	const isAndroid = /android/i.test(userAgent);
	const isIOS = /iPad|iPhone|iPod/.test(userAgent) && !globalAny.MSStream;
	const isUnsupported = !isAndroid && !isIOS;

	let fallBackUrl = websiteUrl;

	if (isAndroid) {
		fallBackUrl = playStoreUrl;
	}

	if (isIOS) {
		fallBackUrl = appStoreUrl;
	}

	if (isUnsupported) {
		fallBackUrl = websiteUrl;
	}

	if (isUnsupported) {
		windowAny.location = fallBackUrl;
	} else {
		windowAny.location = link;
		setTimeout(() => {
			windowAny.location = fallBackUrl;
		}, 25);
	}
};

export default deepLink;
