import Link from "next/link";
import { useState } from "react";
import { BiMenu } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="navbar">
        <div className="navbar__logo">nextmap</div>
        <div className="navbar__list">
          <Link href="/stores" className="navbar__list--item">
            맛집 목록
          </Link>
          <Link href="/sotres/new" className="navbar__list--item">
            맛집 등록
          </Link>
          <Link href="/users/like" className="navbar__list--item">
            찜한 가게
          </Link>
          <Link href="/users/login" className="navbar__list--item">
            로그인
          </Link>
        </div>
        {/* Mobile Button */}
        <div
          role="presentation"
          className="navbar__button"
          onClick={() => setIsOpen((val) => !val)}
        >
          {isOpen ? <AiOutlineClose /> : <BiMenu />}
        </div>
      </div>
      {/* Mobile Navbar */}
      {isOpen && (
        <div className="navbar--mobile">
          <div className="navbar__list--mobile">
            <Link href="/stores" className="navbar__list--item--mobile">
              맛집 목록
            </Link>
            <Link href="/sotres/new" className="navbar__list--item--mobile">
              맛집 등록
            </Link>
            <Link href="/users/like" className="navbar__list--item--mobile">
              찜한 가게
            </Link>
            <Link href="/users/login" className="navbar__list--item--mobile">
              로그인
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

// react-icon : https://react-icons.github.io/react-icons/
// yarn add react-icons
