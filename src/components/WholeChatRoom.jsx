import React, { useEffect, useState } from "react";
import ChatMessageComp from "@components/ChatMessageComp";
import { Input, Button, Avatar } from "antd"; // AntD components
import { SendOutlined } from "@ant-design/icons";

import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getCurrentChatSupportRoomMessagesApi } from "../helpers/endPoints";
import ScrollToBottom from "react-scroll-to-bottom";

const WholeChatRoom = ({ data, roomId }) => {
	const { user } = useSelector((state) => state.action);
	const adminUserId = user?.id;
	const [newMessage, setNewMessage] = useState("");
	const [currentRoomMessages, setcurrentRoomMessages] = useState([]);
	const [loading, setloading] = useState(false);
	useEffect(() => {
		const socket = getSocket(); // Get the initialized socket instance
		const fetchChatRoomMessages = async () => {
			setloading(true);
			await getCurrentChatSupportRoomMessagesApi(adminUserId, roomId)
				.then((dat) => {
					setcurrentRoomMessages(dat?.messages);
					setloading(false);
				})
				.catch((err) => {
					toast.error(err);
					setloading(false);
				});
		};
		if (roomId && data?.messages) {
			fetchChatRoomMessages();
		}
		if (socket) {
			joinChatSupportRoom(roomId);

			receiveChatSupportMessage((message) => {
				setcurrentRoomMessages((prevMessages) => [
					...prevMessages,
					{ ...message },
				]);
			});
		}

		return () => {
			if (socket && roomId) {
				leaveChatSupportRoom(roomId);
			}
		};
	}, [roomId, data, adminUserId]);
	const sendMessage = async () => {
		try {
			const message = {
				roomId: roomId,
				content: newMessage,
				adminId: adminUserId,
			};
			sendChatSupportMessage(message);
			setNewMessage("");
		} catch (error) {
			toast.error(error);
		}
	};
	return (
		<>
			<div
				className="flex items-center justify-between px-4 py-2.5 border-b bg-[#4f89fc]
">
				<div className="flex items-center gap-3">
					<Avatar src={`${data?.room?.profileImage}`} />
					<div className="flex flex-col">
						<span className="font-medium capitalize">
							{data?.room?.username ?? "--"}
						</span>
						<span className="text-xs text-gray-500">
							{data?.room?.email ?? "--"}
						</span>
					</div>
				</div>
			</div>
			{!loading ? (
				<>
					<ScrollToBottom className="chat-scroll flex-1 overflow-y-auto p-4 space-y-4">
						{currentRoomMessages.map((msg, index) => (
							<ChatMessageComp
								key={msg?._id + index}
								isSender={msg?.senderType === "admin"}
								text={msg?.content}
								time={msg?.timestamp}
							/>
						))}
					</ScrollToBottom>
					<div className="p-3 border-t bg-[#4f89fc] flex items-center gap-2">
						<Input
							placeholder="Type a message..."
							value={newMessage}
							onChange={(e) => setNewMessage(e.target.value)}
							onPressEnter={sendMessage}
							color="white"
							className="placeholder-[#efefef]"
							style={{
								backgroundColor: "transparent",
								color: "white",
								height: "100%",
								borderWidth: "0px",
								outline: "none",
							}}
						/>
						<Button
							type="dashed"
							icon={<SendOutlined />}
							onClick={sendMessage}
						/>
					</div>
				</>
			) : (
				<div className="flex flex-1 items-center justify-center text-gray-500">
					Loading..
				</div>
			)}
		</>
	);
};

export default WholeChatRoom;
