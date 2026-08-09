import styled from "styled-components"

export const DeliverySection = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 0 ${({ theme }) => theme.spacing.pagePadding.mobile};
	margin-bottom: 5rem;
	@media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
		padding: 0 ${({ theme }) => theme.spacing.pagePadding.tablet};
	}
	@media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
		padding: 0 ${({ theme }) => theme.spacing.pagePadding.desktop};
	}
`

export const DeliveryTitle = styled.h1`
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

export const DeliveryContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 3rem 0;
	margin: 2rem 0;
	@media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
		flex-direction: row;
		gap: 0 5rem;
		margin: 3rem 0;
	}
	@media (min-width: ${({ theme }) => theme.breakpoints.laptop}) {
		margin: 3rem 0;
	}
	@media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
		margin: 5rem 0;
	}
`

export const DeliveryCard = styled.a`
	display: flex;
	flex-direction: column;
	align-items: center;
	cursor: pointer;
	text-decoration: none;
	@media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
		&:hover > div {
			border-bottom: 1px solid ${({ theme }) => theme.colors.text};
		}
		&:hover > img {
				background-color: ${({ theme }) => theme.colors.primary};
		}
	}
`

export const DeliveryLogo = styled.img`
	width: 13rem;
	background-color: ${({ $color }) => $color};
	padding: ${({ $padding }) => $padding};
	border-radius: 8px;
	transition: all 0.2s ease;
`

export const DeliveryButton = styled.div`
	box-sizing: border-box;
	color: ${({ theme }) => theme.colors.text};
	border-bottom: 1px solid ${({ theme }) => theme.colors.text};
	margin-top: 1rem;
	transition: all 0.2s ease;
	@media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
		border-bottom: 1px solid transparent;
		margin-top: 1.5rem;
	}
`