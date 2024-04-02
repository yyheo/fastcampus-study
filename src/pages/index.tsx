import { useState } from "react";

import Map from "@/components/Map";
import Markers from "@/components/Markers";

import * as stores from "@/data/store_data.json";
import StoreBox from "@/components/StoreBox";
import { StoreType } from "@/interface";

export default function Home({ stores }: {stores: StoreType[]}) {
  const [map, setMap] = useState(null);
  const [currentStore, setCurrentStore] = useState(null);
  const storeDatas = stores;
  return (
    <>
      <Map setMap={setMap} />
      <Markers
        stores={storeDatas}
        map={map}
        setCurrentStore={setCurrentStore}
      />
      <StoreBox store={currentStore} setStore={setCurrentStore} />
    </>
  );
}

export async function getStaticProps() {
  const stores = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/stores`).then((res) => res.json());
  return {
    props: { stores },
    revalidate: 60 * 60,
  };
}

/*
getStaticProps: 정적 페이지 생성을 위한 데이터를 가져오는 사전 렌더링 함수. 런타임이 아닌,
빌드 (build)타임에서만 실행이 되므로, 변동이 거의 없는 데이터 대상으로만 적용하는게 좋음
예를 들어 변동이 거의 없는 FAQ 글
*/