import { useState } from "react"
import { getMenuImageUrl } from "../../../helper"
import comingSoon from "../../../Images/coming_soon.jpg"

import * as S from "./modal.styles"

const Modal = ({ data, closeModal }) => {
	const [loaded, setLoaded] = useState(false)

	const lowRes = data.url ? getMenuImageUrl(data.url, "160x160") : comingSoon.src;
	const highRes = data.url ? getMenuImageUrl(data.url, "1040x1040") : comingSoon.src;

	const hasDescription = Boolean(data.description)
	const hasExtra = Boolean(data.pcs || data.spicy)

	const spiceLevel = []
	if (data.spicy) {
		for (let i = 0; i < data.spicy; i++) {
			spiceLevel.push(<S.SpiceLevel key={i}></S.SpiceLevel>)
		}
	}
	const formatInOut = (desc) => {
		if (!desc) return null

		const parts = desc.split(/(In: |Out: )/).filter(Boolean)

		return parts.map((part, i) => {
			if (part === "In: " || part === "Out: ") {
				return (
					<S.Bold key={i}>
						{part}
					</S.Bold>
				)
			}
    	return <span key={i}>{part}</span>
		})
	}

	return(
		<S.ModalSection
			// $isLoaded={loaded}
		>
			<S.Overlay onClick={() => closeModal()}></S.Overlay>
			<S.ModalContainer>
				<S.ExitButton onClick={() => closeModal()}>×</S.ExitButton>
				<S.ModalImageContainer>
					{!loaded &&	
						<S.BlurredImage
							src={lowRes}
							alt="Placeholder"
						/>
					}
					<S.FullImage
						src={highRes}
						alt={data.name}
						onLoad={() => setLoaded(true)}
						$isLoaded={loaded}
					/>
				</S.ModalImageContainer>
				<S.ModalName>{data.name}</S.ModalName>
				<S.ModalPrice>${data.price}</S.ModalPrice>
				{(hasDescription || hasExtra) && (
					<S.ModalInfoContainer>
						{hasDescription && <S.ModalDescription>{formatInOut(data.description)}</S.ModalDescription>}
						{hasExtra && (
							<S.ModalExtraContainer>
								{data.pcs && (
									<S.ModalPieceCount>
										{data.pcs}{data.pcs === 1 ? "pc" : "pcs"}
									</S.ModalPieceCount>
								)}
								{data.spicy && spiceLevel}
							</S.ModalExtraContainer>
						)}
					</S.ModalInfoContainer>
				)}
			</S.ModalContainer>
		</S.ModalSection>
	)
}

export default Modal