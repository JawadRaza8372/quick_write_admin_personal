// utils
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);
export const CLIENTS_COLUMN_DEFS = [
	{
		title: "User Info",
		render: (data) => {
			return (
				<div className="flex flex-col gap-1">
					<span>Username: {data?.username}</span>
					<span>Email: {data?.email}</span>
				</div>
			);
		},
	},
	{
		title: "Current Plan",
		dataIndex: "activePlan",
		render: (date) => {
			return <span className="label-text">{date ?? "--"}</span>;
		},
	},
	{
		title: "Status",
		dataIndex: "isExpired",
		render: (date) => {
			return <span className="label-text">{date ? "Expired" : "Active"}</span>;
		},
	},
	{
		title: "Last Login",
		dataIndex: "lastLoggedIn",
		render: (date) => {
			return (
				<span className="label-text">
					{date !== "Never logged in"
						? dayjs().diff(dayjs(date), "hour") < 24
							? dayjs(date).fromNow()
							: dayjs(date).format("DD/MM/YYYY hh:mm a")
						: "Never logged in"}
				</span>
			);
		},
	},
	{
		title: "Signed Up Since",
		dataIndex: "createdAt",
		render: (date) => {
			return (
				<span className="label-text">
					{date
						? dayjs().diff(dayjs(date), "hour") < 24
							? dayjs(date).fromNow()
							: dayjs(date).format("DD/MM/YYYY hh:mm a")
						: "--"}
				</span>
			);
		},
	},
];
