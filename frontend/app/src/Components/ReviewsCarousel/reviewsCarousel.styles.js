import styled from "styled-components"

export const CarouselSection = styled.section`
	width: 100%;
	max-width: 700px;
	margin: 0 auto;
	padding: 3rem ${props => props.theme.spacing.pagePadding.mobile} 1rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	text-align: center;

	
	@media (min-width: ${props => props.theme.breakpoints.tablet}) {
		padding: 4rem ${props => props.theme.spacing.pagePadding.tablet} 1rem;
	}

	@media (min-width: ${props => props.theme.breakpoints.laptop}) {
		padding: 4rem ${props => props.theme.spacing.pagePadding.desktop} 1rem;
	}
`

export const CarouselTitle = styled.h2`
	font-family: ${props => props.theme.fonts.heading};
	color: ${props => props.theme.colors.primary};
	font-size: 1rem;
	letter-spacing: 0.15em;
	margin: 1rem 0 2rem;
	@media (min-width: ${props => props.theme.breakpoints.laptop}) {
		font-size: 1.25rem;
	}
`

export const CarouselTrack = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 1rem;
	width: 100%;
`

export const NavButton = styled.button`
	background: none;
	border: none;
	color: ${props => props.theme.colors.textSecondary};
	font-size: 2rem;
	line-height: 1;
	cursor: pointer;
	padding: 0.5rem;
	flex-shrink: 0;
	transition: color 0.2s ease;

	&:hover {
		color: ${props => props.theme.colors.primary};
	}
`

export const ReviewWindow = styled.div`
	flex: 1;
	display: flex;
	align-items: center;
	justify-content: center;
	overflow: hidden;

	@media (min-width: ${props => props.theme.breakpoints.tablet}) {
		min-height: 180px;
	}
`

export const ReviewCard = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 1rem;
`

export const Stars = styled.div`
	color: ${props => props.theme.colors.primary};
	font-size: 1.25rem;
	letter-spacing: 0.15em;
`

export const ReviewText = styled.p`
	font-family: ${props => props.theme.fonts.secondary};
	color: ${props => props.theme.colors.text};
	font-size: 1rem;
	line-height: 1.6;
	max-width: 55ch;

	height: 8rem; /* 5 lines × 1.6rem line-height, fixed rather than max */
	display: -webkit-box;
	-webkit-line-clamp: 5;
	-webkit-box-orient: vertical;
	overflow: hidden;
`

export const ReadMoreLink = styled.a`
	color: ${props => props.theme.colors.primary};
	font-size: 0.8rem;
	text-decoration: underline;
`

export const AuthorRow = styled.div`
	display: flex;
	align-items: center;
	gap: 0.75rem;
`

export const AuthorPhoto = styled.img`
	width: 40px;
	height: 40px;
	border-radius: 50%;
	object-fit: cover;
`

export const AuthorInfo = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	text-align: left;
`

export const AuthorName = styled.a`
	font-family: ${props => props.theme.fonts.main};
	color: ${props => props.theme.colors.text};
	font-weight: bold;
	font-size: 0.9rem;
	text-decoration: none;

	&:hover {
		text-decoration: underline;
	}
`

export const PublishTime = styled.span`
	color: ${props => props.theme.colors.textSecondary};
	font-size: 0.75rem;
`

export const DotsRow = styled.div`
	display: flex;
	gap: 0.5rem;
	margin-top: 1.5rem;
`

export const Dot = styled.button`
	width: 8px;
	height: 8px;
	border-radius: 50%;
	border: none;
	padding: 0;
	cursor: pointer;
	background-color: ${props => props.$active ? props.theme.colors.primary : props.theme.colors.hover};
	transition: background-color 0.2s ease;
`

export const GoogleAttribution = styled.a`
	color: ${props => props.theme.colors.textSecondary};
	font-size: 0.75rem;
	margin-top: 1.5rem;
	text-decoration: none;

	&:hover {
		text-decoration: underline;
	}
`