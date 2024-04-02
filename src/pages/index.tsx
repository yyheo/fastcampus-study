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
