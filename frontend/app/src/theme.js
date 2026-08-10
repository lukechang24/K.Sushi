const theme = {
	colors: {
    primary: "#F0A500",
    accent: "hsl(0, 100%, 30%)",
    background: "#171717",
    text: "#F5F5F5",
		textSecondary: "#CCC",
		hover: "#666"
  },
  fonts: {
    main: "var(--font-montserrat), sans-serif",
    heading: "var(--font-archivo), sans-serif",
    secondary: "var(--font-dm-sans), sans-serif"
  },
  spacing: {
    pagePadding: {
      mobile: "1rem",
      tablet: "2rem",
      desktop: "3rem",
    },
		navbarPadding: {
			mobile: "1rem",
			tablet: "1rem",
			desktop: "3rem"
		}
  },
  breakpoints: {
    mobile: "480px",
    tablet: "768px",
    laptop: "1024px",
    desktop: "1440px",
  },
};

export default theme