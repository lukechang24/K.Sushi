import styled from "styled-components"
import { IoIosArrowDown } from "react-icons/io";
import heroImage from "../../Images/ksushi_out.jpg"

export const HomepageSection = styled.div`
	width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
	background-image: ${({ theme }) => `linear-gradient(rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.65)`}), url(${heroImage.src});  
	background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% 50%;
	background-color: ${({ theme }) => theme.colors.background};
  text-align: center;
	@media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
		background-position: 50% 10%;
	}
	@media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
		background-position: 50% 50%;
	}
`

export const HomepageTagline = styled.p`
	width: 20rem;
	font-size: 1.375rem;
	font-weight: 200;
	text-shadow: 0 8px 10px rgba(0, 0, 0, 1);
	margin: 8rem 0 2rem;
	@media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
		width: auto;
		font-size: 1.5rem;
		margin: 10rem 0 4rem;
	}
	@media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
		margin: 8rem 0 4rem;
	}
	@media (min-width: ${({ theme }) => theme.breakpoints.laptop}) {
		font-size: 2rem;
	}
	@media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
		font-size: 2.5rem;
	}
`

export const HomepageMenuLink = styled.a`
	display: flex;
	align-items: center;
	background-color: transparent;
	color: ${({ theme }) => theme.colors.text};
	font-size: 1.25rem;
	padding: 0.75em;
	border: 1px solid ${({ theme }) => theme.colors.text};
	border-radius: 1.5px;
	margin: 0 0 12rem;
	text-decoration: none;
	transition: 0.2s linear;
	&:hover {
		background-color: ${({ theme }) => theme.colors.text};
		color: ${({ theme }) => theme.colors.background};
	}
	@media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
		margin: 0 0 14rem;
	}
	@media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
		margin: 0 0 12rem;
	}
	@media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
		margin: 0 0 14rem;
	}
`

export const DownArrow = styled(IoIosArrowDown)`
	margin-left: 5px;
`

export const HomepageInfoContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 0.5rem 0;
	color: ${({ theme }) => theme.colors.text};
	font-size: 0.875rem;
	padding: 0 1rem;
	margin-bottom: 1rem;
	@media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
		font-size: 1rem;
		margin-bottom: 2rem;
	}
	@media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
		font-size: 1.25rem;
	}
`

export const HomepagePhone = styled.a`
	color: ${({ theme }) => theme.colors.text};
	font-weight: 300;
`

export const HomepageHours = styled.p`
	font-weight: 300;
`

export const HomepageAddress = styled.address`
	font-weight: 300;
	font-style: normal;
`

export const HomepageSeperator = styled.div`
	width: 100%;
	height: 3rem;
	background-color: #111;
`