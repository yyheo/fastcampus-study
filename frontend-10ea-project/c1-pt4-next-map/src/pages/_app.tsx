import Layout from "@/components/Layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { SessionProvider } from "next-auth/react";
import { RecoilRoot } from "recoil"; // yarn add recoil

/*
• React Query: 리액트에서 복잡한 데이터 상태 및 비동기 작업 관리 간편하게 처리할 수 있는 라이브러리
데이터 가져오기와 캐싱: useQuery 함수를 사용하여 데이터 불러오기, 자동 캐싱, 중복 요청 방지 가능
useQuery: 데이터를 가져올 때 사용하는 함수. 데이터를 캐싱하고 자동으로 리페칭 관리. 로딩, 에러, 데이터 등을 처리할 수 있는 옵션 제공
https://tanstack.com/query/v4/docs/framework/react/overview
*/

const queryClient = new QueryClient();

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <SessionProvider session={session}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
          <ReactQueryDevtools />
        </SessionProvider>
      </QueryClientProvider>
    </RecoilRoot>
  );
}
