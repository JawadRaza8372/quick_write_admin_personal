import axios from "axios";
import {
	getUserTokenfromStorage,
	removeUserTokenfromStorage,
	saveUserTokenToStorage,
} from "./store/actionSlice";
const productionLink = "https://quickwriteaiapi.britxel.com/";
const developmentLink =
	"https://wc0osk40ko8k0gswcgcowgwk.91.108.126.5.sslip.io/";
const isProduction = false;
const mainUrl = isProduction ? productionLink : developmentLink;
const apiKey = import.meta.env.VITE_API_KEY ?? process.env.VITE_API_KEY;
// ⚙️ Axios instance
const base = axios.create({
	baseURL: mainUrl,
	headers: {
		"Content-Type": "application/json",
		"x-api-key": apiKey,
	},
});
// 🔐 Helper to dynamically attach/remove token
const setAuthToken = (token) => {
	if (token) {
		base.defaults.headers.common["Authorization"] = `Bearer ${token}`;
	} else {
		delete base.defaults.headers.common["Authorization"];
	}
};
base.interceptors.request.use(
	async (config) => {
		if (config.isPublic) return config;

		const { accessToken } = await getUserTokenfromStorage();

		if (accessToken) {
			config.headers.Authorization = `Bearer ${accessToken}`;
		}
		return config;
	},
	(error) => Promise.reject(error)
);

// 🔄 Response Interceptor — refresh token on 401
base.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;

		if (
			error.response &&
			error.response.status === 401 &&
			!originalRequest._retry
		) {
			originalRequest._retry = true;
			try {
				const { refreshToken } = await getUserTokenfromStorage();
				if (!refreshToken) {
					console.log("🚫 No refresh token available — user likely logged out");
					return null;
				}
				// call backend refresh route
				const res = await base.post(
					`admin/admin-renew-token`,
					{
						refreshToken: refreshToken,
					},
					{
						isPublic: true,
					}
				);
				const newAccessToken = res?.data?.accessToken;
				const newRefreshToken = res?.data?.refreshToken;
				await saveUserTokenToStorage(newAccessToken, newRefreshToken);

				// attach new token for retry
				base.defaults.headers.common[
					"Authorization"
				] = `Bearer ${newAccessToken}`;
				originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
				return base(originalRequest); // retry original request
			} catch (refreshError) {
				console.error("Token refresh failed:", refreshError);
				// optional: redirect to login
				removeUserTokenfromStorage();
			}
		}
		return Promise.reject(error);
	}
);

export { base, isProduction, mainUrl, setAuthToken };
