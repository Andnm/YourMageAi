import React from 'react'
import { Modal } from 'react-bootstrap'
import './style.scss'

const ModalImageDetail = (props) => {

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      dialogClassName="modal-delete"
    >
      <Modal.Body>
        <div className='image-detail-modal'>
          <div className='image-detail-modal__left'>
            <img src={props?.detail?.src} />
          </div>

          <div className='image-detail-modal__right'>
            <div className='d-flex align-items-center gap-1 author-div'>
              <div className='author-avatar'>{props?.detail?.author?.substring(1, 0) || 'Y'}</div>
              <p className='author'>{props?.detail?.author || 'YourMage'}</p>
            </div>

            <h3>{props?.detail?.name || props?.detail?.title}</h3>

            <hr></hr>

            <div className='description'>
              <h5>Details:</h5>

              <div className='detail-section'>
                <p>{props?.detail?.details || props?.detail?.des}</p>
              </div>
            </div>

            <hr></hr>

            <div className='other-option'>
              <div className='item'>
                <div className='label'>
                  <p>Input Resolution</p>
                </div>
                <div className='value'>
                  <p>512 x 768px</p>
                </div>
              </div>

              <div className='item'>
                <div className='label'>
                  <p>Created</p>
                </div>
                <div className='value'>
                  <p>02/11/23 at 12:52 AM</p>
                </div>
              </div>

              <div className='item'>
                <div className='label'>
                  <p>Pipeline</p>
                </div>
                <div className='value d-flex'>
                  <svg width="20" height="20" viewBox="0 0 24 28" fill="none">
                    <path d="M17.7827 3.03614C16.9457 3.03614 16.2646 2.35514 16.2646 1.51805C16.2646 0.680953 16.9456 0 17.7827 0C18.6198 0 19.3008 0.681 19.3008 1.51809C19.3008 2.35519 18.6198 3.03614 17.7827 3.03614Z" fill="#60DC4D"></path><path d="M21.3974 3.61461C20.9855 3.61461 20.6504 3.27954 20.6504 2.86761C20.6504 2.45567 20.9855 2.12061 21.3974 2.12061C21.8093 2.12061 22.1444 2.45567 22.1444 2.86761C22.1444 3.27954 21.8093 3.61461 21.3974 3.61461Z" fill="#60DC4D"></path><path d="M21.3974 2.73411C21.3974 2.50803 21.4987 2.30553 21.6579 2.16842C21.5767 2.13804 21.4892 2.12061 21.3974 2.12061C20.9855 2.12061 20.6504 2.45567 20.6504 2.86761C20.6504 3.27954 20.9855 3.61461 21.3974 3.61461C21.5832 3.61461 21.753 3.54598 21.8839 3.43329C21.6003 3.32721 21.3974 3.05431 21.3974 2.73411Z" fill="#37C918"></path><path d="M19.8559 7.71077C19.1783 7.71077 18.627 7.15948 18.627 6.48185C18.627 5.80423 19.1783 5.25293 19.8559 5.25293C20.5335 5.25293 21.0848 5.80423 21.0848 6.48185C21.0847 7.15948 20.5335 7.71077 19.8559 7.71077Z" fill="#60DC4D"></path><path d="M17.6317 1.39566C17.6317 0.853688 17.9174 0.377391 18.3459 0.10875C18.1717 0.0388594 17.9817 0 17.7827 0C16.9457 0 16.2646 0.681 16.2646 1.51809C16.2646 2.35519 16.9456 3.03619 17.7827 3.03619C18.0778 3.03619 18.3533 2.95125 18.5866 2.805C18.0277 2.5808 17.6317 2.03377 17.6317 1.39566Z" fill="#37C918"></path><path d="M19.993 6.35941C19.993 5.97499 20.1706 5.63135 20.4478 5.40588C20.2719 5.30852 20.0698 5.25293 19.8549 5.25293C19.1773 5.25293 18.626 5.80423 18.626 6.48185C18.626 7.15948 19.1773 7.71077 19.8549 7.71077C20.1481 7.71077 20.4175 7.60741 20.629 7.43538C20.2502 7.22576 19.993 6.82212 19.993 6.35941Z" fill="#37C918"></path><path d="M18.021 10.6203L15.0252 7.68701L10.796 12.0064C9.96155 11.6185 9.07158 11.4218 8.15049 11.4218C6.46636 11.4218 4.8263 12.1104 3.65086 13.3108C2.47556 14.5111 1.83811 16.0973 1.85583 17.7771C1.87355 19.4569 2.54438 21.0292 3.7447 22.2045C4.92722 23.3623 6.48853 23.9999 8.14102 23.9999C8.16431 23.9999 8.1878 23.9998 8.21105 23.9995C9.89081 23.9818 11.4632 23.311 12.6385 22.1106C14.5015 20.2079 14.964 17.3282 13.7919 14.9397L18.021 10.6203Z" fill="#AEEFFF"></path><path d="M2.37548 19.7089C2.35777 18.029 2.99527 16.4429 4.17052 15.2426C5.346 14.0421 6.98597 13.3536 8.67014 13.3536C9.59119 13.3536 10.4812 13.5503 11.3156 13.9382L14.2387 10.9528C14.5216 10.6639 14.9444 10.5615 15.3281 10.6889L17.3097 11.3468L18.021 10.6203L15.0252 7.68701L10.796 12.0064C9.96155 11.6185 9.07158 11.4218 8.15049 11.4218C6.46636 11.4218 4.8263 12.1104 3.65086 13.3108C2.47556 14.5111 1.83811 16.0973 1.85583 17.7771C1.86516 18.6615 2.0558 19.5161 2.40919 20.2987C2.38913 20.1039 2.37759 19.9072 2.37548 19.7089Z" fill="#73EFD8"></path><path d="M9.2533 15.0842C8.65537 15.0842 8.16895 14.5978 8.16895 13.9999C8.16895 13.4019 8.65541 12.9155 9.2533 12.9155C9.8512 12.9155 10.3377 13.4019 10.3377 13.9999C10.3377 14.5978 9.85124 15.0842 9.2533 15.0842Z" fill="#60DC4D"></path><path d="M9.2533 13.6948C9.2533 13.4094 9.3643 13.1496 9.54515 12.9557C9.45224 12.9297 9.35441 12.9155 9.2533 12.9155C8.65537 12.9155 8.16895 13.4019 8.16895 13.9999C8.16895 14.5978 8.65541 15.0843 9.2533 15.0843C9.56582 15.0843 9.84773 14.9512 10.0458 14.739C9.58926 14.6111 9.2533 14.1916 9.2533 13.6948Z" fill="#37C918"></path><path d="M8.14337 22.4773C10.8292 22.4773 13.0064 20.3001 13.0064 17.6143H3.28027C3.28027 20.3001 5.45752 22.4773 8.14337 22.4773Z" fill="#60DC4D"></path><path d="M5.7631 17.6143H3.28027C3.28027 20.3001 5.45752 22.4773 8.14332 22.4773C8.57241 22.4773 8.98843 22.4215 9.38471 22.3172C7.30037 21.7684 5.7631 19.871 5.7631 17.6143Z" fill="#37C918"></path><path d="M8.10985 19.229C6.82393 19.229 5.6146 19.0732 4.70476 18.7903C4.17277 18.6249 3.28027 18.1684 3.28027 17.6145C3.28027 17.0607 4.17277 16.7969 4.70476 16.6316C5.61465 16.3487 6.82393 16.1929 8.10985 16.1929C9.39577 16.1929 10.6051 16.3487 11.5149 16.6316C12.0469 16.7969 13.0064 17.0607 13.0064 17.6145C13.0064 18.1684 12.0469 18.6249 11.5149 18.7903C10.6051 19.0732 9.39577 19.229 8.10985 19.229Z" fill="#00C37A"></path><path d="M6.8438 17.1455C6.39136 17.1455 6.01814 17.491 5.97403 17.9319C5.9693 17.979 6.00736 18.0197 6.05466 18.0197H7.63298C7.68033 18.0197 7.71834 17.979 7.71361 17.9319C7.66945 17.4909 7.29623 17.1455 6.8438 17.1455Z" fill="#60DC4D"></path><path d="M9.39789 17.5049C9.13197 17.5049 8.9103 17.6979 8.86548 17.9512C8.85681 18.0004 8.8953 18.0455 8.94531 18.0455H9.85047C9.90044 18.0455 9.93897 18.0004 9.9303 17.9512C9.88558 17.6979 9.66381 17.5049 9.39789 17.5049Z" fill="#60DC4D"></path><path d="M18.5944 10.9327C18.3859 10.9327 18.1888 10.8521 18.0392 10.7057L14.94 7.67128C14.7883 7.52264 14.7035 7.32384 14.7012 7.11145C14.699 6.89901 14.7796 6.69848 14.9281 6.54675C15.0789 6.39281 15.2807 6.30811 15.4964 6.30811C15.7057 6.30811 15.9032 6.38864 16.0526 6.53493L19.1517 9.56934C19.465 9.87609 19.4703 10.3806 19.1636 10.6938C19.015 10.8456 18.8162 10.9304 18.6038 10.9327L18.5944 10.9327Z" fill="#AEEFFF"></path><path d="M19.1811 10.674L14.8975 6.58105C14.7691 6.72815 14.6992 6.91429 14.7012 7.11121C14.7034 7.3236 14.7883 7.5224 14.94 7.67104L18.0392 10.7055C18.1888 10.8519 18.3859 10.9325 18.5944 10.9325L18.604 10.9324C18.8163 10.9302 19.0151 10.8454 19.1638 10.6936C19.1699 10.6873 19.1752 10.6805 19.1811 10.674Z" fill="#4CE5C7"></path><path d="M17.7827 3.03614C16.9457 3.03614 16.2646 2.35514 16.2646 1.51805C16.2646 0.680953 16.9456 0 17.7827 0C18.6198 0 19.3008 0.681 19.3008 1.51809C19.3008 2.35519 18.6198 3.03614 17.7827 3.03614Z" fill="#60DC4D"></path><path d="M21.3974 3.61461C20.9855 3.61461 20.6504 3.27954 20.6504 2.86761C20.6504 2.45567 20.9855 2.12061 21.3974 2.12061C21.8093 2.12061 22.1444 2.45567 22.1444 2.86761C22.1444 3.27954 21.8093 3.61461 21.3974 3.61461Z" fill="#60DC4D"></path><path d="M21.3974 2.73411C21.3974 2.50803 21.4987 2.30553 21.6579 2.16842C21.5767 2.13804 21.4892 2.12061 21.3974 2.12061C20.9855 2.12061 20.6504 2.45567 20.6504 2.86761C20.6504 3.27954 20.9855 3.61461 21.3974 3.61461C21.5832 3.61461 21.753 3.54598 21.8839 3.43329C21.6003 3.32721 21.3974 3.05431 21.3974 2.73411Z" fill="#37C918"></path><path d="M19.8559 7.71077C19.1783 7.71077 18.627 7.15948 18.627 6.48185C18.627 5.80423 19.1783 5.25293 19.8559 5.25293C20.5335 5.25293 21.0848 5.80423 21.0848 6.48185C21.0847 7.15948 20.5335 7.71077 19.8559 7.71077Z" fill="#60DC4D"></path><path d="M17.6317 1.39566C17.6317 0.853688 17.9174 0.377391 18.3459 0.10875C18.1717 0.0388594 17.9817 0 17.7827 0C16.9457 0 16.2646 0.681 16.2646 1.51809C16.2646 2.35519 16.9456 3.03619 17.7827 3.03619C18.0778 3.03619 18.3533 2.95125 18.5866 2.805C18.0277 2.5808 17.6317 2.03377 17.6317 1.39566Z" fill="#37C918"></path><path d="M19.993 6.35941C19.993 5.97499 20.1706 5.63135 20.4478 5.40588C20.2719 5.30852 20.0698 5.25293 19.8549 5.25293C19.1773 5.25293 18.626 5.80423 18.626 6.48185C18.626 7.15948 19.1773 7.71077 19.8549 7.71077C20.1481 7.71077 20.4175 7.60741 20.629 7.43538C20.2502 7.22576 19.993 6.82212 19.993 6.35941Z" fill="#37C918"></path><path d="M18.021 10.6203L15.0252 7.68701L10.796 12.0064C9.96155 11.6185 9.07158 11.4218 8.15049 11.4218C6.46636 11.4218 4.8263 12.1104 3.65086 13.3108C2.47556 14.5111 1.83811 16.0973 1.85583 17.7771C1.87355 19.4569 2.54438 21.0292 3.7447 22.2045C4.92722 23.3623 6.48853 23.9999 8.14102 23.9999C8.16431 23.9999 8.1878 23.9998 8.21105 23.9995C9.89081 23.9818 11.4632 23.311 12.6385 22.1106C14.5015 20.2079 14.964 17.3282 13.7919 14.9397L18.021 10.6203Z" fill="#D2E3EB"></path><path d="M2.37548 19.7089C2.35777 18.029 2.99527 16.4429 4.17052 15.2426C5.346 14.0421 6.98597 13.3536 8.67014 13.3536C9.59119 13.3536 10.4812 13.5503 11.3156 13.9382L14.2387 10.9528C14.5216 10.6639 14.9444 10.5615 15.3281 10.6889L17.3097 11.3468L18.021 10.6203L15.0252 7.68701L10.796 12.0064C9.96155 11.6185 9.07158 11.4218 8.15049 11.4218C6.46636 11.4218 4.8263 12.1104 3.65086 13.3108C2.47556 14.5111 1.83811 16.0973 1.85583 17.7771C1.86516 18.6615 2.0558 19.5161 2.40919 20.2987C2.38913 20.1039 2.37759 19.9072 2.37548 19.7089Z" fill="#BBC5C9"></path><path d="M9.2533 15.0842C8.65537 15.0842 8.16895 14.5978 8.16895 13.9999C8.16895 13.4019 8.65541 12.9155 9.2533 12.9155C9.8512 12.9155 10.3377 13.4019 10.3377 13.9999C10.3377 14.5978 9.85124 15.0842 9.2533 15.0842Z" fill="#60DC4D"></path><path d="M9.2533 13.6948C9.2533 13.4094 9.3643 13.1496 9.54515 12.9557C9.45224 12.9297 9.35441 12.9155 9.2533 12.9155C8.65537 12.9155 8.16895 13.4019 8.16895 13.9999C8.16895 14.5978 8.65541 15.0843 9.2533 15.0843C9.56582 15.0843 9.84773 14.9512 10.0458 14.739C9.58926 14.6111 9.2533 14.1916 9.2533 13.6948Z" fill="#37C918"></path><path d="M8.14337 22.4773C10.8292 22.4773 13.0064 20.3001 13.0064 17.6143H3.28027C3.28027 20.3001 5.45752 22.4773 8.14337 22.4773Z" fill="#60DC4D"></path><path d="M5.7631 17.6143H3.28027C3.28027 20.3001 5.45752 22.4773 8.14332 22.4773C8.57241 22.4773 8.98843 22.4215 9.38471 22.3172C7.30037 21.7684 5.7631 19.871 5.7631 17.6143Z" fill="#37C918"></path><path d="M8.10985 19.229C6.82393 19.229 5.6146 19.0732 4.70476 18.7903C4.17277 18.6249 3.28027 18.1684 3.28027 17.6145C3.28027 17.0607 4.17277 16.7969 4.70476 16.6316C5.61465 16.3487 6.82393 16.1929 8.10985 16.1929C9.39577 16.1929 10.6051 16.3487 11.5149 16.6316C12.0469 16.7969 13.0064 17.0607 13.0064 17.6145C13.0064 18.1684 12.0469 18.6249 11.5149 18.7903C10.6051 19.0732 9.39577 19.229 8.10985 19.229Z" fill="#00C37A"></path><path d="M6.8438 17.1455C6.39136 17.1455 6.01814 17.491 5.97403 17.9319C5.9693 17.979 6.00736 18.0197 6.05466 18.0197H7.63298C7.68033 18.0197 7.71834 17.979 7.71361 17.9319C7.66945 17.4909 7.29623 17.1455 6.8438 17.1455Z" fill="#60DC4D"></path><path d="M9.39789 17.5049C9.13197 17.5049 8.9103 17.6979 8.86548 17.9512C8.85681 18.0004 8.8953 18.0455 8.94531 18.0455H9.85047C9.90044 18.0455 9.93897 18.0004 9.9303 17.9512C9.88558 17.6979 9.66381 17.5049 9.39789 17.5049Z" fill="#60DC4D"></path><path d="M18.5944 10.9327C18.3859 10.9327 18.1888 10.8521 18.0392 10.7057L14.94 7.67128C14.7883 7.52264 14.7035 7.32384 14.7012 7.11145C14.699 6.89901 14.7796 6.69848 14.9281 6.54675C15.0789 6.39281 15.2807 6.30811 15.4964 6.30811C15.7057 6.30811 15.9032 6.38864 16.0526 6.53493L19.1517 9.56934C19.465 9.87609 19.4703 10.3806 19.1636 10.6938C19.015 10.8456 18.8162 10.9304 18.6038 10.9327L18.5944 10.9327Z" fill="#D2E3EB"></path><path d="M19.1811 10.674L14.8975 6.58105C14.7691 6.72815 14.6992 6.91429 14.7012 7.11121C14.7034 7.3236 14.7883 7.5224 14.94 7.67104L18.0392 10.7055C18.1888 10.8519 18.3859 10.9325 18.5944 10.9325L18.604 10.9324C18.8163 10.9302 19.0151 10.8454 19.1638 10.6936C19.1699 10.6873 19.1752 10.6805 19.1811 10.674Z" fill="#97ABB3"></path>
                  </svg>

                  <p>Alchemy</p>
                </div>
              </div>

              <div className='item'>
                <div className='label'>
                  <p>Seed</p>
                </div>
                <div className='value'>
                  <p>951126528</p>
                </div>
              </div>

              <div className='item'>
                <div className='label'>
                  <p>Preset</p>
                </div>
                <div className='value'>
                  <p>Dynamic</p>
                </div>
              </div>

              <div className='item'>
                <div className='label'>
                  <p>Prompt Magic</p>
                </div>
                <div className='value'>
                  <p>-</p>
                </div>
              </div>

              <div className='item'>
                <div className='label'>
                  <p>Init Strength</p>
                </div>
                <div className='value'>
                  <p>No init image</p>
                </div>
              </div>

              <div className='item'>
                <div className='label'>
                  <p>High Contrast</p>
                </div>
                <div className='value'>
                  <p>-</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default ModalImageDetail