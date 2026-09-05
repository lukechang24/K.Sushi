const PLACE_ID = "ChIJ_Xfv3xgt3YAR2DakUN3Xq_M"
export async function getReviews() {
  const res = await fetch(
    `https://places.googleapis.com/v1/places/${PLACE_ID}`,
    {
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": process.env.GOOGLE_PLACES_API_KEY,
        "X-Goog-FieldMask": "reviews,rating,userRatingCount",
      },
      next: { revalidate: 604800 }, // re-fetch at most once a day
    }
  );

  if (!res.ok) {
    console.error("Failed to fetch reviews:", res.status);
    return { reviews: [], rating: null, userRatingCount: null };
  }

  return res.json();
}