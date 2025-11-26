import { useState, useEffect, useRef, useCallback } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { setAdminStats, setClients } from "./store/actionSlice";
import { adminHealthStatFun, adminStatsOverviewFun } from "./endPoints";
export const useLoadingWithRefreash = () => {
	const [isLoading, setisLoading] = useState(true);
	const dispatch = useDispatch();
	const isCalled = useRef(false); // Prevent multiple calls
	const checklogin = useCallback(async () => {
		try {
			if (isCalled.current) return; // Prevent duplicate execution
			isCalled.current = true;
			//call whole data
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

			setisLoading(false);
		} catch (error) {
			toast.error(error);
			setisLoading(false);
		}
	}, [dispatch]);

	useEffect(() => {
		checklogin();
	}, [checklogin]);
	return { isLoading };
};
