// components
import PageHeader from "@layout/PageHeader";
import { useSelector } from "react-redux";
import LoaderModal from "@components/LoaderModal";

const Overview = () => {
	const { adminStats, clients } = useSelector((state) => state?.action);
	const { loadingModal } = useSelector((state) => state?.action);

	// Filter users who logged in within last 7 days

	return (
		<>
			<PageHeader title="Overview" />
			<LoaderModal isOpen={loadingModal} />
			<div className="grid grid-cols-1 gap-3 mb-5 md:mb-[26px] md:grid-cols-2 xl:grid-cols-3">
				<div className="card no-hover flex flex-col">
					<h2 className="label-text text-[24px]">
						{adminStats?.signUpLast24Hours ?? 0}
					</h2>
					<span className="label-text text-[#d9dddc] opacity-[0.7] mt-1">
						Last 24 hours SignUps
					</span>
				</div>
				<div className="card no-hover flex flex-col">
					<h2 className="label-text text-[24px]">
						{adminStats?.activeLast24Hours ?? 0}
					</h2>
					<span className="label-text text-[#d9dddc] opacity-[0.7] mt-1">
						Last 24 hours Logins
					</span>
				</div>
				<div className="card no-hover flex flex-col">
					<h2 className="label-text text-[24px]">
						{adminStats?.thirtyDay ?? 0}
					</h2>
					<span className="label-text text-[#d9dddc] opacity-[0.7] mt-1">
						30 days Duration Users
					</span>
				</div>
				<div className="card no-hover flex flex-col">
					<h2 className="label-text text-[24px]">{adminStats?.zeroDay ?? 0}</h2>
					<span className="label-text text-[#d9dddc] opacity-[0.7] mt-1">
						0 day Duration Users
					</span>
				</div>
				<div className="card no-hover flex flex-col">
					<h2 className="label-text text-[24px]">
						{adminStats?.deletionEvents ?? 0}
					</h2>
					<span className="label-text text-[#d9dddc] opacity-[0.7] mt-1">
						Delete Events
					</span>
				</div>
				<div className="card no-hover flex flex-col">
					<h2 className="label-text text-[24px]">{clients?.length ?? 0}</h2>
					<span className="label-text text-[#d9dddc] opacity-[0.7] mt-1">
						Total Users
					</span>
				</div>
				<div className="card no-hover flex flex-col">
					<h2
						className="label-text uppercase text-[24px]"
						style={{
							color: adminStats?.openai === "healthy" ? "green" : "red",
						}}>
						{adminStats?.api ?? "Unhealthy"}
					</h2>
					<span className="label-text text-[#d9dddc] opacity-[0.7] mt-1">
						API
					</span>
				</div>
				<div className="card no-hover flex flex-col">
					<h2
						className="label-text uppercase text-[24px]"
						style={{
							color: adminStats?.openai === "healthy" ? "green" : "red",
						}}>
						{adminStats?.openai ?? "Unhealthy"}
					</h2>
					<span className="label-text text-[#d9dddc] opacity-[0.7] mt-1">
						Open AI
					</span>
				</div>
				<div className="card no-hover flex flex-col">
					<h2
						className="label-text uppercase text-[24px]"
						style={{
							color: adminStats?.openai === "healthy" ? "green" : "red",
						}}>
						{adminStats?.stripe ?? "Unhealthy"}
					</h2>
					<span className="label-text text-[#d9dddc] opacity-[0.7] mt-1">
						Stripe
					</span>
				</div>
			</div>
		</>
	);
};

export default Overview;
