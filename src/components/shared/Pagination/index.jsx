import React from 'react';
import './style.scss';

const Pagination = ({ currentPage, totalItems, onPageChange }) => {
    console.log(totalItems)
    const itemsPerPage = 10;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const maxVisiblePages = 5;
    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem =
        currentPage === totalPages ? totalItems : currentPage * itemsPerPage

    const getPageRange = () => {
        const pageRange = [];
        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) {
                pageRange.push(i);
            }
        } else {
            if (currentPage <= 3) {
                for (let i = 1; i <= 5; i++) {
                    pageRange.push(i);
                }
                pageRange.push('...');
                pageRange.push(totalPages);
            } else if (currentPage >= totalPages - 2) {
                pageRange.push(1);
                pageRange.push('...');
                for (let i = totalPages - 4; i <= totalPages; i++) {
                    pageRange.push(i);
                }
            } else {
                pageRange.push(1);
                pageRange.push('...');
                for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                    pageRange.push(i);
                }
                pageRange.push('...');
                pageRange.push(totalPages);
            }
        }
        return pageRange;
    };

    const renderPageNumbers = getPageRange();

    const nextPage = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    return (
        <nav className='d-flex justify-content-center align-items-center gap-3'>
            <p className='d-flex align-items-center text-center'> {startItem} - {endItem} of {totalItems}</p>
            <ul className="pagination">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <a className="page-link" onClick={prevPage}>
                        Previous
                    </a>
                </li>
                {renderPageNumbers.map((number, index) => (
                    <li key={index} className={currentPage === number ? 'page-item active' : 'page-item'}>
                        {number === '...' ? (
                            <span className="page-link">...</span>
                        ) : (
                            <a className="page-link" onClick={() => onPageChange(number)}>
                                {number}
                            </a>
                        )}
                    </li>
                ))}
                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <a className="page-link" onClick={nextPage}>
                        Next
                    </a>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;