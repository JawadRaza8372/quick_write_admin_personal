import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import { useDispatch, useSelector } from "react-redux";
import { removeDataOnLogin } from "../helpers/store/actionSlice.js";
import CustomTooltip from "@ui/CustomTooltip";
import Logo from "@components/Logo";
import ROUTES from "@constants/routes";
import { NavLink } from "react-router-dom";

function ResponsiveAppBar() {
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state?.action);
	const [anchorElNav, setAnchorElNav] = React.useState(null);

	const handleOpenNavMenu = (event) => {
		setAnchorElNav(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	return (
		<AppBar position="static">
			<Container>
				<Toolbar
					disableGutters={true}
					style={{
						justifyContent: "space-between",
						flexDirection: "row",
					}}>
					<div className="flex h-auto md:px-[15px]">
						<Box sx={{ display: { xs: "flex", md: "none" } }}>
							<IconButton
								size="large"
								aria-label="account of current user"
								aria-controls="menu-appbar"
								aria-haspopup="true"
								onClick={handleOpenNavMenu}
								color="inherit">
								<i className="icon-bars-solid" />
							</IconButton>
							<Menu
								id="menu-appbar"
								anchorEl={anchorElNav}
								anchorOrigin={{
									vertical: "bottom",
									horizontal: "left",
								}}
								keepMounted
								transformOrigin={{
									vertical: "top",
									horizontal: "left",
								}}
								open={Boolean(anchorElNav)}
								onClose={handleCloseNavMenu}
								sx={{ display: { xs: "block", md: "none" } }}>
								{ROUTES?.map((page) => (
									<MenuItem
										key={page.path}
										onClick={handleCloseNavMenu}>
										<NavLink
											className={({ isActive }) =>
												isActive
													? `text-[15px] text-center font-bold text-[#4f89fc]`
													: `text-[14px] text-center font-normal text-black`
											}
											to={page.path}>
											{page.name}
										</NavLink>
									</MenuItem>
								))}
							</Menu>
						</Box>
						<Logo
							size={"50px"}
							showImage={true}
						/>
					</div>

					<Box
						sx={{
							flexGrow: 1,
							display: { xs: "none", md: "flex" },
							alignItems: "center",
							justifyContent: "center",
							gap: 2,
						}}>
						{ROUTES?.map((page) => (
							<NavLink
								key={page.path}
								onClick={handleCloseNavMenu}
								className={({ isActive }) =>
									isActive
										? `text-[15px] text-center font-bold text-[#4f89fc]`
										: `text-[14px] text-center font-normal text-white`
								}
								to={page.path}>
								{page.name}
							</NavLink>
						))}
					</Box>
					<Box sx={{ flexGrow: 0 }}>
						<CustomTooltip title={"Logout"}>
							<div
								onClick={() => dispatch(removeDataOnLogin())}
								className="relative cursor-pointer flex items-center justify-end gap-2 flex-row">
								<div
									className="h-8 w-8 rounded-full bg-accent text-widget text-sm flex items-center
                                    justify-center xl:w-11 xl:h-11 xl:text-lg"
									aria-label="Account menu">
									<i className="icon-user-solid" />
								</div>
								<div className="max-md:hidden flex flex-col">
									<span className="uppercase text-sm">
										{user?.email ?? "current email"}
									</span>
								</div>
							</div>
						</CustomTooltip>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
}
export default ResponsiveAppBar;
