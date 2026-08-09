import { useState } from "react"
import Hamburger from "./Hamburger/hamburger"

import logo from "../../Images/logo.png"

import * as S from "./navbar.styles"


const Navbar = ({ scrollToCorrectHeight, menuRef, deliveryRef, aboutRef }) => {
	const [showNav, setShowNav] = useState(false)

	return(
		<S.NavbarSection>
			<S.NavbarLogoContainer>
				<S.NavbarLogo src={logo.src} />
				<S.NavbarSlogan>Japanese sushi, hand rolls, & fusion specials</S.NavbarSlogan>
			</S.NavbarLogoContainer>
			<S.NavLinkContainer>
				<S.NavLink 
					onClick={(e) => {
						e.preventDefault()
						scrollToCorrectHeight(e, menuRef)
					}}
				>
					MENU
				</S.NavLink>
				<S.NavLink 
					onClick={(e) => {
						e.preventDefault()
						scrollToCorrectHeight(e, deliveryRef)
					}}
				>
					DELIVERY
				</S.NavLink>
				<S.NavLink 
					onClick={(e) => {
						e.preventDefault()
						scrollToCorrectHeight(e, aboutRef)
					}}
				>
					OUR STORY
				</S.NavLink>
			</S.NavLinkContainer>
			<Hamburger
				open={showNav}
				setShowNav={setShowNav}
			/>
			<S.SideNavSection $open={showNav}>
				<S.SideNavContainer $open={showNav}>
					<S.SideNavLinkContainer>
						<Hamburger
							open={showNav}
							setShowNav={setShowNav}
						/>
						<S.NavbarLogo src={logo.src} $sideNav></S.NavbarLogo>
						<S.NavLink 
							$sideNav 
							onClick={(e) => {
								scrollToCorrectHeight(e, menuRef);
								setShowNav(false)
							}}
						>
							MENU
						</S.NavLink>
						<S.NavLink 
							$sideNav 
							onClick={(e) => {
								scrollToCorrectHeight(e, deliveryRef);
								setShowNav(false)
							}}
						>
							DELIVERY
						</S.NavLink>
						<S.NavLink 
							$sideNav 
							onClick={(e) => {
								scrollToCorrectHeight(e, aboutRef);
								setShowNav(false)
							}}
						>
							OUR STORY
						</S.NavLink>
					</S.SideNavLinkContainer>
					<S.SideNavInfoContainer>
						<S.SideNavAddress>16436 Norwalk Blvd, Cerritos, CA 90703</S.SideNavAddress>
						<S.SideNavHours>Mon – Sat: 11:30AM – 2:30PM & 5:00PM – 9:00PM | Sun: Closed</S.SideNavHours>
						<S.SideNavPhone href="tel:+15629266556">+1 (562) 926-6556</S.SideNavPhone>
					</S.SideNavInfoContainer>
				</S.SideNavContainer>
			<S.Overlay $open={showNav}></S.Overlay>
			</S.SideNavSection>
		</S.NavbarSection>
	)
}

export default Navbar