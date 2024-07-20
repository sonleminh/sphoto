import ReactPaginate from 'react-paginate';

interface Props {
  pageCount: number;
  handlePageClick: (e: any) => void;
}

const Pagination: React.FC<Props> = (props) => {
  const { pageCount, handlePageClick } = props;

  return (
    <div>
      <ReactPaginate
        breakLabel='...'
        nextLabel='>'
        nextClassName='mx-5 rounded text-[22px] text-[#666666] hover:bg-[#353535]'
        nextLinkClassName='px-2.5'
        previousLabel='<'
        previousClassName='mx-5 rounded text-[22px] text-[#666666] hover:bg-[#353535]'
        previousLinkClassName='px-2.5'
        pageClassName='mx-2 rounded hover:bg-[#353535] hover:cursor-pointer'
        pageLinkClassName='px-3 leading-8'
        activeClassName='bg-[#161616]'
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        renderOnZeroPageCount={null}
        containerClassName='flex justify-center items-center my-4 text-[#c2c2c2]'
      />
    </div>
  );
};

export default Pagination;
