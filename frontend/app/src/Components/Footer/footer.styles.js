import styled from "styled-components"

import theme from "../../theme"

export const FooterSection = styled.footer`
	background-color: ${theme.colors.background};
	border-top: 1px solid rgba(240, 165, 0, 0.22);
	color: ${theme.colors.textSecondary};
	font-family: ${theme.fonts.main};
	padding: 3rem ${theme.spacing.pagePadding.mobile} 1.5rem;

	@media (min-width: ${theme.breakpoints.tablet}) {
		padding: 3.5rem ${theme.spacing.pagePadding.tablet} 1.5rem;
	}

	@media (min-width: ${theme.breakpoints.laptop}) {
		padding: 4rem ${theme.spacing.pagePadding.desktop} 2rem;
	}
`

export const FooterInner = styled.div`
	margin: 0 auto;
	max-width: 1200px;
`

export const FooterGrid = styled.div`
	display: grid;
	gap: 2.5rem;
	grid-template-columns: 1fr;

	@media (min-width: ${theme.breakpoints.tablet}) {
		gap: 3rem;
		grid-template-columns: 1.5fr 1fr 1fr;
	}
`

export const FooterColumn = styled.div`
	display: flex;
	flex-direction: column;
`

export const FooterLogo = styled.img`
	height: auto;
	margin-bottom: 0.75rem;
	width: 140px;
`

export const FooterSlogan = styled.p`
	color: ${theme.colors.textSecondary};
	font-family: ${theme.fonts.secondary};
	font-size: 0.85rem;
	line-height: 1.6;
	margin: 0 0 1.5rem;
	max-width: 32ch;
`

export const ColumnHeading = styled.h3`
	color: ${theme.colors.primary};
	font-family: ${theme.fonts.heading};
	font-size: 0.75rem;
	font-weight: 600;
	letter-spacing: 0.14em;
	margin: 0 0 1rem;
	text-transform: uppercase;
`

export const InfoText = styled.p`
	color: ${theme.colors.textSecondary};
	font-size: 0.875rem;
	line-height: 1.7;
	margin: 0 0 0.5rem;
`

export const InfoLabel = styled.span`
	color: ${theme.colors.text};
	display: block;
	font-size: 0.8rem;
	font-weight: 600;
	letter-spacing: 0.02em;
`

export const FooterLink = styled.a`
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

export const SocialRow = styled.div`
	display: flex;
	gap: 0.75rem;
	margin-top: auto;
	padding-top: 0.5rem;
`

export const SocialLink = styled.a`
	align-items: center;
	border: 1px solid rgba(245, 245, 245, 0.18);
	border-radius: 50%;
	color: ${theme.colors.text};
	display: inline-flex;
	height: 40px;
	justify-content: center;
	transition: border-color 0.2s ease, color 0.2s ease, transform 0.2s ease;
	width: 40px;

	svg {
		height: 19px;
		width: 19px;
	}

	&:hover,
	&:focus-visible {
		border-color: ${theme.colors.primary};
		color: ${theme.colors.primary};
		transform: translateY(-2px);
	}

	&:focus-visible {
		outline: 2px solid ${theme.colors.primary};
		outline-offset: 3px;
	}
`

export const FooterBottom = styled.div`
	align-items: center;
	border-top: 1px solid rgba(245, 245, 245, 0.1);
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
	margin-top: 3rem;
	padding-top: 1.5rem;

	@media (min-width: ${theme.breakpoints.tablet}) {
		flex-direction: row;
		justify-content: space-between;
	}
`

export const Copyright = styled.p`
	color: ${theme.colors.hover};
	font-size: 0.75rem;
	letter-spacing: 0.03em;
	margin: 0;
`
