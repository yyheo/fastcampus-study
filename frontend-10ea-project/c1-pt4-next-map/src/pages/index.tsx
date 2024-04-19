import { useState } from "react";

import Map from "@/components/Map";
import Markers from "@/components/Markers";

import StoreBox from "@/components/StoreBox";
import { StoreType } from "@/interface";

/*
• Axios: HTTP 클라이언트 라이브러리로, Next.js 프로젝트와 함께 사용하여 데이터를 서버에서 가져오는 데 유용
또한, React Query와 Axiox를 함께 사용하면 더욱 편리하게 데이터를 캐싱하고 관리할 수 있음
• 설치 방법: yarn add axios
• 기본 fetch API 보다 HTTP 요청 및 응답 처리, 설정, 요청 취소 등의 부분에서 더 풍부한 기능을 제공 (json parsing 따로 안해줘도 됨)
Axios API 문서: https://axios-http.com/kr/docs/api_intro
*/

import axios from "axios";

export default function Home({ stores }: { stores: StoreType[] }) {
  const [map, setMap] = useState(null);
  const [currentStore, setCurrentStore] = useState(null);
  const storeDatas = stores;
  return (
    <>
      <Map />
      <Markers
        stores={storeDatas}
      />
      <StoreBox />
    </>
  );
}

/*
getStaticProps: 정적 페이지 생성을 위한 데이터를 가져오는 사전 렌더링 함수. 런타임이 아닌,
빌드 (build)타임에서만 실행이 되므로, 변동이 거의 없는 데이터 대상으로만 적용하는게 좋음
예를 들어 변동이 거의 없는 FAQ 글
*/

export async function getStaticProps() {
  const stores = await axios(`${process.env.NEXT_PUBLIC_API_URL}/api/stores`);
  return {
    props: { stores: stores.data },
    revalidate: 60 * 60,
  };
}
