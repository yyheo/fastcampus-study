/* global kakao */

/*
Kakao Map Docu
https://apis.map.kakao.com/web/guide/
*/

import Script from "next/script";

declare global {
  interface Window {
    kakao: any;
  }
}

export default function Map() {
  const loadKakaoMap = () => {
    // kakao map 로드 - v3 스크립트를 동적으로 로드
    // 스크립트의 로딩이 끝나기 전에 v3의 객체에 접근하려고 하면 에러가 발생하기 때문에
    // 로딩이 끝나는 시점에 콜백을 통해 객체에 접근할 수 있도록 해 준다.
    // 비동기 통신으로 페이지에 v3를 동적으로 삽입할 경우에 주로 사용된다.
    // v3 로딩 스크립트 주소에 파라메터로 autoload=false 를 지정해 주어야 한다.
    window.kakao.maps.load(function () {
      const mapContainer = document.getElementById("map");
      const mapOption = {
        center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 위도 경도 설정
        level: 3, // zoom level
      };
      // v3가 모두 로드된 후, 이 콜백 함수가 실행됩니다.
      new window.kakao.maps.Map(mapContainer, mapOption);
    });
  };
  return (
    <>
      <Script
        strategy="afterInteractive"
        type="text/javascript"
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_CLIENT}&autoload=false`}
        onReady={loadKakaoMap}
      ></Script>
      <div id="map" className="w-full h-screen"></div>
    </>
  );
}
