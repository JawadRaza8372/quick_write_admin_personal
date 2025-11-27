// utils
import { Suspense, useCallback } from "react";

// styles
import "@styles/index.scss";
import "react-toastify/dist/ReactToastify.min.css";
import ThemeStyles from "@styles/theme";

// fonts
import "@fonts/icomoon/icomoon.woff";

// contexts
import { ThemeProvider } from "styled-components";

// hooks
import { useTheme } from "@contexts/themeContext";
import { useEffect, useRef } from "react";

// components
import Loader from "@components/Loader";
import { useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import AppBar from "@layout/AppBar";

import { useDispatch, useSelector } from "react-redux";
import MainNaviagtion from "./MainNavigation";
import LoaderModal from "@components/LoaderModal";
import {
	adminHealthStatFun,
	adminStatsOverviewFun,
	getAdminProfileApi,
} from "./helpers/endPoints";
import {
	endLoadingModal,
	getUserTokenfromStorage,
	saveUserTokenToStorage,
	setAdminStats,
	setClients,
	setUser,
	startLoadingModal,
} from "./helpers/store/actionSlice";

const App = () => {
	const { loadingModal, user } = useSelector((state) => state?.action);
	const appRef = useRef(null);
	const { theme } = useTheme();
	const isCalled = useRef(false); // Prevent multiple calls
	const path = useLocation().pathname;
	const hideTopBar = path !== "/login" && path !== "/404";
	const dispatch = useDispatch();
	useEffect(() => {
		appRef.current && appRef.current.scrollTo(0, 0);
	}, []);

	const onLoginFun = useCallback(async () => {
		isCalled.current = true;
		//get whole data
		try {
			dispatch(startLoadingModal());
			const adminHealthResult = await adminHealthStatFun();
			const adminStatsResult = await adminStatsOverviewFun();
			dispatch(setClients({ clients: adminStatsResult?.users }));
			dispatch(
				setAdminStats({
					adminStats: {
						activeLast24Hours: adminStatsResult?.activeLast24Hours ?? 0,
						deletionEvents: adminStatsResult?.deletionEvents ?? 0,
						signUpLast24Hours: adminStatsResult?.signUpLast24Hours ?? 0,
						thirtyDay: adminStatsResult?.thirtyDay ?? 0,
						zeroDay: adminStatsResult?.zeroDay ?? 0,
						api: adminHealthResult?.api ?? "unhealthy",
						openai: adminHealthResult?.openai ?? "unhealthy",
						stripe: adminHealthResult?.stripe ?? "unhealthy",
					},
				})
			);
			dispatch(endLoadingModal());
		} catch (error) {
			dispatch(endLoadingModal());
			toast.error(error);
		}
	}, [dispatch]);

	useEffect(() => {
		if (user?.email) {
			if (isCalled.current === false) {
				onLoginFun();
			}
		} else {
			isCalled.current = false;
		}
	}, [user, onLoginFun]);
	const fetchSavedTokenFromDb = useCallback(async () => {
		const { accessToken, refreshToken } = await getUserTokenfromStorage();
		if (accessToken && refreshToken) {
			dispatch(startLoadingModal());
			await getAdminProfileApi()
				.then(async (result) => {
					const { tokens, ...rest } = result?.user;
					dispatch(setUser({ user: rest }));
					await saveUserTokenToStorage(
						tokens?.accessToken,
						tokens?.refreshToken
					);
					dispatch(endLoadingModal());
				})
				.catch((err) => {
					dispatch(endLoadingModal());

					//console.log("err", err);
				});
		}
	}, [dispatch]);
	useEffect(() => {
		fetchSavedTokenFromDb();
	}, [fetchSavedTokenFromDb]);
	return (
		<ThemeProvider theme={{ theme: "dark" }}>
			<ThemeStyles />
			<LoaderModal isOpen={loadingModal} />
			<ToastContainer
				theme={theme}
				autoClose={2000}
				style={{ padding: "20px" }}
				pauseOnFocusLoss={false}
			/>

			<div
				ref={appRef}
				className="app">
				{hideTopBar ? <AppBar /> : null}
				<div className="app_content">
					<Suspense fallback={<Loader />}>
						<div
							className="main"
							style={path?.includes("/chat/") ? { margin: "0px" } : {}}>
							<MainNaviagtion />
						</div>
					</Suspense>
				</div>
			</div>
		</ThemeProvider>
	);
};

export default App;
