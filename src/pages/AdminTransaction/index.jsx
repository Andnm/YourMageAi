import React, { useEffect, useState } from 'react'
import './style.scss'
import AdminLoading from '../../components/shared/AdminLoading'
import SpinnerLoading from '../../components/shared/SpinnerLoading'

import { getAllTransaction } from '../../store/transactionSlice';
import { useDispatch, useSelector } from 'react-redux';
import { GiConfirmed } from 'react-icons/gi'
import { BiDetail } from 'react-icons/bi'
import { MdOutlineCancel } from 'react-icons/md'
import { confirmTransaction } from '../../store/transactionSlice';

import { toast } from 'react-toastify';

const AdminTransaction = () => {
  const dispatch = useDispatch();

  const { loading, loadingRow, error, user } = useSelector((state) => state.transaction);

  const [dataTransaction, setDataTransaction] = useState('');

  const formatDateTime = (dateTime) => {
    if (!dateTime) {
      return 'N/A';
    }

    const date = new Date(dateTime);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(2);

    return `${hours}:${minutes} ${day}/${month}/${year}`;
  }

  const formatCurrency = (amount) => {
    if (typeof amount !== 'number') {
      return null;
    }

    const formattedAmount = amount.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return formattedAmount;
  }

  const [openAskForConfirmRow, setOpenAskForConfirmRow] = useState(-1);

  const handleAskForConfirm = (index, transaction) => {
    setOpenAskForConfirmRow(index);
  }

  const handleConfirmTransactionApi = (transaction) => {

    const transactionId = {
      transactionId: transaction?._id
    }

    dispatch(confirmTransaction(transactionId)).then((result) => {
      if (result?.payload?.status === 200) {
        const reversedData = [];
        for (let i = result?.payload?.data.length - 1; i >= 0; i--) {
          reversedData.push(result?.payload?.data[i]);
        }
        setDataTransaction(reversedData)
        toast.success('Confirm successfully!')
        setOpenAskForConfirmRow(-1)
      } else {
        toast.error('Something wrong, please try again later!')
        setOpenAskForConfirmRow(-1)
      }
    })
  }



  //Pagination

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = dataTransaction.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(dataTransaction.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const renderPageNumbers = pageNumbers.map((number, index) => (
    <li key={index} className={currentPage === number ? 'page-item active' : 'page-item'}>
      <a className="page-link" onClick={() => setCurrentPage(number)}>{number}</a>
    </li>
  ));

  const nextPage = () => {
    if (currentPage < pageNumbers.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const Pagination = ({ currentPage, renderPageNumbers, prevPage, nextPage }) => {
    return (
      <nav>
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <a className="page-link" onClick={prevPage}>
              Previous
            </a>
          </li>
          {renderPageNumbers}
          <li className={`page-item ${currentPage === renderPageNumbers.length ? 'disabled' : ''}`}>
            <a className="page-link" onClick={nextPage}>
              Next
            </a>
          </li>
        </ul>
      </nav>
    );
  };

  //row
  const TransactionRow = ({
    transaction,
    index,
    openAskForConfirmRow,
    handleAskForConfirm,
    handleConfirmTransactionApi,
    formatCurrency,
    formatDateTime,
  }) => {
    return (
      <tr key={index}>
        {openAskForConfirmRow === index ? (
          <td colSpan="8">
            <div className="text-center d-flex justify-content-center align-items-center gap-5">
              {loadingRow ? (
                <SpinnerLoading />
              ) : (
                <>
                  <div className="d-flex justify-content-center align-items-center gap-2">
                    <div className="text-danger" style={{ cursor: 'pointer' }}
                      onClick={() => handleAskForConfirm(false)}
                    >
                      <MdOutlineCancel />
                    </div>
                    <div
                      className="text-success"
                      style={{ cursor: 'pointer' }}
                      onClick={() => handleConfirmTransactionApi(transaction)}
                    >
                      <GiConfirmed />
                    </div>
                  </div>
                  Are you sure you want to confirm this transaction?
                </>
              )}
            </div>
          </td>
        ) : (
          <>
            <td className="d-flex flex-row gap-2 action-label">
              {transaction.paymentStatus === 'Pending' ? (
                <>
                  <div style={{ cursor: 'pointer' }} data-bs-toggle="tooltip" data-bs-placement="top" title="Detail">
                    <BiDetail />
                  </div>
                  <div
                    style={{ cursor: 'pointer' }}
                    className="text-success"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Confirm"
                    onClick={() => handleAskForConfirm(index)}
                  >
                    <GiConfirmed />
                  </div>
                </>
              ) : (
                <div style={{ cursor: 'pointer' }} data-bs-toggle="tooltip" data-bs-placement="top" title="Detail">
                  <BiDetail />
                </div>
              )}
            </td>
            <td>{transaction.fullName}</td>
            <td>{transaction.phoneNumber}</td>
            <td>{transaction.level}</td>
            <td>{formatCurrency(transaction.amount)}</td>
            <td>{transaction.constantPayment?.replace(/(^|\s)\S/g, (l) => l.toUpperCase())}</td>
            <td>{formatDateTime(transaction.createdAt)}</td>
            <td className={`fw-bold ${transaction.paymentStatus === 'Pending' ? 'text-warning' : 'text-success'}`}>
              {transaction.paymentStatus}
            </td>
          </>
        )}
      </tr>
    );
  };

  useEffect(() => {
    dispatch(getAllTransaction(currentPage))
      .unwrap()
      .then((result) => {
        if (result?.status === 200) {
          const reversedData = [];
          for (let i = result?.data?.length - 1; i >= 0; i--) {
            reversedData.push(result?.data[i]);
          }
          setDataTransaction(reversedData);
        }
      });
  }, []);

  return (
    <div className="admin-transaction d-flex flex-column justify-content-between" style={{ height: '100%' }}>
      {loading ? (
        <AdminLoading />
      ) : (
        <div className='d-flex justify-content-between flex-column' style={{ height: '100%' }}>
          <div>
            <div className="search-container">
              <input placeholder="Search.." id="input" className="input" name="text" type="text" />
            </div>
            <div className="mt-3">
              <table className="table border table-striped">
                <thead>
                  <tr className="table-primary">
                    <th scope="col">Action</th>
                    <th scope="col">Full Name</th>
                    <th scope="col">Phone Number</th>
                    <th scope="col">Level</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Type</th>
                    <th scope="col">Created At</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {currentData &&
                    currentData.map((transaction, index) => (
                      <TransactionRow
                        key={index}
                        transaction={transaction}
                        index={index}
                        openAskForConfirmRow={openAskForConfirmRow}
                        handleAskForConfirm={handleAskForConfirm}
                        handleConfirmTransactionApi={handleConfirmTransactionApi}
                        formatCurrency={formatCurrency}
                        formatDateTime={formatDateTime}
                      />
                    ))}
                </tbody>
              </table>
            </div>
          </div>
          
          <Pagination
            currentPage={currentPage}
            renderPageNumbers={renderPageNumbers}
            prevPage={prevPage}
            nextPage={nextPage}
          />
        </div>
      )}
    </div>
  )
}

export default AdminTransaction