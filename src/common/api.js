const prefix = '/api';

export default {
	// global
	getLoginStateQuery: {
		url: `${prefix}/getLoginState`,
	},
	getLandingInfoQuery: {
		url: `${prefix}/getContentMarketing`,
	},

	getLandingInfoDetailQuery: {
		url: `${prefix}/getLandingInfoDetail`,
	},
	updateResumeBasicInfoQuery: {
		url: `${prefix}/updateResumeBasicInfo`,
	},
	updateResumeComplexInfoQuery: {
		url: `${prefix}/updateResumeComplexInfo`,
	},
	updateResumeComplexChildInfoQuery: {
		url: `${prefix}/updateResumeComplexChildInfo`,
	},
	deleteResumeComplexInfoQuery: {
		url: `${prefix}/deleteResumeComplexInfo`,
	},
	getResumeComplexInfoQuery: {
		url: `${prefix}/getResumeComplexInfo`,
	},
	resumeQuery: {
		url: `${prefix}/resume`,
	},
	testLoginQuery: {
		url: `${prefix}/testLogin`,
	},
};
