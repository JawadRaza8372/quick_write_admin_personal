// components
import PageHeader from "@layout/PageHeader";
import Spring from "@components/Spring";
import StyledTable from "@styles/SpotRequestStyleTable";
import Empty from "@components/Empty";
import { useState, useEffect } from "react";
import usePagination from "@hooks/usePagination";
import { useWindowSize } from "react-use";
import { CLIENTS_COLUMN_DEFS } from "@constants/columnDefs";
import Pagination from "@ui/Pagination";
import { useSelector } from "react-redux";
import LoaderModal from "@components/LoaderModal";
import classNames from "classnames";
import { CSVLink } from "react-csv";
import ClientMobileResponsiveItem from "@components/ClientMobileResponsiveItem";
const Clients = () => {
	const { width } = useWindowSize();
	const { clients } = useSelector((state) => state?.action);
	const [searchTerm, setsearchTerm] = useState("");
	const { loadingModal } = useSelector((state) => state?.action);
	const [activeCollapse, setActiveCollapse] = useState("");
	const filteredProjects = clients?.filter(
		(dat) =>
			`${dat?.username}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
			`${dat?.email}`.toLowerCase().includes(searchTerm.toLowerCase())
	);
	const pagination = usePagination(
		filteredProjects?.slice(0, filteredProjects?.length),
		15
	);
	const sortedData = pagination.currentItems();
	useEffect(() => {
		setActiveCollapse("");
	}, [pagination.currentPage, width]);

	const handleCollapse = (id) => {
		if (activeCollapse === id) {
			setActiveCollapse("");
		} else {
			setActiveCollapse(id);
		}
	};
	const dataHeader = [
		[
			"Firstname",
			"Lastname",
			"Email",
			"User name",
			"Country",
			"EA Id",
			"Date of birth",
			"w_l_rank",
			"Wins",
			"Loses",
			"draws",
			"Total Matches",
			"Trophies",
			"Youtube Link",
			"Twitch Link",
			"Instagram Link",
			"Last Seen",
			"Sign Up Since",
		],
	];
	const dataRows = clients?.map((p) => [
		`${p.firstName}`,
		`${p.lastName}`,
		`${p.email}`,
		`${p.username}`,
		`${p.country}`,
		`${p.ea_ID}`,
		`${p.dob}`,
		`${p.w_l_rank}`,
		`${p.winMatches}`,
		`${p.loseMatches}`,
		`${p.drawMatches}`,
		`${p.totalMatches}`,
		`${p.trophies}`,
		`${p.youtubeAccount}`,
		`${p.twitchAccount}`,
		`${p.instagramAccount}`,
		`${p.lastLoggedIn}`,
		`${p.signUpSince}`,
	]);

	const clientsData = [
		...dataHeader,
		...(dataRows?.length > 0 ? dataRows : []),
	];

	return (
		<>
			<PageHeader title="Users" />
			<LoaderModal isOpen={loadingModal} />

			<div className="flex flex-col gap-4 mb-5 md:flex-row items-center justify-between md:mb-[30px]">
				<input
					className={classNames("field-input")}
					id="name"
					type="text"
					value={searchTerm}
					onChange={(e) => setsearchTerm(e.target.value)}
					placeholder="Enter Client user name or email"
				/>
				{clients?.length <= 0 ? (
					<button
						disabled={true}
						className="btn btn--primary max-w-[350px] text-[12px]"
						type="submit">
						Export
					</button>
				) : (
					<CSVLink data={clientsData}>
						<button
							className="btn btn--primary max-w-[350px] text-[12px]"
							type="submit">
							Export
						</button>
					</CSVLink>
				)}
			</div>
			<Spring className="flex flex-col flex-1 gap-5">
				{width >= 768 ? (
					<StyledTable
						columns={CLIENTS_COLUMN_DEFS}
						dataSource={sortedData}
						locale={{
							emptyText: <Empty text="No Clients found" />,
						}}
						rowKey={(record) => record.id}
						pagination={false}
					/>
				) : (
					<div className="flex flex-col flex-1 gap-4">
						{sortedData.length > 0 ? (
							sortedData.map((item) => (
								<ClientMobileResponsiveItem
									handleCollapse={handleCollapse}
									activeCollapse={activeCollapse}
									data={item}
									key={item.id}
								/>
							))
						) : (
							<Empty text="No Clients found" />
						)}
					</div>
				)}
				{pagination.maxPage > 1 && <Pagination pagination={pagination} />}
			</Spring>
		</>
	);
};

export default Clients;
