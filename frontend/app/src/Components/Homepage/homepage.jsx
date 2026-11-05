"use client"
import * as S from "./homepage.styles"

const Homepage = ({ menuRef, scrollToCorrectHeight }) => {
	return(
		<S.HomepageSection>
			{/* <S.Banner>We will now be closed on Tuesdays and open on Sundays beginning October 20, 2026</S.Banner> */}
			{/* <S.Banner>On November 26th, we will be open for takeout only from 10:30 AM to 12:00 PM, and closed for the remainder of the day.</S.Banner> */}
			<S.HomepageTagline>Family-owned and operated since 2005</S.HomepageTagline>
			<S.HomepageMenuLink onClick={(e) => scrollToCorrectHeight(e, menuRef)} href="#menu">
				VIEW MENU
				<S.DownArrow></S.DownArrow>
			</S.HomepageMenuLink>
			<S.HomepageInfoContainer>
				<S.HomepageAddress>16436 Norwalk Blvd, Cerritos, CA 90703</S.HomepageAddress>
				<S.HomepageHours>Mon – Sat: 11:30AM – 2:30PM & 5:00PM – 9:00PM | Sun: Closed</S.HomepageHours>
				<S.HomepagePhone href="tel:+15629266556">+1 (562) 926-6556</S.HomepagePhone>
			</S.HomepageInfoContainer>
			{/* <S.HomepageSeperator></S.HomepageSeperator> */}
		</S.HomepageSection>
	)
}

export default Homepage