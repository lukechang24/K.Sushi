import styled, { keyframes } from "styled-components"
import { PiHandTapDuotone } from "react-icons/pi";

const blinkAnimation = keyframes`
  0% {
    opacity: 0.15;
  }
	30% {
		opacity: 1;
	}
	70% {
		opacity: 1;
	}
  100% {
    opacity: 0.15;
  }
`

export const ItemContainer = styled.li`
	position: relative;
  list-style: none;
	flex: 0 1 calc(50% - 2%);
	cursor: pointer;
	margin-bottom: 0.75rem;

	@media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
		flex: 0 1 calc(32.9% - 1%);
		margin-bottom: 1rem;
	}

	@media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
		flex: 0 1 calc(24.5% - 1%);
		margin-bottom: 1.5rem;
	}
)
`

export const ItemImage = styled.img`
	width: 100%;
  aspect-ratio: 4 / 3;
	object-fit: cover;
	object-position: center center;
	border-radius: 3px;
	// filter: brightness(90%);
`

export const ItemInfoContainer = styled.div`
	display: flex;
	justify-content: space-between;
`

export const ItemName = styled.h3`
	font-size: 0.875rem;
	white-space: pre-line;
	@media (min-width: ${({ theme }) => theme.breakpoints.laptop}) {
		font-size: 1.05rem;
	}
`

export const SmallText = styled.p`
	font-size: 0.7rem;
	@media (min-width: ${({ theme }) => theme.breakpoints.laptop}) {
		font-size: 0.8rem;
	}
`

export const ItemPrice = styled.p`
	font-size: 12px;
	padding-top: 1px;
	margin-left: 5px;
	@media (min-width: ${({ theme }) => theme.breakpoints.laptop}) {
		font-size: 0.875rem;
	}
`

export const ItemTouch = styled(PiHandTapDuotone)`
	font-size: 5rem;
	position: absolute;
	top: 40%;
	left: 50%;
	transform: translate(-50%, -50%);
	animation: ${blinkAnimation} 1.5s linear infinite;
	@media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
		font-size: 4.5rem;
	}
	@media (min-width: ${({ theme }) => theme.breakpoints.laptop}) {
		font-size: 5rem;
	}
`