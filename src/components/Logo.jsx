// components
import { NavLink } from "react-router-dom";

// utils
import { memo } from "react";
import media from "@assets/splash-icon.png";

const Logo = ({ size, textClass, showImage }) => {
	return (
		<NavLink
			className="logo"
			to="/">
			{showImage && (
				<img
					style={{
						width: size ?? "40px",
						height: size ?? "40px",
						objectFit: "contain",
					}}
					src={media}
					alt="media"
				/>
			)}
			<h4 className={`logo_text ${textClass || ""}`}>
				QuickWriteAi Admin Panel
			</h4>
		</NavLink>
	);
};

export default memo(Logo);
