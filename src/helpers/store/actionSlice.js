import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	user: null,
	loadingModal: false,
	clients: [],
	adminStats: false,
};
const localStorage = window?.localStorage;
export const actionSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		removeDataOnLogin: (state, action) => {
			state.clients = [];
			state.adminStats = null;
			state.user = null;
			removeUserTokenfromStorage();
		},

		setAdminStats: (state, action) => {
			state.adminStats = action.payload.adminStats ?? null;
		},

		setClients: (state, action) => {
			state.clients = action.payload.clients || [];
		},

		setUser: (state, action) => {
			state.user = action.payload.user;
		},

		startLoadingModal: (state, action) => {
			state.loadingModal = true;
		},
		endLoadingModal: (state, action) => {
			state.loadingModal = false;
		},
	},
});

export const {
	setClients,
	startLoadingModal,
	endLoadingModal,
	setUser,
	removeDataOnLogin,
	setAdminStats,
} = actionSlice.actions;

export default actionSlice.reducer;
export const saveUserTokenToStorage = async (accessToken, refreshToken) => {
	if (!accessToken || !refreshToken) return;
	await localStorage.setItem("quick-write-ai-admin-accessToken", accessToken);
	await localStorage.setItem("quick-write-ai-admin-refreshToken", refreshToken);
};
export const removeUserTokenfromStorage = async () => {
	await localStorage.removeItem("quick-write-ai-admin-accessToken");
	await localStorage.removeItem("quick-write-ai-admin-refreshToken");
};
export const getUserTokenfromStorage = async () => {
	const fetchedAccessToken = await localStorage.getItem(
		"quick-write-ai-admin-accessToken"
	);
	const fetchedRefreshToken = await localStorage.getItem(
		"quick-write-ai-admin-refreshToken"
	);
	return { accessToken: fetchedAccessToken, refreshToken: fetchedRefreshToken };
};
