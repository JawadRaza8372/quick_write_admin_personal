import React, { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { useLoadingWithRefreash } from "../helpers/useLoadingWithRefreash";
import LoaderModal from "@components/LoaderModal";
import Clients from "@pages/Clients";
import Overview from "@pages/Overview";

const Login = lazy(() => import("@pages/Login"));
const PageNotFound = lazy(() => import("@pages/PageNotFound"));
let ProtectedRoute = ({ children }) => {
	const { user } = useSelector((state) => state.action);
	if (user?.email) {
		return children;
	}
	return <Navigate to="/login" />;
};
let AuthRoute = ({ children }) => {
	const { user } = useSelector((state) => state.action);
	if (user?.email) {
		return <Navigate to="/" />;
	}
	return children;
};
const MainNaviagtion = () => {
	const { isLoading } = useLoadingWithRefreash();
	if (isLoading) {
		return <LoaderModal isOpen={isLoading} />;
	}
	return (
		<Routes>
			<Route
				path="/login"
				element={
					<AuthRoute>
						<Login />
					</AuthRoute>
				}
			/>
			<Route
				path="/"
				element={
					<ProtectedRoute>
						<Overview />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/users"
				element={
					<ProtectedRoute>
						<Clients />
					</ProtectedRoute>
				}
			/>

			<Route
				path="*"
				element={<Navigate to={"/404"} />}
			/>
			<Route
				path="/404"
				element={<PageNotFound />}
			/>
		</Routes>
	);
};

export default MainNaviagtion;
