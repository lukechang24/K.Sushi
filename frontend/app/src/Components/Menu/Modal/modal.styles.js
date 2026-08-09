import styled, { keyframes } from "styled-components"
import { FaPepperHot } from "react-icons/fa";

const fadeIn = keyframes`
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
`

export const ModalSection= styled.div`
	position: fixed;
	inset: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100vw;
	height: 100vh;
	overflow: hidden;
	animation: ${fadeIn} 0.2s ease-in-out forwards;
	z-index: 60;
`

export const Overlay = styled.div`
	position: fixed;
	width: 100%;
	height: 100%;
	opacity: 0.5;
	background-color: black;
`

export const ModalContainer = styled.div`
	width: 90%;
	position: fixed;
	display: flex;
	flex-direction: column;
	background-color: #111;
	padding: 1.675rem;
	border-radius: 10px;
	margin: 0 10px;
	z-index: 50;
	
	@media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
		width: 400px;
		padding: 2rem;
	}

	@media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
		width: 500px;
		padding: 2.5rem;
	}
`

export const ExitButton = styled.button`
	box-sizing: content-box;
	position: absolute;
	top: 0;
	right: 0;
	width: 30px;
	height: 30px;
	background-color: transparent;
	color: ${props => props.theme.colors.text};
	font-size: 30px;
	padding-bottom: 2px;
	border: none;
	cursor: pointer;
	&:hover {
		background-color: darkRed;
	}
	&:active {
		color: white;
		background-color: darkRed;
	}
	&:focus {
		color: white;
		background-color: darkRed;
	}

	@media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
		top: 3px;
		right: 3px;
	}

	@media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
		top: 6px;
		right: 6px;
	}
`

export const ModalImageContainer = styled.div`
	position: relative;
  width: 100%;
  height: auto;
	aspect-ratio: 1 / 1;
`


export const BlurredImage = styled.img`
	position: absolute;
	inset: 0;
	width: 100%;
	height: 100%;
	aspect-ratio: 1 / 1;
	object-fit: cover;
`

export const FullImage = styled.img`
	position: absolute;
	inset: 0;
	width: 100%;
	height: 100%;
	display: ${({ $isLoaded }) => ($isLoaded ? "block" : "none")};
	aspect-ratio: 1 / 1;
	object-fit: cover;
	// filter: brightness(90%)
`

export const ModalName = styled.h2`
	color: ${({ theme }) => theme.colors.text};
	font-weight: 600;
	margin-top: 0.5rem;
	@media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
		margin-top: 0.75rem;
	}

	@media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
		margin-top: 1rem;
	}
`

export const ModalPrice = styled.p`
	color: ${({ theme }) => theme.colors.primary};
	font-weight: 600;
	margin-top: 0.25rem;
`

export const ModalInfoContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.75rem 0;
	margin-top: 1rem;
	@media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
		gap: 1rem 0;
	}
	@media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
	
	}
`

export const ModalDescription = styled.p`
	color: ${({ theme }) => theme.colors.textSecondary};
	font-weight: 300;
	line-height: 20px;
	white-space: pre-line;
`

export const Bold = styled.span`
	font-weight: 800;
	margin-right: 0.2rem;
`

export const ModalExtraContainer = styled.div`
	display: flex;
	align-items: center;
	color: ${({ theme }) => theme.colors.textSecondary};
	& > *:not(:last-child)::after {
    content: "•";
    margin: 0 0.425rem;
    color: #a1a1a1;
  }
`

export const ModalPieceCount = styled.p`
	font-weight: 300;
`

export const SpiceLevel = styled(FaPepperHot)`
	color: red;
`