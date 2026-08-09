"use client"
import { useState, useEffect, useRef } from "react"
import { ThemeProvider, createGlobalStyle } from "styled-components"
import styled from "styled-components"

import Navbar from "./Components/Navbar/navbar"
import Homepage from "./Components/Homepage/homepage";
import Menu from "./Components/Menu/menu"
import Delivery from "./Components/Delivery/delivery"
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
	height: 84.59px;
`

const LineBreak = styled.hr`
	width: 100%;
	border: none;
  height: 2px;
  background-color: rgba(255, 255, 255, 0.2);
`

const App = ({ initialData }) => {
	const [resizeKey, setResizeKey] = useState(0)
	const [data] = useState(initialData) // already populated — no null, no loading

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
				<Menu data={data} loading={false} menuRef={menuRef}/>
				<LineBreak />
				<Delivery deliveryRef={deliveryRef}/>
				<LineBreak />
				<About aboutRef={aboutRef}/>
			</ThemeProvider>
		</>
  )
}

export default App