import styled, { keyframes } from "styled-components"
import { FaCircleNotch } from "react-icons/fa"
import { RxCaretUp } from "react-icons/rx"


export const MenuSection = styled.div`
	width: 100%;
	padding: 0 ${({ theme }) => theme.spacing.pagePadding.mobile};
	margin-bottom: 5rem;
	@media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
		padding: 0 ${({ theme }) => theme.spacing.pagePadding.tablet};
	}
	@media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
		padding: 0 ${({ theme }) => theme.spacing.pagePadding.desktop};
	}
`

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`

export const Spinner = styled(FaCircleNotch)`
  font-size: 3rem;
	margin-top: 10rem;
  color: ${({ theme }) => theme.colors.text};
  animation: ${spin} 1s linear infinite;
`

export const Menu = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	color: ${({ theme }) => theme.colors.text};
`

export const MenuTitle = styled.h1`
	color: ${({ theme }) => theme.colors.text};
	font-size: 2rem;
	text-align: center;
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

export const CategoryLinkContainer = styled.div`
	max-width: ${({ theme }) => theme.breakpoints.mobile};
	display: flex;
	flex-wrap: wrap;
	gap: 20px 2.7%;
	margin-bottom: 20px;
	@media (min-width: ${({ theme }) => theme.breakpoints.laptop}) {
		max-width: ${({ theme }) => theme.breakpoints.laptop};
		width: 100%;
		justify-content: center;
		margin-bottom: 2rem;
	}
`

export const CategoryLink = styled.button`
	display: flex;
	flex: 0 1 calc(31.4%);
	flex-direction: column;
	align-items: center;
	background-color: transparent;
	color: ${({ $active, theme }) => $active ? theme.colors.primary : theme.colors.text};
	border: none;
	cursor: pointer;
	transition: all 0.25s ease-in-out;

	&:hover {
		color: ${({ theme }) => theme.colors.primary};
	}

	@media (min-width: ${({ theme }) => theme.breakpoints.laptop}) {
		flex: 0 1 14.4%;
	}
`

export const CategoryLinkIcon = styled.img`
	width: 80px;
	height: 80px;
	background-color: white;
	border-radius: 100px;
	@media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
		width: 100px;
		height: 100px;	
	}
	@media (min-width: ${({ theme }) => theme.breakpoints.laptop}) {
		width: 115px;
		height: 115px;
	}
`

export const CategoryLinkName = styled.h3`
	font-family: ${props => props.theme.fonts.main};
	font-size: 0.75rem;
	text-align: center;
	margin-top: 0.65rem;
	@media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
		font-size: 1rem;
	}
`

export const CategoryList = styled.div`
	max-width: ${({ theme }) => theme.breakpoints.laptop};
	display: flex;
	flex-direction: column;
	width: 100%;
`


export const BackToTop = styled.button`
  position: fixed;
  top: 84px;
  right: ${({ theme }) => theme.spacing.pagePadding.mobile};
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  border: none;
	margin-right: 0.25rem;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0,0,0,0.3);
	z-index: 6;
  transition: background-color 0.2s ease, transform 0.2s ease;

	@media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
		top: 86px;
		left: ${({ theme }) => `calc(100vw - ${theme.spacing.pagePadding.tablet})`};
		font-size: 2rem;
		margin-right: 0.5rem;
	}
	@media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
		top: 88px;

	}
`

export const ChevronUp = styled(RxCaretUp)`
`