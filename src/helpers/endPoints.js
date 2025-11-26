import moment from "moment";
import { base } from "./apiServices";
export const ADMIN_ID = "67dab4d2c19fb49de49e9dc8";
export function formatTimestampWithMoment(timestamp) {
	const now = moment();
	const date = moment(timestamp);
	if (now.diff(date, "hours") < 24) {
		return date.format("hh:mm A");
	}
	return date.format("DD-MM-YYYY");
}
export const loginFun = async (email, password) => {
	try {
		const responce = await base.post(
			"admin/admin-login",
			{
				email,
				userpassword: password,
			},
			{ isPublic: true }
		);
		return responce?.data;
	} catch (error) {
		throw error?.response?.data?.message
			? error?.response?.data?.message
			: error?.message;
	}
};
export const getAdminProfileApi = async () => {
	try {
		const responce = await base.get(`admin/admin-profile`, {
			isPublic: false,
		});
		return responce?.data;
	} catch (error) {
		throw error?.response?.data?.message
			? error?.response?.data?.message
			: error?.message;
	}
};
export const adminHealthStatFun = async () => {
	try {
		const responce = await base.get(`admin/admin-system-health`, {
			isPublic: false,
		});
		return responce?.data;
	} catch (error) {
		throw error?.response?.data?.message
			? error?.response?.data?.message
			: error?.message;
	}
};
export const adminStatsOverviewFun = async () => {
	try {
		const responce = await base.get(`admin/admin-stats`, { isPublic: false });
		return responce?.data;
	} catch (error) {
		throw error?.response?.data?.message
			? error?.response?.data?.message
			: error?.message;
	}
};
