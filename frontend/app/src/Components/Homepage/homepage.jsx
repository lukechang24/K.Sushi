"use client"
import * as S from "./homepage.styles"

const Homepage = ({ menuRef, scrollToCorrectHeight }) => {
	return (
		<S.HomepageSection>
			<S.Banner>
				On Thanksgiving Day (November 26th), we will accept pickups for takeout
				until 12:00 PM. We will be closed for the remainder of the day.
			</S.Banner>

			<S.HomepageTagline>
				Sushi in Cerritos
				<S.TaglineSub>Family-owned and operated since 2005</S.TaglineSub>
			</S.HomepageTagline>

			<S.HomepageMenuLink
				href="#menu"
				onClick={(e) => scrollToCorrectHeight(e, menuRef)}
			>
				View Menu
				<S.DownArrow />
			</S.HomepageMenuLink>

			<S.HomepageInfoContainer>
				<S.HomepageAddress>
					16436 Norwalk Blvd, Cerritos, CA 90703
				</S.HomepageAddress>
				<S.HomepageHours>
					Mon &ndash; Sat: 11:30AM &ndash; 2:30PM &amp; 5:00PM &ndash; 9:00PM |
					Sun: Closed
				</S.HomepageHours>
				<S.HomepagePhone href="tel:+15629266556">
					+1 (562) 926-6556
				</S.HomepagePhone>
			</S.HomepageInfoContainer>
		</S.HomepageSection>
	)
}

export default Homepage
