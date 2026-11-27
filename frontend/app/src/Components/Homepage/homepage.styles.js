import styled from "styled-components"
import theme from "../../theme"
import { IoIosArrowDown } from "react-icons/io"

import heroImage from "../../Images/ksushi_out.jpg"


export const HomepageSection = styled.section`
	--nav-height: 90px;

	position: relative;
	width: 100%;
	min-height: 92svh;

	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	text-align: center;

	padding: calc(var(--nav-height) + 4.5rem)
		${({ theme }) => theme.spacing.pagePadding.mobile} 1.75rem;

	background-color: ${({ theme }) => theme.colors.background};
	background-image: linear-gradient(
			to bottom,
			rgba(0, 0, 0, 0.55) 0%,
			rgba(0, 0, 0, 0.2) 30%,
			rgba(0, 0, 0, 0.78) 100%
		),
		url(${heroImage.src});
	background-repeat: no-repeat;
	background-size: cover;
	background-position: 50% 10%;

	@media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
		--nav-height: 130px;
		padding: calc(var(--nav-height) + 4rem)
			${({ theme }) => theme.spacing.pagePadding.tablet} 2.25rem;
		background-position: 50% 50%;
	}

	@media (min-width: ${({ theme }) => theme.breakpoints.laptop}) {
		--nav-height: 100px;
		padding: calc(var(--nav-height) + 4rem)
			${({ theme }) => theme.spacing.pagePadding.desktop} 2.5rem;
	}
`

export const Banner = styled.div`
	position: absolute;
	top: calc(var(--nav-height) - 40px);
	left: 0;
	width: 100%;

	padding: 0.625rem ${({ theme }) => theme.spacing.pagePadding.mobile};

	background-color: rgba(0, 0, 0, 0.62);
	backdrop-filter: blur(4px);
	border-top: 1px solid rgba(240, 165, 0, 0.28);
	border-bottom: 1px solid rgba(240, 165, 0, 0.28);

	color: ${({ theme }) => theme.colors.primary};
	font-family: ${({ theme }) => theme.fonts.secondary};
	font-size: 0.8125rem;
	font-weight: 500;
	line-height: 1.5;

	@media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
		padding: 0.625rem ${({ theme }) => theme.spacing.pagePadding.tablet};
	}
`

/* ---- centre cluster ---------------------------------------------------- */

export const HeroContent = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 1.5rem;

	@media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
		gap: 2rem;
	}
`

export const HomepageTagline = styled.h1`
	display: flex;
	flex-direction: column;
	gap: 0.6rem;
	margin: 0;
	max-width: 18ch;

	color: ${({ theme }) => theme.colors.text};
	font-family: ${({ theme }) => theme.fonts.heading};
	font-size: clamp(2.25rem, 7vw, 3.75rem);
	font-weight: 600;
	line-height: 1.05;
	letter-spacing: -0.02em;
	text-shadow: 0 4px 28px rgba(0, 0, 0, 0.9);

	@media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
		max-width: 22ch;
	}
`

export const TaglineSub = styled.span`
	color: ${({ theme }) => theme.colors.textSecondary};
	font-family: ${({ theme }) => theme.fonts.main};
	font-size: clamp(0.9375rem, 2vw, 1.1875rem);
	font-weight: 300;
	letter-spacing: 0.02em;
	line-height: 1.5;
`

export const HomepageMenuLink = styled.a`
	display: inline-flex;
	align-items: center;
	gap: 0.4rem;

	padding: 0.9rem 2rem;
	border: 1px solid rgba(245, 245, 245, 0.85);
	border-radius: 2px;

	background-color: transparent;
	color: ${({ theme }) => theme.colors.text};
	font-family: ${({ theme }) => theme.fonts.heading};
	font-size: 0.8125rem;
	font-weight: 600;
	letter-spacing: 0.16em;
	text-transform: uppercase;
	text-decoration: none;
	cursor: pointer;

	transition: background-color 0.2s ease, color 0.2s ease,
		border-color 0.2s ease, transform 0.2s ease;

	&:hover {
		background-color: ${({ theme }) => theme.colors.primary};
		border-color: ${({ theme }) => theme.colors.primary};
		color: ${({ theme }) => theme.colors.background};
		transform: translateY(-2px);
	}

	&:focus-visible {
		outline: 2px solid ${({ theme }) => theme.colors.primary};
		outline-offset: 4px;
	}
`


export const DownArrow = styled(IoIosArrowDown)`
	font-size: 1rem;
`

/* ---- bottom info bar --------------------------------------------------- */

export const HomepageInfoContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 0.3rem;

	margin-top: auto;
	padding: 0.85rem 1.25rem;

	background-color: rgba(0, 0, 0, 0.38);
	backdrop-filter: blur(6px);
	border: 1px solid rgba(245, 245, 245, 0.1);
	border-radius: 4px;

	color: ${({ theme }) => theme.colors.textSecondary};
	font-size: 0.8125rem;
	font-weight: 300;
	letter-spacing: 0.015em;
	line-height: 1.5;

	@media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
		flex-direction: row;
		align-items: center;
		gap: 1.125rem;

		> * + * {
			padding-left: 1.125rem;
			border-left: 1px solid rgba(245, 245, 245, 0.2);
		}
	}
`

export const HomepageAddress = styled.a`
	color: ${theme.colors.textSecondary};
	cursor: pointer;
	font-size: 0.875rem;
	line-height: 1.9;
	text-decoration: none;
	transition: color 0.2s ease;
	width: fit-content;

	&:hover,
	&:focus-visible {
		color: ${theme.colors.primary};
	}

	&:focus-visible {
		outline: 2px solid ${theme.colors.primary};
		outline-offset: 3px;
	}
`

export const HomepageHours = styled.p`
	margin: 0;
`

export const HomepagePhone = styled.a`
	color: ${({ theme }) => theme.colors.text};
	font-weight: 500;
	text-decoration: none;
	transition: color 0.2s ease;

	&:hover,
	&:focus-visible {
		color: ${({ theme }) => theme.colors.primary};
	}

	&:focus-visible {
		outline: 2px solid ${({ theme }) => theme.colors.primary};
		outline-offset: 3px;
	}
`
