// components
import Collapse from "@mui/material/Collapse";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import React from "react";

const MobileResponsiveItem = ({
	data,
	activeCollapse,
	handleCollapse,
	dataFormat,
}) => {
	return (
		<div className="card">
			<div
				onClick={() => handleCollapse(data.id)}
				className="flex items-center justify-between">
				<div className="flex items-center gap-2.5">
					{dataFormat?.headerImage && dataFormat?.headerTitle ? (
						<div className="img-wrapper flex items-center justify-center w-10 h-10">
							<img
								className="max-w-[28px]"
								src={data[dataFormat?.headerImage]}
								alt={data[dataFormat?.headerTitle]}
							/>
						</div>
					) : null}
					<h6 className="max-w-[110px] truncate xs:max-w-[160px]">
						{data[dataFormat?.headerTitle]}
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
					{dataFormat?.actions &&
						dataFormat?.actions?.map((action, index) => (
							<div
								key={index}
								onClick={() =>
									action?.onClickFun(
										action?.dataIndex ? data[action?.dataIndex] : data?.id
									)
								}>
								{action?.icon}
							</div>
						))}
				</div>
			</div>
			<Collapse in={activeCollapse === data.id}>
				<table className="basic-table">
					<tbody>
						{dataFormat?.fields &&
							dataFormat?.fields?.map((dat, index) =>
								dat?.type !== "array" && dat?.type !== "sumArray" ? (
									<tr key={index}>
										<td>{dat?.title}</td>
										<td>
											{dat?.onClickFun && dat?.type === "btn" ? (
												<div
													onClick={
														dat?.dataIndex
															? () => dat?.onClickFun(data[dat?.dataIndex])
															: () => dat?.onClickFun()
													}
													className="btn btn--primary">
													{dat?.btnTitle}
												</div>
											) : dat?.onClickFun && dat?.type === "btn2" ? (
												data[dat?.dataIndex] ? (
													<div
														onClick={() =>
															dat?.onClickFun(data[dat?.dataIndex])
														}
														className="btn btn--primary">
														{dat?.btnTitle}
													</div>
												) : (
													<span>N/A</span>
												)
											) : dat?.type === "date" ? (
												<div className="flex items-center gap-2.5">
													<span className="label-text">
														{dayjs(data[dat?.dataIndex]).format("DD/MM/YYYY") ||
															"-"}
													</span>
												</div>
											) : dat?.type === "tags" ? (
												<div className="flex items-center gap-2.5">
													<span className="label-text">
														{data[dat?.dataIndex]
															?.map((dat) => dat)
															?.join(" ,") || ""}
													</span>
												</div>
											) : dat?.type === "boolean" ? (
												<div className="flex items-center gap-2.5">
													<span className="label-text">
														{data[dat?.dataIndex] ? "Yes" : "No"}
													</span>
												</div>
											) : dat?.type === "image" ? (
												<div className="flex items-center gap-2.5">
													<img
														className="w-[150px] h-[150px] object-contain"
														src={data[dat?.dataIndex]}
														alt={dat?.title}
													/>
												</div>
											) : (
												<div className="flex items-center gap-2.5">
													<span className="label-text">
														{`${data[dat?.dataIndex]}` || "-"}
													</span>
												</div>
											)}
										</td>
									</tr>
								) : dat?.type === "array" ? (
									<React.Fragment key={index}>
										<tr>
											<td colSpan={2}>{dat?.title}</td>
										</tr>
										<tr>
											{dat?.["titleIndex"]?.map((duc, inde) => (
												<td
													className="!text-header"
													key={inde}>
													{duc}
												</td>
											))}
										</tr>
										{Array.isArray(data?.[dat.dataIndex]) &&
											data[dat.dataIndex].map((item, rowIndex) => (
												<tr
													key={rowIndex}
													className="border-t">
													{dat.valueIndex.map((field, colIndex) => (
														<td
															className="!text-white"
															key={colIndex}>
															{item[field]}
														</td>
													))}
												</tr>
											))}
									</React.Fragment>
								) : (
									<tr key={index}>
										<td>{dat?.title}</td>
										<td>
											{data?.[dat?.dataIndex]?.reduce(
												(sum, item) => sum + Number(item?.[dat?.sumIndex] || 0),
												0
											)}
										</td>
									</tr>
								)
							)}
					</tbody>
				</table>
			</Collapse>
		</div>
	);
};

MobileResponsiveItem.propTypes = {
	data: PropTypes.object.isRequired,
	dataFormat: PropTypes.object.isRequired,
	activeCollapse: PropTypes.string.isRequired,
	handleCollapse: PropTypes.func.isRequired,
};

export default MobileResponsiveItem;
