import App from './src/App'
import { getReviews } from '../lib/getReviews'

export default async function Page() {
  const menuRes = await fetch('https://ksushi.menu/api/menu', {
    next: { revalidate: 60 } // re-fetches at most once per minute
  });
  const menuData = await menuRes.json();

  const reviewsData = await getReviews();

  return <App menuData={menuData} reviewsData={reviewsData}/>;
}