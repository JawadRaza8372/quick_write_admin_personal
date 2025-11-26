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
					<div className="img-wrapper flex items-center justify-center w-10 h-10">
						<img
							className="w-100 h-100 object-cover"
							src={data?.profileImage}
							alt={data?.username}
						/>
					</div>
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
							<td>Country</td>
							<td className="label-text">{data?.country ?? "--"}</td>
						</tr>
						<tr>
							<td>EA Id</td>
							<td className="label-text">{data?.ea_ID ?? "--"}</td>
						</tr>
						<tr>
							<td>DOB</td>
							<td className="label-text">{data?.dob ?? "--"}</td>
						</tr>
						<tr>
							<td>Wins</td>
							<td className="label-text">{data?.winMatches ?? "0"}</td>
						</tr>
						<tr>
							<td>Losses</td>
							<td className="label-text">{data?.loseMatches ?? "0"}</td>
						</tr>
						<tr>
							<td>Draws</td>
							<td className="label-text">{data?.drawMatches ?? "0"}</td>
						</tr>
						<tr>
							<td>Total Matches</td>
							<td className="label-text">{data?.totalMatches ?? "0"}</td>
						</tr>
						<tr>
							<td>Trophies</td>
							<td className="label-text">{data?.trophies ?? "--"}</td>
						</tr>
						<tr>
							<td>Last Seen</td>
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
								{data?.signUpSince
									? dayjs().diff(dayjs(data?.signUpSince), "hour") < 24
										? dayjs(data?.signUpSince).fromNow()
										: dayjs(data?.signUpSince).format("DD/MM/YYYY hh:mm a")
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
