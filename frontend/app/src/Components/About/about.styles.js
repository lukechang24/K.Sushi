import styled from "styled-components"

export const AboutSection = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color: ${({ theme }) => theme.colors.background};
	padding: 0 ${({ theme }) => theme.spacing.pagePadding.mobile};
	margin-bottom: 3rem;
	@media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
		padding: 0 ${({ theme }) => theme.spacing.pagePadding.tablet};
	}
	@media (min-width: ${({ theme }) => theme.breakpoints.laptop}) {
		padding: 0 ${({ theme }) => theme.spacing.pagePadding.desktop};
		margin-bottom: 5rem;
	}
`

export const AboutTitle = styled.h1`
	color: ${({ theme }) => theme.colors.text};
	font-size: 2rem;
	padding: 5px;
	border-top: 1px solid ${({ theme }) => theme.colors.primary};
	border-bottom: 1px solid ${({ theme }) => theme.colors.primary};
	margin: 3rem 0;
	@media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
		font-size: 2.5rem;
	}
	@media (min-width: ${({ theme }) => theme.breakpoints.laptop}) {
		margin: 5rem 0;
	}
`

export const AboutContainer = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	@media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
		align-items: start;
	}
	@media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
		align-items: center
	}
`

export const AboutDescriptionContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: start;
	gap: 2rem 0;
	color: ${({ theme }) => theme.colors.textSecondary};
	white-space: pre-wrap;

	@media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
		align-items: center;
	}
	@media (min-width: ${({ theme }) => theme.breakpoints.laptop}) {
		align-items: start;
		gap: 1rem;
	}
	@media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
		gap: 2rem 0;
	}
`


export const AboutDescriptionText = styled.p`
	font-size: 0.85rem;
	line-height: 1.3rem;
	// text-align: justify;
	@media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
		padding: 0 2rem;
	}
	@media (min-width: ${({ theme }) => theme.breakpoints.laptop}) {
		padding: 0 2rem;
	}
	@media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
		padding: 0 5rem;
	}
`

export const AboutImage = styled.img`
	width: 100%;
	display: ${({ $show }) => $show ? "none" : "block"};

	@media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
		width: 25rem;
	}

	@media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
		width: 30rem;
	}

	@media (min-width: ${({ theme }) => theme.breakpoints.laptop}) {
		display: ${({ $show }) => $show ? "block" : "none"};
		width: 35rem;
	}

	@media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
		width: 40rem;
	}
`