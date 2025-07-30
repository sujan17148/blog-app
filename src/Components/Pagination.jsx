import {
    FaAngleDoubleLeft,
    FaAngleLeft,
    FaAngleDoubleRight,
    FaAngleRight,
  } from "react-icons/fa";
  export default function Pagination({ currentPage, setCurrentPage, lastPage }) {
    function goToPage(page) {
      let selectedPage = Math.max(1, Math.min(page, lastPage));
      setCurrentPage(selectedPage);
    }
    function getPageNumbers() {
      if(lastPage<=1) return [1];
      if (lastPage <= 4) {
        // if total pages are 2, 3, or 4 — return all of them
        return Array.from({ length: lastPage }, (_, i) => i + 1);
      }
      if (currentPage <= 3) return [1, 2, 3, 4];
      if (currentPage >= lastPage - 2){
        return [lastPage - 3, lastPage - 2, lastPage - 1, lastPage];
      }
      return [currentPage - 1, currentPage, currentPage + 1, currentPage + 2];
    }
    return (
      <div className="w-full my-5 flex items-center justify-center gap-2.5 flex-wrap">
        <FaAngleDoubleLeft
          onClick={() => goToPage(1)}
          className={`py-2  px-3 hover:bg-[#5b21b6] justify-center items-center ${currentPage==1? "hidden" : "flex"}`}
        />
        <FaAngleLeft
          onClick={() => goToPage(currentPage - 1)}
          className={`py-2  px-3 hover:bg-[#5b21b6] justify-center items-center ${currentPage==1? "hidden" : "flex"}`}
        />
        {getPageNumbers().map((num,index) => (
          <button key={index}
            onClick={() => goToPage(num)}
            className={`py-2  px-3 hover:bg-[#5b21b6] flex justify-center items-center rounded ${
              currentPage == num ? "bg-accent text-primary" : ""
            }`}
          >
            {num}
          </button>
        ))}
        <FaAngleRight
          onClick={() => goToPage(currentPage + 1)}
          className={`py-2  px-3 hover:bg-[#5b21b6] justify-center items-center ${currentPage==lastPage || lastPage<=1? "hidden" : "flex"}`}
        />
        <FaAngleDoubleRight
          onClick={() => goToPage(lastPage)}
          className={`py-2  px-3 hover:bg-[#5b21b6] justify-center items-center ${currentPage==lastPage || lastPage<=1? "hidden" : "flex"}`}
        />
      </div>
    );
  }
  