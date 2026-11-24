import logo from "../../Images/logo.png"

import * as S from "./footer.styles"

const ADDRESS = "16436 Norwalk Blvd, Cerritos, CA 90703"
const PHONE_DISPLAY = "+1 (562) 926-6556"
const PHONE_HREF = "tel:+15629266556"
const DIRECTIONS =
	"https://www.google.com/maps/dir/?api=1&destination=16436+Norwalk+Blvd%2C+Cerritos%2C+CA+90703"

// TODO: swap in your real handles
const INSTAGRAM = "https://www.instagram.com/ksushicerritos/"
const TIKTOK = "https://www.tiktok.com/@ksushicerritos"

const structuredData = {
	"@context": "https://schema.org",
	"@type": "Restaurant",
	name: "K. Sushi",
	description:
		"Family-owned Japanese sushi restaurant in Cerritos, CA serving sushi, hand rolls and fusion specials since 2005.",
	url: "https://ksushi.menu",
	telephone: "+1-562-926-6556",
	priceRange: "$$",
	servesCuisine: ["Japanese", "Sushi"],
	address: {
		"@type": "PostalAddress",
		streetAddress: "16436 Norwalk Blvd",
		addressLocality: "Cerritos",
		addressRegion: "CA",
		postalCode: "90703",
		addressCountry: "US",
	},
	geo: {
		"@type": "GeoCoordinates",
		latitude: 33.88097464075639,
		longitude: -118.07230608775114,
	},
	openingHoursSpecification: [
		{
			"@type": "OpeningHoursSpecification",
			dayOfWeek: [
				"Monday",
				"Tuesday",
				"Wednesday",
				"Thursday",
				"Friday",
				"Saturday",
			],
			opens: "11:30",
			closes: "14:30",
		},
		{
			"@type": "OpeningHoursSpecification",
			dayOfWeek: [
				"Monday",
				"Tuesday",
				"Wednesday",
				"Thursday",
				"Friday",
				"Saturday",
			],
			opens: "17:00",
			closes: "21:00",
		},
	],
	sameAs: [INSTAGRAM, TIKTOK],
}

const Footer = ({ scrollToCorrectHeight, menuRef, deliveryRef, aboutRef }) => {
	const year = new Date().getFullYear()

	return (
		<S.FooterSection>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
			/>

			<S.FooterInner>
				<S.FooterGrid>
					<S.FooterColumn>
						<S.FooterLogo src={logo.src} alt="K. Sushi" />
						<S.FooterSlogan>
							Japanese sushi, hand rolls, &amp; fusion specials. Family-owned
							and operated in Cerritos since 2005.
						</S.FooterSlogan>
						<S.SocialRow>
							<S.SocialLink
								href={INSTAGRAM}
								target="_blank"
								rel="noopener noreferrer"
								aria-label="K. Sushi on Instagram"
							>
								<svg
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="1.7"
									strokeLinecap="round"
									strokeLinejoin="round"
									aria-hidden="true"
								>
									<rect x="2.5" y="2.5" width="19" height="19" rx="5" />
									<circle cx="12" cy="12" r="4.2" />
									<circle
										cx="17.4"
										cy="6.6"
										r="1.1"
										fill="currentColor"
										stroke="none"
									/>
								</svg>
							</S.SocialLink>
							<S.SocialLink
								href={TIKTOK}
								target="_blank"
								rel="noopener noreferrer"
								aria-label="K. Sushi on TikTok"
							>
								<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
									<path d="M16.6 2h-3.1v14.1a2.9 2.9 0 1 1-2.3-2.8v-3.2a6.1 6.1 0 1 0 5.4 6V9.3a8.4 8.4 0 0 0 4.4 1.3v-3a5.4 5.4 0 0 1-4.4-5.6Z" />
								</svg>
							</S.SocialLink>
						</S.SocialRow>
					</S.FooterColumn>

					<S.FooterColumn>
						<S.ColumnHeading>Visit</S.ColumnHeading>
						<S.FooterLink
							href={DIRECTIONS}
							target="_blank"
							rel="noopener noreferrer"
						>
							{ADDRESS}
						</S.FooterLink>
						<S.FooterLink href={PHONE_HREF}>{PHONE_DISPLAY}</S.FooterLink>

						<S.ColumnHeading style={{ marginTop: "1.5rem" }}>
							Hours
						</S.ColumnHeading>
						<S.InfoText>
							<S.InfoLabel>Mon &ndash; Sat</S.InfoLabel>
							11:30AM &ndash; 2:30PM
							<br />
							5:00PM &ndash; 9:00PM
						</S.InfoText>
						<S.InfoText>
							<S.InfoLabel>Sunday</S.InfoLabel>
							Closed
						</S.InfoText>
					</S.FooterColumn>

					<S.FooterColumn>
						<S.ColumnHeading>Explore</S.ColumnHeading>
						<S.FooterLink
							onClick={(e) => {
								e.preventDefault()
								scrollToCorrectHeight(e, menuRef)
							}}
						>
							Menu
						</S.FooterLink>
						<S.FooterLink
							onClick={(e) => {
								e.preventDefault()
								scrollToCorrectHeight(e, deliveryRef)
							}}
						>
							Order Online
						</S.FooterLink>
						<S.FooterLink
							onClick={(e) => {
								e.preventDefault()
								scrollToCorrectHeight(e, aboutRef)
							}}
						>
							Our Story
						</S.FooterLink>
					</S.FooterColumn>
				</S.FooterGrid>

				<S.FooterBottom>
					<S.Copyright>
						&copy; {year} K. Sushi. All rights reserved.
					</S.Copyright>
					<S.Copyright>Cerritos, California</S.Copyright>
				</S.FooterBottom>
			</S.FooterInner>
		</S.FooterSection>
	)
}

export default Footer