/* global kakao */

/*
Kakao Map Docu
https://apis.map.kakao.com/web/guide/
공공 데이터
http://data.seoul.go.kr/dataList/OA-2741/S/1/datasetView.do
마커 생성 Sample
https://apis.map.kakao.com/web/sample/basicMarker/
이미지 마커 생성 Sample
https://apis.map.kakao.com/web/sample/basicMarkerImage/
커스텀 오버레이 생성하기
https://apis.map.kakao.com/web/sample/customOverlay1/
마커에 마우스 이벤트 등록하기
https://apis.map.kakao.com/web/sample/addMarkerMouseEvent/
마커에 클릭 이벤트 등록하기
https://apis.map.kakao.com/web/sample/addMarkerClickEvent/
*/

import Script from "next/script";
import { Dispatch, SetStateAction } from "react";

declare global {
  interface Window {
    kakao: any;
  }
}

const DEFAULT_LAT = 37.497625203; // 강남역 위도 경도
const DEFAULT_LNG = 127.03088379;
const DEFAULT_ZOOM = 3;

interface MapProps {
  setMap: Dispatch<SetStateAction<any>>;
  lat?: string | null;
  lng?: string | null;
  zoom?: number | null;
}

export default function Map({ setMap, lat, lng, zoom }: MapProps) {
  const loadKakaoMap = () => {
    // kakao map 로드 - v3 스크립트를 동적으로 로드
    // 스크립트의 로딩이 끝나기 전에 v3의 객체에 접근하려고 하면 에러가 발생하기 때문에
    // 로딩이 끝나는 시점에 콜백을 통해 객체에 접근할 수 있도록 해 준다.
    // 비동기 통신으로 페이지에 v3를 동적으로 삽입할 경우에 주로 사용된다.
    // v3 로딩 스크립트 주소에 파라메터로 autoload=false 를 지정해 주어야 한다.
    window.kakao.maps.load(function () {
      const mapContainer = document.getElementById("map");
      const mapOption = {
        center: new window.kakao.maps.LatLng(lat ?? DEFAULT_LAT, lng ?? DEFAULT_LNG), // 위도 경도 설정
        level: zoom ?? DEFAULT_ZOOM, // zoom level
      };
      // v3가 모두 로드된 후, 이 콜백 함수가 실행됩니다.
      const map = new window.kakao.maps.Map(mapContainer, mapOption);
      setMap(map);
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
