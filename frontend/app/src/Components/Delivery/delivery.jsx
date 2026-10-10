import * as S from "./delivery.styles"
import doordashLogo from "../../Images/doordash_logo.png"
import uberEatsLogo from "../../Images/ubereats_logo.svg"
import grubhubLogo from "../../Images/grubhub_logo.png"

const Delivery = ({ deliveryRef }) => {
	return(
		<S.DeliverySection ref={deliveryRef}>
			<S.DeliveryTitle>DELIVERY</S.DeliveryTitle>
			<S.DeliveryContainer>
				<S.DeliveryCard 
					href="https://www.doordash.com/store/k.-sushi-cerritos-52196799/121226946/"
					target="_blank"
				>
					<S.DeliveryLogo
						$color="white"
						$padding="1em 1em"
						src={doordashLogo.src} 
					/>
					<S.DeliveryButton>Order Doordash</S.DeliveryButton>
				</S.DeliveryCard>
				<S.DeliveryCard 
					href="https://www.ubereats.com/store/ksushi/o3Ph-roTR1SnxAhvKAEIkA"
					target="_blank"
				>
					<S.DeliveryLogo
						$color="black"
						$padding="1em 0"
						src={uberEatsLogo.src} 
					/>
					<S.DeliveryButton>Order Uber Eats</S.DeliveryButton>
				</S.DeliveryCard>

				<S.DeliveryCard 
					href="https://www.grubhub.com/restaurant/ksushi-16436-norwalk-blvd-cerritos/2053881"
					target="_blank"
				>
					<S.DeliveryLogo 
						$color="white"
						$padding="2.2em 0"
						src={grubhubLogo.src}
					/>
					<S.DeliveryButton>Order Grubhub</S.DeliveryButton>
				</S.DeliveryCard>
			</S.DeliveryContainer>
		</S.DeliverySection>
	)
}

export default Delivery