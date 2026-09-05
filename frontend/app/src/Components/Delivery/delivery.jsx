import * as S from "./delivery.styles"
import uberEatsLogo from "../../Images/ubereats logo.svg"
import grubhubLogo from "../../Images/grubhub logo.png"

const Delivery = ({ deliveryRef }) => {
	return(
		<S.DeliverySection ref={deliveryRef}>
			<S.DeliveryTitle>DELIVERY</S.DeliveryTitle>
			<S.DeliveryContainer>
				<S.DeliveryCard 
					href="https://www.ubereats.com/store/ksushi/o3Ph-roTR1SnxAhvKAEIkA"
					target="_blank"
				>
					<S.DeliveryLogo
						$color="black"
						$padding="1em 0"
						src={uberEatsLogo.src} 
					/>
					<S.DeliveryButton>Order Now</S.DeliveryButton>
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
					<S.DeliveryButton>Order Now</S.DeliveryButton>
				</S.DeliveryCard>
			</S.DeliveryContainer>
		</S.DeliverySection>
	)
}

export default Delivery