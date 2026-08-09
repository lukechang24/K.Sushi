import styled from "styled-components"
import { motion } from "framer-motion"
import { RxCaretRight, RxCaretDown, RxCaretUp } from "react-icons/rx"
import { FaStar } from "react-icons/fa"

// const fade = keyframes`
// 	from {
// 		transform: translateY(-100px);
// 	}
// 	to {
// 		transform: translateY(0);
// 	}
// `;

export const CategoryContainer = styled.div`
	display: flex;
	flex-direction: column;
`

export const AccordionContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	font-size: 1.15rem;
	padding: 0.5em;
	border-bottom: 1px solid ${props => props.theme.colors.primary};
	margin-bottom: 0.5em;
	cursor: pointer;
	transition: all 0.25s ease-in-out;

	&:hover {
		color: ${({ theme }) => theme.colors.primary};
	}
	
	@media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
		padding: 0.75em;
		margin-bottom: 0.75em;
	}
`

export const AccordionTitle = styled.h2`
	display: flex;
	align-items: center;
	// color: ${({ $active, theme }) => $active ? `${theme.colors.primary}` : `${theme.colors.text}`};
	@media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
		font-size: 1.25rem;
	}
	@media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
		font-size: 1.5rem;
	}
`

export const RightCaret = styled(RxCaretRight)`
	font-size: 1.5rem;
	@media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
		font-size: 2rem;
	}
`

export const DownCaret = styled(RxCaretDown)`
	// color: ${({ theme }) => theme.colors.primary};
	font-size: 1.5rem;
	@media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
		font-size: 2rem;
	}
`

export const Star = styled(FaStar)`
	color: #F0A500;
	margin-left: 0.5rem;
`

export const ItemList = styled(motion.div)`
	display: flex;
	flex-wrap: wrap;
	gap: 0 4%;
	@media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
		gap: 0 2%;
	}

	@media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
		gap: 0 2%;
	}
`

export const SubcategoryTitle = styled.h3`
	position: ${props => props.$sticky ? "fixed" : "relative"};
	top: ${props => props.$sticky ? "84px" : "0"};
	left: 0;
	width: 100%;
	font-size: 1.25rem;
	background-color: ${({ theme }) => theme.colors.background};
	color: ${({ theme }) => theme.colors.text};
	padding: ${({ theme, $sticky }) => $sticky ? `10px ${theme.spacing.pagePadding.mobile} 10px` : "10px 0 10px"};
	box-shadow: ${props => props.$sticky ? "none" : "none"};
	z-index: 5;
	@media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
		top: ${props => props.$sticky ? "98px" : "0"};
		font-size: 1.5rem;
		padding: ${({ theme, $sticky }) => $sticky ? `10px ${theme.spacing.pagePadding.tablet} 10px` : "10px 0 10px"};
	}
	@media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
		top: ${props => props.$sticky ? "86px" : "0"};
		font-size: 1.75rem;
		padding: ${({ theme, $sticky }) => $sticky ? `10px ${theme.spacing.pagePadding.desktop} 10px` : "10px 0 10px"};
	}
	@media (min-width: ${({ theme }) => theme.breakpoints.laptop}) {
		top: ${props => props.$sticky ? "90px" : "0"};
		left: 50%;
		width: ${({ theme }) => theme.breakpoints.laptop};
		transform: translateX(-50%);
		padding: ${({ $sticky }) => $sticky ? `10px 0 10px` : "10px 0 10px"};
	}
`

export const InvisibleSpace = styled.h2`
	width: 100%;
	display: ${props => props.$show ? "block" : "none"};
	color: ${({ theme }) => theme.colors.background};
	font-size: 1.25rem;
	padding: 10px 0 10px;
	@media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
		font-size: 1.5rem;
	}
	@media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
		font-size: 1.75rem;
	}
`

export const BackToTop = styled.button`
  position: absolute;
	top: 12px;
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
	z-index: 6;
  transition: background-color 0.2s ease, transform 0.2s ease;

	@media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
		right: ${({ theme }) => theme.spacing.pagePadding.tablet};
		font-size: 2rem;
		margin-right: 0.25rem;
	}
	@media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
		right: ${({ theme }) => theme.spacing.pagePadding.laptop};
	}
	@media (min-width: ${({ theme }) => theme.breakpoints.laptop}) {
		right: 0;
	}
`

export const ChevronUp = styled(RxCaretUp)`
`