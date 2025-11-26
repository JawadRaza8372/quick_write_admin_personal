import backupImage from "@assets/profileImg.png";
export const UserAvatar = ({ size, imageLink }) => {
	return (
		<div
			className="flex items-center justify-center"
			style={{
				width: size ? size : 25,
				height: size ? size : 25,
				borderRadius: size ? size / 1.5 : 25,
				overflow: "hidden",
				border: "1px solid grey",
				backgroundColor: "#1c1416",
			}}>
			<img
				className="w-[100%] h-[100%] object-cover"
				src={imageLink ? imageLink : backupImage}
				alt="user"
			/>
		</div>
	);
};
