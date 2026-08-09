import styled, { keyframes, css } from "styled-components"

const slideIn = keyframes`
	0% { right: -100vw; }
	100% { right: 0; }
`

const slideOut = keyframes`
	0% { right: 0; }
	100% { right: -100vw; }
`

export const NavbarSection = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	// background-color: ${props => props.theme.colors.background};
	background-color: #111;
	color: white;
	padding: ${({ theme }) => theme.spacing.navbarPadding.mobile} ${({ theme }) => theme.spacing.pagePadding.mobile};
	box-sizing: border-box;
	z-index: 30;
	@media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
		padding: ${({ theme }) => theme.spacing.navbarPadding.mobile} ${({ theme }) => theme.spacing.pagePadding.mobile};
	}
	@media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
		padding: ${({ theme }) => theme.spacing.navbarPadding.tablet} ${({ theme }) => theme.spacing.pagePadding.tablet};
	}
`

export const NavbarLogoContainer = styled.div`
	display: flex;
	flex-direction: column;
`

export const NavbarLogo = styled.img`
	width: 175px;
	position: ${({ $sideNav }) => $sideNav && "absolute"};
	left: 50%;
	transform: ${({ $sideNav }) => $sideNav && "translateX(-50%)"};
	@media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
		// width: 200px;
	}
	@media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
		width: 12rem;
	}
	@media (min-width: ${({ theme }) => theme.breakpoints.laptop}) {
		width: 13rem;
	}
`

export const NavbarSlogan = styled.p`
	font-family: ${({ theme }) => theme.fonts.main};
	font-size: 0.8rem;
	font-weight: 400;
	margin-top: 5px;
	@media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
		width: 175px;
		margin-top: 3px;
	}
	@media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
		width: auto;
		font-size: 0.875rem;
	}
	@media (min-width: ${({ theme }) => theme.breakpoints.laptop}) {
	}
`

export const NavLinkContainer = styled.div`
	display: none;
	@media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
		display: flex;
		gap: 0 1.15rem;
	}
	@media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
		gap: 0 3rem;
		margin-right: 1rem;
	}
	@media (min-width: ${({ theme }) => theme.breakpoints.laptop}) {
		margin-right: 2rem;
	}
`

export const NavLink = styled.button`
	background-color: transparent;
  color: ${({ theme }) => theme.colors.text};
  font-weight: 500;
  font-size: ${({ $sideNav }) => $sideNav ? "1.25rem" : "1rem"};
	text-decoration: none;
	text-align: center;
	border: none;
  cursor: pointer;
  transition: color 0.2s ease;
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }

	@media (min-width: ${({ theme }) => theme.breakpoints.laptop}) {
		font-size: 1.25rem;
	}
`

export const SideNavSection = styled.div`
	display: flex;
	justify-content: flex-end;
	position: fixed;
	top: 0;
	width: 100vw;
	height: 100vh;
	visibility: ${({ $open }) => $open ? "visible" : "hidden"};
	animation: ${({ $open }) =>
    $open
      ? css`${slideIn} 0.5s forwards`
      : css`${slideOut} 0.5s forwards`};
`

export const SideNavContainer = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width: 85%;
	height: 100%;
	background-color: ${({ theme }) => theme.colors.background};
	padding: 1.5rem 1rem 1rem;
	z-index: 51;
`


export const Overlay = styled.div`
	position: fixed;
	width: 100%;
	height: 100%;
	opacity: 0.5;
	background-color: black;
	animation: ${({ $open }) =>
    $open
      ? css`${slideIn} 0s forwards`
      : css`${slideOut} 0s forwards`};
`

export const SideNavLinkContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 3.5rem;
`

export const SideNavInfoContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 0.5rem 0;
	color: ${({ theme }) => theme.colors.text};
	font-size: 0.875rem;
	text-align: center;
	margin-bottom: 1rem;
	@media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
		font-size: 1rem;
		margin-bottom: 2rem;
	}
	@media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
		font-size: 1.25rem;
	}
`

export const SideNavAddress = styled.address`
	font-style: normal;
`

export const SideNavHours = styled.p`
	
`

export const SideNavPhone = styled.a`
	color: ${({ theme }) => theme.colors.text};
`

