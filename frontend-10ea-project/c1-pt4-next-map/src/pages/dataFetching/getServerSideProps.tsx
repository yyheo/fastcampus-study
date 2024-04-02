import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
 
export const getServerSideProps = (async () => {
  // Fetch data from external API
  const res = await fetch('https://www.random.org/integers/?num=1&min=1&max=100&col=1&base=10&format=plain')
  const number: number = await res.json()
  // Pass data to the page via props
  return { props: { number } }
}) satisfies GetServerSideProps<{ number: number }>
 
export default function Page({
  number,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div>
        <h1>getServerSideProps</h1>
        <h1>number: {number}</h1>
    </div>
  )
}

// production 모드로 실행시, 새로고침 할 때마다 값이 바뀜