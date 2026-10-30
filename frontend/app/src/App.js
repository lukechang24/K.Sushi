"use client"
import { useState, useEffect, useRef } from "react"
import { ThemeProvider, createGlobalStyle } from "styled-components"
import styled from "styled-components"

import Navbar from "./Components/Navbar/navbar"
import Homepage from "./Components/Homepage/homepage"
import ReviewsCarousel from "./Components/ReviewsCarousel/reviewsCarousel"
import Menu from "./Components/Menu/menu"
import Delivery from "./Components/Delivery/delivery"
import MailingList from "./Components/MailingList/mailingList"
import About from "./Components/About/about"
import theme from "./theme"

const GlobalStyle = createGlobalStyle`
	*, *::before, *::after {
    	box-sizing: border-box;
  	}
	html {
  		scroll-behavior: smooth;
	}
		
	body, h1, h2, h3, p, ul, ol, button {
		margin: 0;
		padding: 0;
			font-weight: normal;
	}

	body {
		font-family: ${props => props.theme.fonts.main};
		background-color: ${props => props.theme.colors.background};
		color: ${props => props.theme.colors.text};
	}

	#root {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
`
const NavbarSpace = styled.div`
	width: 100%;
	height: 71.84px;
`

const LineBreak = styled.hr`
	width: 100%;
	border: none;
	height: 1px;
	background: linear-gradient(
		to right,
		transparent,
		${props => props.theme.colors.primary}66,
		transparent
	);
`

const App = ({ menuData, reviewsData }) => {
	const [resizeKey, setResizeKey] = useState(0)

	const menuRef = useRef(0)
	const deliveryRef = useRef(0)
	const aboutRef = useRef(0)
	const scrollToCorrectHeight = (e, el) => {
		e.preventDefault()
		window.scrollTo({ top: el.current.offsetTop - 50, behavior: 'smooth' })
	}

	useEffect(() => {
		// the axios.get menu-fetching block is gone — data arrives as a prop now
		const handleResize = () => {
			if (window.innerWidth >= 768) setResizeKey(prev => prev + 1)
		}
		window.addEventListener("resize", handleResize)
  	return () => window.removeEventListener("resize", handleResize)
	}, [])

  return (
		<>
			<ThemeProvider theme={theme}>
				<GlobalStyle />
				<Navbar menuRef={menuRef} deliveryRef={deliveryRef} aboutRef={aboutRef} scrollToCorrectHeight={scrollToCorrectHeight} key={resizeKey}/>
				<NavbarSpace></NavbarSpace>
				<Homepage menuRef={menuRef} scrollToCorrectHeight={scrollToCorrectHeight}/>
				{/* <LineBreak /> */}
				<ReviewsCarousel data={reviewsData} />
				<LineBreak />
				<Menu data={menuData} loading={false} menuRef={menuRef}/>
				<LineBreak />
				<Delivery deliveryRef={deliveryRef}/>
				{/* <LineBreak /> */}
				{/* <MailingList /> */}
				<LineBreak />
				<About aboutRef={aboutRef}/>
			</ThemeProvider>
		</>
  )
}

export default App