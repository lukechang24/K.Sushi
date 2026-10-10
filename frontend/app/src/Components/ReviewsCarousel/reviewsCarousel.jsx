"use client"
import { useState, useEffect, useRef } from "react"
import { AnimatePresence, motion } from "framer-motion"
import google_logo from "../../Images/google_logo.png"
import * as S from "./reviewsCarousel.styles"

const AUTOPLAY_MS = 7000

const ReviewsCarousel = ({ data }) => {
	const reviews = data?.reviews || []
	const [index, setIndex] = useState(0)
	const [isPaused, setIsPaused] = useState(false)
	const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

	const intervalRef = useRef(null)

	useEffect(() => {
		const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
		setPrefersReducedMotion(mediaQuery.matches)

		const handleChange = (e) => setPrefersReducedMotion(e.matches)
		mediaQuery.addEventListener("change", handleChange)
		console.log(reviews, "reviews")
		return () => mediaQuery.removeEventListener("change", handleChange)
	}, [])

	useEffect(() => {
		if (isPaused || prefersReducedMotion || reviews.length <= 1) return

		intervalRef.current = setInterval(() => {
			setIndex((prev) => (prev + 1) % reviews.length)
		}, AUTOPLAY_MS)

		return () => clearInterval(intervalRef.current)
	}, [isPaused, prefersReducedMotion, reviews.length])

	const goTo = (i) => {
		setIndex(i)
	}

	const goNext = () => {
		setIndex((prev) => (prev + 1) % reviews.length)
	}

	const goPrev = () => {
		setIndex((prev) => (prev - 1 + reviews.length) % reviews.length)
	}

	if (!reviews.length) return null

	const current = reviews[index]

	return (
		<S.CarouselSection
			onMouseEnter={() => setIsPaused(true)}
			onMouseLeave={() => setIsPaused(false)}
			onTouchStart={() => setIsPaused(true)}
		>
			<S.CarouselTitle>WHAT PEOPLE ARE SAYING</S.CarouselTitle>

			<S.CarouselTrack>
				<S.NavButton aria-label="Previous review" onClick={goPrev}>
					‹
				</S.NavButton>

				<S.ReviewWindow>
					<AnimatePresence mode="wait">
						<motion.div
							key={index}
							initial={prefersReducedMotion ? false : { opacity: 0, x: 40 }}
							animate={{ opacity: 1, x: 0 }}
							exit={prefersReducedMotion ? undefined : { opacity: 0, x: -40 }}
							transition={{ duration: 0.35 }}
						>
							<S.ReviewCard>
								<S.Stars aria-label={`${current.rating} out of 5 stars`}>
									{"★".repeat(current.rating)}{"☆".repeat(5 - current.rating)}
								</S.Stars>
								<S.ReviewText>
									{current.text?.text || current.originalText?.text}
								</S.ReviewText>
								{current.authorAttribution?.uri && (
									<S.ReadMoreLink
										href={current.authorAttribution.uri}
										target="_blank"
										rel="noopener noreferrer"
									>
										Read full review on Google
									</S.ReadMoreLink>
								)}
								<S.AuthorRow>
									{current.authorAttribution?.photoUri && (
										<S.AuthorPhoto
											src={current.authorAttribution.photoUri}
											alt={current.authorAttribution.displayName}
										/>
									)}
									<S.AuthorInfo>
										<S.AuthorName
											href={current.authorAttribution?.uri}
											target="_blank"
											rel="noopener noreferrer"
										>
											{current.authorAttribution?.displayName}
										</S.AuthorName>
										<S.PublishTime>{current.relativePublishTimeDescription}</S.PublishTime>
									</S.AuthorInfo>
								</S.AuthorRow>
							</S.ReviewCard>
						</motion.div>
					</AnimatePresence>
				</S.ReviewWindow>

				<S.NavButton aria-label="Next review" onClick={goNext}>
					›
				</S.NavButton>
			</S.CarouselTrack>

			<S.DotsRow>
				{reviews.map((_, i) => (
					<S.Dot
						key={i}
						$active={i === index}
						onClick={() => goTo(i)}
						aria-label={`Go to review ${i + 1}`}
					/>
				))}
			</S.DotsRow>

			<S.GoogleAttribution
				href="https://www.google.com/maps"
				target="_blank"
				rel="noopener noreferrer"
			>
				<img src={google_logo.src} alt="Google Maps" height="100" />
			</S.GoogleAttribution>
		</S.CarouselSection>
	)
}

export default ReviewsCarousel