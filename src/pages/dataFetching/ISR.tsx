// https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-props

import type { InferGetStaticPropsType, GetStaticProps } from 'next'

export const getStaticProps = (async (context) => {
  const res = await fetch('https://www.random.org/integers/?num=1&min=1&max=100&col=1&base=10&format=plain')
  const number = await res.json()
  return { props: { number }, revalidate: 5 }
}) satisfies GetStaticProps<{
  number: number
}>
 
export default function Page({
  number,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div>
        <h1>ISR</h1>
        <h1>number: {number}</h1>
    </div>
  )
}

// production 모드로 실행시, 새로고침 할 때마다 값이 바뀌지 않고 5초마다 값이 바뀜