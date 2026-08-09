import styled from "styled-components"

export const HamburgerContainer = styled.div`
	display: flex;
	flex-direction: column;
	@media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
		display: none;
	}
`

export const HamburgerLine = styled.div`
	width: 25px;
	height: 2px;
	margin: 3px 0;
	background-color: ${({ $open, theme }) => $open ? `${theme.colors.primary}` : `${theme.colors.text}`};
	transition: all 0.25s ease-out;
	 ${({ $open }) =>
    $open &&
    `
    &:nth-child(1) {
      transform: rotate(45deg) translate(5px, 7.5px);
    }
    &:nth-child(2) {
      opacity: 0;
      transform: translateX(-20px);
    }
    &:nth-child(3) {
      transform: rotate(-45deg) translate(4px, -6px);
    }
  `}
`