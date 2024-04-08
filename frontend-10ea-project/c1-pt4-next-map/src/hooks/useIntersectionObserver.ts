import { RefObject, useState, useEffect } from "react";

function useIntersectionObserver(
  elementRef: RefObject<Element>,
  { threshold = 0.1, root = null, rootMargin = "0% " }
) {
  const [entry, setEntry] = useState<IntersectionObserverEntry>();
  const updateEntry = ([entry]: IntersectionObserverEntry[]): void => {
    setEntry(entry);
  };

  useEffect(() => {
    const node = elementRef?.current;
    const hasIOSupport = !!window.IntersectionObserver;

    if (!node || !hasIOSupport) return;

    const observerParams = { threshold, root, rootMargin };
    const observer = new IntersectionObserver(updateEntry, observerParams);

    observer.observe(node);

    return () => observer.disconnect();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [elementRef?.current, root, rootMargin, JSON.stringify(threshold)]);
  return null;
}

export default useIntersectionObserver;

/*

Intersection Observer란?
• Intersection Observer: 브라우저 viewport와 원하는 요소의 교차점을 관찰하며, 요소가 뷰포트에 포함되는지 아닌지 구별하는 기능
• 비동기적으로 실행되기 때문에, 메인 스레드에 영향을 주지 않으면서 요소들의 변경사항 관찰
• Scroll 및 getBoundingClientRect의 성능 문제를 해결
• 또한, IntersectionObserverEntry 등의 속성을 활용해서 요소들의 위치를 알 수 있음
• 여러 상황에서 Intersection Observer를 사용할 수 있음:
    • 페이지 스크롤 되는 도중에 발생하는 이미지 지연 로딩
    • 자동으로 페이지 하단에 스크롤 했을 때 무한스크롤 구현
    • 광고 수익 계산을 위한 광고 가시성 보고

*/
