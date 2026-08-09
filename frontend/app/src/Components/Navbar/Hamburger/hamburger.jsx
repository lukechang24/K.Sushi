import * as S from "./hamburger.styles"


const Hamburger = ({ open, setShowNav }) => {
	return(
		<S.HamburgerContainer
			onClick={() => setShowNav(!open)}
		>
			<S.HamburgerLine $open={open}></S.HamburgerLine>
			<S.HamburgerLine $open={open}></S.HamburgerLine>
			<S.HamburgerLine $open={open}></S.HamburgerLine>
		</S.HamburgerContainer>
	)
}

export default Hamburger