// components
import Collapse from "@mui/material/Collapse";
import PropTypes from "prop-types";
import React from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

const ClientMobileResponsiveItem = ({
	data,
	activeCollapse,
	handleCollapse,
}) => {
	return (
		<div className="card">
			<div
				onClick={() => handleCollapse(data.id)}
				className="flex items-center justify-between">
				<div className="flex items-center gap-2.5">
					<h6 className="max-w-[110px] truncate xs:max-w-[160px]">
						{data?.username}
					</h6>
				</div>

				<div className="flex items-center gap-4">
					<button
						className={`collapse-btn ${
							activeCollapse === data.id ? "active" : ""
						}`}
						aria-label="Toggle view"
						onClick={() => handleCollapse(data.id)}>
						<i className="icon icon-caret-down-solid" />
					</button>
				</div>
			</div>
			<Collapse in={activeCollapse === data.id}>
				<table className="basic-table">
					<tbody>
						<tr>
							<td>Username</td>
							<td className="label-text">{data?.username ?? "--"}</td>
						</tr>
						<tr>
							<td>Email</td>
							<td className="label-text">{data?.email ?? "--"}</td>
						</tr>
						<tr>
							<td>Current Plan</td>
							<td className="label-text">{data?.activePlan ?? "--"}</td>
						</tr>
						<tr>
							<td>Status</td>
							<td className="label-text">
								{data?.isExpired ? "Expired" : "Active"}
							</td>
						</tr>
						<tr>
							<td>Last Login</td>
							<td className="label-text">
								{data?.lastLoggedIn !== "Never logged in"
									? dayjs().diff(dayjs(data?.lastLoggedIn), "hour") < 24
										? dayjs(data?.lastLoggedIn).fromNow()
										: dayjs(data?.lastLoggedIn).format("DD/MM/YYYY hh:mm a")
									: "Never logged in"}
							</td>
						</tr>
						<tr>
							<td>Signed Up Since</td>
							<td className="label-text">
								{data?.createdAt
									? dayjs().diff(dayjs(data?.createdAt), "hour") < 24
										? dayjs(data?.createdAt).fromNow()
										: dayjs(data?.createdAt).format("DD/MM/YYYY hh:mm a")
									: "--"}
							</td>
						</tr>
					</tbody>
				</table>
			</Collapse>
		</div>
	);
};

ClientMobileResponsiveItem.propTypes = {
	data: PropTypes.object.isRequired,
	activeCollapse: PropTypes.string.isRequired,
	handleCollapse: PropTypes.func.isRequired,
};

export default ClientMobileResponsiveItem;
