import App from './src/App'

export default async function Page() {
  const res = await fetch('https://ksushi.menu/api/menu', {
    next: { revalidate: 3600 } // re-fetches at most once per hour
  });
  const data = await res.json();

  return <App initialData={data} />;
}