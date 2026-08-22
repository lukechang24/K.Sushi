import * as S from "./about.styles"
import familyPhoto from "../../Images/ksushi_in.jpg"

const About = ({ aboutRef }) => {
	return(
		<S.AboutSection ref={aboutRef}>
			<S.AboutTitle>OUR STORY</S.AboutTitle>
			<S.AboutContainer>
				<S.AboutImage $show src={familyPhoto.src}></S.AboutImage>
				<S.AboutDescriptionContainer>
					<S.AboutDescriptionText>
						Welcome to K. Sushi! For nearly two decades, our family has been proud to serve the Cerritos community traditional Japanese cuisine with heart.
					</S.AboutDescriptionText>
					<S.AboutImage src={familyPhoto.src} alt="Family photo"></S.AboutImage>
					<S.AboutDescriptionText>
						We specialize in traditional Japanese sushi crafted the authentic way - fresh nigiri, delicate sashimi, and hand rolls. Our sushi chefs have perfected recipes passed down through our family, using only the highest quality fish and ingredients.
					</S.AboutDescriptionText>
					<S.AboutDescriptionText>
						We've also created unique fusion specialties that blend the bold flavors of Korea with traditional Japanese techniques. At K. Sushi, we believe great food starts with great relationships. Many of our customers have been coming here for years - we've watched their families grow, celebrated their special occasions, and they've become part of our extended family. We source the freshest fish, never rush our preparation, and serve every plate with the same care we'd give our own family.
					</S.AboutDescriptionText>
					<S.AboutDescriptionText>
						When you visit K. Sushi, you're not just getting dinner - you're experiencing 20 years of Japanese culinary tradition, family recipes, and the warmth of a restaurant where everyone is treated like family!
					</S.AboutDescriptionText>
					<S.AboutDescriptionText>
						Hope to see you soon!
					</S.AboutDescriptionText>
				</S.AboutDescriptionContainer>
			</S.AboutContainer>
		</S.AboutSection>
	)
}

export default About