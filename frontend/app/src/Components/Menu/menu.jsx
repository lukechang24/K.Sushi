"use client"
import { useState, useEffect, useLayoutEffect, useRef } from "react"
import Category from "./Category/category"
import Modal from "./Modal/modal"

import salmon from "../../Images/salmon nigiri.jpg"
import tuna from "../../Images/tuna lovers roll.jpg"
import chicken from "../../Images/chicken bento.jpg"
import gyoza from "../../Images/gyoza.jpg"
import yuzu from "../../Images/yuzu mule.jpg"
import tempura from "../../Images/tempura ice cream.jpg"

import * as S from "./menu.styles"

const categoryUrl = [salmon, tuna, chicken, gyoza, yuzu, tempura]

const Menu = ({ data, loading, menuRef }) => {
	const [activeTab, setActiveTab] = useState(data && Object.keys(data)[0])
	const [activeSub, setActiveSub] = useState("")
	const [selectedItem, setSelectedItem] = useState(null)
	const [showHint, setShowHint] = useState(true)

	const hasMounted = useRef(false)
	const initialCategory = useRef(null)
	const categoryListRef = useRef(0)
	const subRefs = useRef([])
	const subOffsets = useRef([])
	const lastScrollY = useRef(0)
	const lastWindowWidth = useRef(0)
	const triggeredHintRef = useRef(false)

	const activeAccordionRef = useRef(null)

	const handleItemClick = (item) => {
		setSelectedItem(item)
	}

	const closeModal = () => {
		setSelectedItem(null)
	}

	const scrollToAccordion = (isLink = false) => {
		if (activeAccordionRef.current) {
			const absoluteTop = activeAccordionRef.current.getBoundingClientRect().top + window.pageYOffset
			if (absoluteTop > window.pageYOffset && !isLink) {
				return
			}
			window.scrollTo({
				top: absoluteTop - 180,
				behavior: 'smooth'
			})
		}
	}

	const handleTab = (tabName) => {
		if (activeTab === tabName) {
			subRefs.current = []
			subOffsets.current = []
			setActiveTab(null)
		} else {
			setActiveSub(null)
			setActiveTab(tabName)
			subRefs.current = []
			subOffsets.current = []
		}
	}

	useEffect(() => {
		if (!loading) {
			const first = Object.keys(data)[0]
			setActiveTab(first)
			initialCategory.current = first
		}
	}, [loading, data])

	useEffect(() => {
		const handleScroll = () => {
			const scrollPos = window.scrollY
			const scrollingDown = scrollPos > lastScrollY.current
			lastScrollY.current = scrollPos
			const menu = menuRef.current
			const menuTop = menu && menu.offsetTop

			if (!triggeredHintRef.current && scrollPos >= menuTop && scrollPos <= menuTop + menu.offsetHeight - 200) {
				triggeredHintRef.current = true
				setTimeout(() => {
					setShowHint(false)
				}, 10000)
			}

			if (menu && (scrollPos > menu.offsetTop + menu.offsetHeight - 130)) {
				setActiveSub(null)
				return
			}

			if (!subOffsets.current.length) return

			if (scrollingDown) {
				let current = ""
				for (let i = 0; i < subOffsets.current.length; i++) {
					if (subOffsets.current[i] - 90 <= scrollPos) {
						current = subRefs.current[i].dataset.name
					}
				}
				setActiveSub(current)
			} else {
				let current = ""
				for (let i = subOffsets.current.length - 1; i >= 0; i--) {
					if (subOffsets.current[i] - 90 <= scrollPos) {
						current = subRefs.current[i].dataset.name
						break
					}
				}
				setActiveSub(current)
			}
		}

		window.addEventListener("scroll", handleScroll)
		return () => window.removeEventListener("scroll", handleScroll)
	}, [menuRef])

	useLayoutEffect(() => {
		const handleResize = () => {
			if (window.innerWidth !== lastWindowWidth.current) {
				lastWindowWidth.current = window.innerWidth
				setActiveTab(null)
				setActiveSub(null)
			}
		}

		window.addEventListener("resize", handleResize)
		return () => window.removeEventListener("resize", handleResize)
	}, [])

	return(
		<S.MenuSection ref={menuRef}>
			{loading 
				?
					<S.Menu>
						<S.MenuTitle>MENU</S.MenuTitle>
						<S.Spinner></S.Spinner>
					</S.Menu>
				:
					<S.Menu>
						<S.MenuTitle>MENU</S.MenuTitle>
						<S.CategoryLinkContainer>
							{Object.keys(data).slice(1).map((category, i) => {
								const isActive = activeTab === category
								return(
									<S.CategoryLink
										key={category}
										$active={isActive}
										onClick={() => {
											if (isActive) {
												scrollToAccordion(true)
											} else {
												handleTab(category)
											}
										}}
									>
										<S.CategoryLinkIcon src={categoryUrl[i].src}></S.CategoryLinkIcon>
										<S.CategoryLinkName>{category}</S.CategoryLinkName>
									</S.CategoryLink>
								)})
							}
						</S.CategoryLinkContainer>
						<S.CategoryList ref={categoryListRef}>
							{Object.keys(data).map((category, i)=> {
								return(
								<Category 
									key={category}
									title={category}
									items={data[category]}
									categoryIndex={i}
									categoryListRef={categoryListRef}
									handleItemClick={handleItemClick}
									closeModal={closeModal}
									isOpen={activeTab === category}
									handleTab={handleTab}
									activeSub={activeSub}
									subRefs={subRefs}
									subOffsets={subOffsets}
									accordionRef={activeAccordionRef}
									scrollToAccordion={scrollToAccordion}
									hasMounted={hasMounted}
									initialCategory={initialCategory}
									showHint={showHint}
								/>)
						})}
						{selectedItem &&
							<Modal 
								data={selectedItem}
								closeModal={closeModal}
							/>
						}
						</S.CategoryList>
					</S.Menu>
			}
		</S.MenuSection>
	)
}

export default Menu