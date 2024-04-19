import React, { useRef, useEffect, useCallback, useState } from "react";
import { StoreApiResponse, StoreType } from "@/interface";
import Image from "next/image";
import axios from "axios";
import { useQuery, useInfiniteQuery } from "react-query";
import Loading from "@/components/Loading";
import { useRouter } from "next/router";
import Link from "next/link";
import Pagination from "@/components/Pagination";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import Loader from "@/components/Loader";
import SearchFilter from "@/components/SearchFilter";

export default function StoreListPage() {
  const router = useRouter();
  const { page = "1" }: { page?: any } = router.query;
  const ref = useRef<HTMLDivElement | null>(null);
  const pageRef = useIntersectionObserver(ref, {});
  const isPageEnd = !!pageRef?.isIntersecting;
  const [q, setQ] = useState<string | null>(null);
  const [district, setDistrict] = useState<string | null>(null);

  const searchParams = {
    q: q,
    district: district,
  };

  console.log(searchParams)

  const fetchStores = async ({ pageParam = 1 }) => {
    const { data } = await axios("/api/stores?page=" + pageParam, {
      params: {
        limit: 10,
        page: pageParam,
        ...searchParams,
      },
    });
    return data;
  };

  const {
    data: stores,
    isFetching,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isError,
    isLoading,
  } = useInfiniteQuery(["stores", searchParams], fetchStores, {
    getNextPageParam: (lastPage: any) =>
      lastPage.data?.length > 0 ? lastPage.page + 1 : undefined,
  });

  /*
  useCallback 훅은 React에서 성능 최적화를 위해 사용되는 훅 중 하나입니다. 주로 콜백 함수를 메모이제이션하고, 
  컴포넌트가 다시 렌더링될 때마다 새로운 콜백 함수를 생성하는 것을 방지하기 위해 사용됩니다.
  일반적으로 React에서 함수를 props로 전달하면, 해당 함수는 부모 컴포넌트가 리렌더링될 때마다 새로운 함수로 간주됩니다. 
  이는 React의 재조정(reconciliation) 과정에서 성능 문제를 발생시킬 수 있습니다. 
  만약 자식 컴포넌트가 불필요하게 리렌더링되는 경우, 이를 방지하기 위해 useCallback 훅을 사용할 수 있습니다.

  useEffect + useCallback 쓰는 이유: https://5kdk.tistory.com/39
  */

  const fetchNext = useCallback(async () => {
    const res = await fetchNextPage();
    if (res.isError) {
      console.log(res.error);
    }
  }, [fetchNextPage]);

  useEffect(() => {
    let timerId: NodeJS.Timeout | undefined;

    if (isPageEnd && hasNextPage) {
      timerId = setTimeout(() => {
        fetchNext();
      }, 500);
    }
  }, [fetchNext, hasNextPage, isPageEnd]);

  if (isError) {
    return (
      <div className="w-full h-screen mx-auto pt-[30%] text-red-500 text-center font-semibold">
        다시 시도해주세요
      </div>
    );
  }

  return (
    <div className="px-4 md:max-w-5xl mx-auto py-8">
      <SearchFilter setQ={setQ} setDistrict={setDistrict} />
      <ul role="list" className="divide-y divide-gray-100">
        {isLoading ? (
          <Loading />
        ) : (
          stores?.pages?.map((page, index) => (
            <React.Fragment key={index}>
              {page.data.map((store: StoreType, i) => (
                <li className="flex justify-between gap-x-6 py-5" key={i}>
                  <div className="flex gap-x-4">
                    <Image
                      src={
                        store?.category
                          ? `/images/markers/${store?.category}.png`
                          : "/images/markers/default.png"
                      }
                      width={48}
                      height={48}
                      alt="아이콘 이미지"
                    />
                    <div>
                      <div className="text-sm font-semibold leading-6 text-gray-900">
                        {store?.name}
                      </div>
                      <div className="mt-1 text-xs font-semibold leading-5 text-gray-500">
                        {store?.storeType}
                      </div>
                    </div>
                  </div>
                  <div className="hidden sm:flex sm:flex-col sm:items:end">
                    <div className="text-sm font-semibold leading-6 text-gray-900">
                      {store?.address}
                    </div>
                    <div className="mt-1 text-xs font-semibold leading-5 text-gray-500">
                      {store?.phone} | {store?.foodCertifyName} |{" "}
                      {store?.category}
                    </div>
                  </div>
                </li>
              ))}
            </React.Fragment>
          ))
        )}
      </ul>
      {isFetching || hasNextPage || isFetchingNextPage ? <Loader /> : null}
      <div className="w-full touch-none h-10 mb-10" ref={ref} />
    </div>
  );
}

// /*
// • getServerSideProps: 서버 사이드 렌더링을 위한 데이터 가져오기 함수.
// • 매 요청 마다 데이터를 서버에서 가져옴
// • 자주 업데이트 되는 posts 데이터들을 외부 API로부터 fetch 해서 사전 렌더링 하고 싶을 때 사용
// */

// export async function getServerSideProps() {
//   const stores = await axios(`${process.env.NEXT_PUBLIC_API_URL}/api/stores`);
//   return {
//     props: { stores: stores.data },
//   };
// }
