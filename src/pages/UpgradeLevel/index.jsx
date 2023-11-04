import React, { useState } from 'react'
import './style.scss'
import { useNavigate } from 'react-router-dom'

import Helmet from '../../components/shared/Helmet'

const data = [
  {
    name: "Free",
    monthly: {
      price: 0,
      desciption: "Forever",
    },
    yearly: {
      price: null,
      desciption: "Forever",
    },
    tokens: "150 fast generations per day",
    featureTop: [
      {
        tick: true,
        content: "Up to 150 (768x768) generations per day"
      },
      {
        tick: true,
        content: "Up to 30 upscales or unzooms per day"
      },
      {
        tick: true,
        content: "Up to 75 background removals per day"
      },
      {
        tick: true,
        content: "Daily free tokens when your balance falls below 150"
      },
    ],
    featureBottom: [
      {
        tick: true,
        content: "Up to 1 pending jobs"
      },
      {
        tick: false,
        content: "Private generations"
      },
      {
        tick: false,
        content: "Priority infrastructure"
      },
      {
        tick: false,
        content: "Relaxed generation queue"
      },
    ]
  },
  {
    name: "Apprentice",
    monthly: {
      price: 12,
      desciption: "ex. tax",
    },
    yearly: {
      price: 10,
      desciption: "Billed yearly, ex. tax",
    },
    tokens: "8,500 tokens per month",
    featureTop: [
      {
        tick: true,
        content: "Up to 8,500 (768x768) generations per month"
      },
      {
        tick: true,
        content: "Up to 1,700 upscales or unzooms per month"
      },
      {
        tick: true,
        content: "Up to 4,250 background removals per month"
      },
      {
        tick: true,
        content: "Daily free tokens when your balance falls below 150"
      },
    ],
    featureBottom: [
      {
        tick: true,
        content: "Up to 5 pending jobs"
      },
      {
        tick: true,
        content: "Private generations"
      },
      {
        tick: true,
        content: "Priority infrastructure"
      },
      {
        tick: false,
        content: "Relaxed generation queue"
      },
    ]
  },
  {
    name: "Artisan",
    monthly: {
      price: 30,
      desciption: "ex. tax",
    },
    yearly: {
      price: 20,
      desciption: "Billed yearly, ex. tax",
    },
    tokens: "25,000 tokens per month",
    featureTop: [
      {
        tick: true,
        content: "Up to 25,000 (768x768) generations per month"
      },
      {
        tick: true,
        content: "Up to 5,000 upscales or unzooms per month"
      },
      {
        tick: true,
        content: "Up to 12,500 background removals per month"
      },
      {
        tick: true,
        content: "Daily free tokens when your balance falls below 150"
      },
    ],
    featureBottom: [
      {
        tick: true,
        content: "Up to 10 pending jobs"
      },
      {
        tick: true,
        content: "Private generations"
      },
      {
        tick: true,
        content: "Priority infrastructure"
      },
      {
        tick: true,
        content: "Relaxed generation queue"
      },
    ]
  },
  {
    name: "Maestro",
    monthly: {
      price: 60,
      desciption: "ex. tax",
    },
    yearly: {
      price: 48,
      desciption: "Billed yearly, ex. tax",
    },
    tokens: "60,000 tokens per month",
    featureTop: [
      {
        tick: true,
        content: "Up to 60,000 (768x768) generations per month"
      },
      {
        tick: true,
        content: "Up to 12,000 upscales or unzooms per month"
      },
      {
        tick: true,
        content: "Up to 30,000 background removals per month"
      },
      {
        tick: true,
        content: "Daily free tokens when your balance falls below 150"
      },
    ],
    featureBottom: [
      {
        tick: true,
        content: "Up to 20 pending jobs"
      },
      {
        tick: true,
        content: "Private generations"
      },
      {
        tick: true,
        content: "Priority infrastructure"
      },
      {
        tick: true,
        content: "Relaxed generation queue"
      },
    ]
  },
]

const UpgradeLevel = () => {

  const [activeButton, setActiveButton] = useState('yearly');
  const navigate = useNavigate();

  return (
    <Helmet>
      <div className="upgrade_page">

        <div className="back_button"
          onClick={() => {
            navigate(-1);
          }}
        >
          <svg viewBox="0 0 20 14" focusable="false" className="chakra-icon" xmlns="http://www.w3.org/2000/svg"><path d="M15.7499 7C15.7499 7.414 15.4139 7.75 14.9999 7.75H2.81091L6.53088 11.47C6.82388 11.763 6.82388 12.238 6.53088 12.531C6.38488 12.677 6.19285 12.751 6.00085 12.751C5.80885 12.751 5.61682 12.678 5.47082 12.531L0.470818 7.53101C0.401818 7.46201 0.346953 7.37911 0.308953 7.28711C0.232953 7.10411 0.232953 6.89711 0.308953 6.71411C0.346953 6.62211 0.401818 6.53897 0.470818 6.46997L5.47082 1.46997C5.76382 1.17697 6.23885 1.17697 6.53185 1.46997C6.82485 1.76297 6.82485 2.23801 6.53185 2.53101L2.81188 6.25098H14.9999C15.4139 6.24998 15.7499 6.586 15.7499 7ZM18.9999 0.25C18.5859 0.25 18.2499 0.586 18.2499 1V13C18.2499 13.414 18.5859 13.75 18.9999 13.75C19.4139 13.75 19.7499 13.414 19.7499 13V1C19.7499 0.586 19.4139 0.25 18.9999 0.25Z" fill="rgba(256, 256, 256, 0.6)"></path></svg>
          Back to YourMage
        </div>

        <div className="header">
          <div className="title">Unlock the power of YourMage.Ai</div>
          <div className="description">Choose a plan tailored to your needs</div>
        </div>

        <div className="button">
          <div className="button_pack">
            <div
              className={`button_content ${activeButton === 'yearly' ? 'actived' : ''}`}
              onClick={() => setActiveButton('yearly')}
            >
              Pay Yearly
              <span className="sale">
                Up to 20% off
                <svg viewBox="0 0 128 128" focusable="false" className="chakra-icon css-6y8oqy" enableBackground="new 0 0 128 128" xmlns="http://www.w3.org/2000/svg"><radialGradient id="radial-gradient-1-fire-emoij-:r6n:" cx="68.8839" cy="124.2963" gradientTransform="matrix(-1 -.00434301 -.00712592 1.6408 131.9857 -79.3452)" gradientUnits="userSpaceOnUse" r="70.587"><stop offset=".3144" stopColor="#ff9800"></stop><stop offset=".6616" stopColor="#ff6d00"></stop><stop offset=".9715" stopColor="#f44336"></stop></radialGradient><radialGradient id="radial-gradient-2-fire-emoij-:r6n:" cx="64.9211" cy="54.0621" gradientTransform="matrix(-.0101 .9999 .7525 .00760378 26.1538 -11.2668)" gradientUnits="userSpaceOnUse" r="73.8599"><stop offset=".2141" stopColor="#fff176"></stop><stop offset=".3275" stopColor="#fff27d"></stop><stop offset=".4868" stopColor="#fff48f"></stop><stop offset=".6722" stopColor="#fff7ad"></stop><stop offset=".7931" stopColor="#fff9c4"></stop><stop offset=".8221" stopColor="#fff8bd" stopOpacity=".804"></stop><stop offset=".8627" stopColor="#fff6ab" stopOpacity=".529"></stop><stop offset=".9101" stopColor="#fff38d" stopOpacity=".2088"></stop><stop offset=".9409" stopColor="#fff176" stopOpacity="0"></stop></radialGradient><path d="m35.56 40.73c-.57 6.08-.97 16.84 2.62 21.42 0 0-1.69-11.82 13.46-26.65 6.1-5.97 7.51-14.09 5.38-20.18-1.21-3.45-3.42-6.3-5.34-8.29-1.12-1.17-.26-3.1 1.37-3.03 9.86.44 25.84 3.18 32.63 20.22 2.98 7.48 3.2 15.21 1.78 23.07-.9 5.02-4.1 16.18 3.2 17.55 5.21.98 7.73-3.16 8.86-6.14.47-1.24 2.1-1.55 2.98-.56 8.8 10.01 9.55 21.8 7.73 31.95-3.52 19.62-23.39 33.9-43.13 33.9-24.66 0-44.29-14.11-49.38-39.65-2.05-10.31-1.01-30.71 14.89-45.11 1.18-1.08 3.11-.12 2.95 1.5z" fill="url(#radial-gradient-1-fire-emoij-:r6n:)"></path><path d="m76.11 77.42c-9.09-11.7-5.02-25.05-2.79-30.37.3-.7-.5-1.36-1.13-.93-3.91 2.66-11.92 8.92-15.65 17.73-5.05 11.91-4.69 17.74-1.7 24.86 1.8 4.29-.29 5.2-1.34 5.36-1.02.16-1.96-.52-2.71-1.23-2.15-2.05-3.7-4.72-4.44-7.6-.16-.62-.97-.79-1.34-.28-2.8 3.87-4.25 10.08-4.32 14.47-.22 13.57 10.99 24.57 24.55 24.57 17.09 0 29.54-18.9 19.72-34.7-2.85-4.6-5.53-7.61-8.85-11.88z" fill="url(#radial-gradient-2-fire-emoij-:r6n:)"></path></svg>
              </span>
            </div>
            <div
              className={`button_content ${activeButton === 'monthly' ? 'actived' : ''}`}
              onClick={() => setActiveButton('monthly')}
            >
              Pay Monthly
            </div>
          </div>
        </div>

        <div className="option">
          {data.map((item, key) => {
            return (
              <div className={`pack ${!item.yearly.price && 'gradiant'}`} key={key}>
                <div className="pack_top">

                  <div className={`name ${item.name}`}>{item.name}</div>

                  <div className={`price ${!item.yearly.price && 'gradiant_price'}`}>
                    {activeButton == "yearly" && item.yearly.price && <div className="pre_price">${item.monthly.price}</div>}
                    <span className='origin-price'>${activeButton == "yearly" && item.yearly.price ? item.yearly.price : item.monthly.price}</span>
                    <span className="month">/ month</span>
                  </div>

                  <div className="description">
                    {activeButton === "monthly" ? item.monthly.desciption : item.yearly.desciption}
                  </div>

                  {
                    item.yearly.price &&
                    <div
                      className="subscribe"
                      onClick={() => {
                        navigate('/payment', { state: { item, activeButton } });
                      }}
                    >
                      {`Subscribe To ${item.name}`}
                    </div>
                  }

                  {
                    item.yearly.price &&
                    <div className="switch">
                      {
                        activeButton === "monthly" ?
                          <div
                            className="switch_button"
                            onClick={() => setActiveButton('yearly')}
                          >
                            Switch to annual billing
                          </div>
                          :
                          <div
                            className="switch_button"
                            onClick={() => setActiveButton('monthly')}
                          >
                            Switch to monthly billing
                          </div>
                      }
                    </div>
                  }

                </div>

                <div className={`pack_bottom ${!item.yearly.price && 'color_pack_bottom'}`}>

                  <div className="token">
                    {item.tokens}
                  </div>

                  <div className="feature">
                    Combined in any of the following ways:
                  </div>

                  <div className="line" />

                  <div className="feature_top">
                    {item.featureTop.map((value, index) => {
                      return (
                        <div className="feature_content" key={index}>
                          {value.tick ?
                            <svg viewBox="0 0 24 24" focusable="false" fill="rgb(11,182,118)" xmlns="http://www.w3.org/2000/svg"><path d="M8.99978 17.9992C8.99878 17.9992 8.99778 17.9992 8.99578 17.9992C8.72878 17.9982 8.47477 17.8913 8.28777 17.7013L4.28778 13.6393C3.89978 13.2453 3.90478 12.6123 4.29878 12.2253C4.69278 11.8383 5.32478 11.8422 5.71278 12.2362L9.00577 15.5802L18.2938 6.29325C18.6848 5.90225 19.3168 5.90225 19.7078 6.29325C20.0988 6.68325 20.0988 7.31725 19.7078 7.70725L9.70777 17.7073C9.51977 17.8943 9.26478 17.9992 8.99978 17.9992Z" fill="currentColor"></path></svg>
                            :
                            <svg width="calc(1rem * 1.3750)" height="calc(1rem * 1.4375)" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.9856 16.5148C17.2542 16.7834 17.2542 17.2189 16.9856 17.4874C16.8518 17.6213 16.6758 17.6891 16.4998 17.6891C16.3238 17.6891 16.1478 17.6222 16.0139 17.4874L10.9998 12.4733L5.9856 17.4874C5.85177 17.6213 5.67577 17.6891 5.49977 17.6891C5.32377 17.6891 5.14777 17.6222 5.01394 17.4874C4.74535 17.2189 4.74535 16.7834 5.01394 16.5148L10.0281 11.5007L5.01394 6.48655C4.74535 6.21797 4.74535 5.78252 5.01394 5.51394C5.28252 5.24535 5.71794 5.24535 5.98653 5.51394L11.0007 10.5281L16.0148 5.51394C16.2834 5.24535 16.7189 5.24535 16.9874 5.51394C17.256 5.78252 17.256 6.21797 16.9874 6.48655L11.9733 11.5007L16.9856 16.5148Z" fill="#E45F35"></path></svg>
                          }
                          <div className="feature_text">
                            {value.content}
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  <div className="line" />

                  <div className="feature_top">
                    {item.featureBottom.map((value, index) => {
                      return (
                        <div className="feature_content" key={index}>
                          {value.tick ?
                            <svg viewBox="0 0 24 24" focusable="false" fill="rgb(11,182,118)" xmlns="http://www.w3.org/2000/svg"><path d="M8.99978 17.9992C8.99878 17.9992 8.99778 17.9992 8.99578 17.9992C8.72878 17.9982 8.47477 17.8913 8.28777 17.7013L4.28778 13.6393C3.89978 13.2453 3.90478 12.6123 4.29878 12.2253C4.69278 11.8383 5.32478 11.8422 5.71278 12.2362L9.00577 15.5802L18.2938 6.29325C18.6848 5.90225 19.3168 5.90225 19.7078 6.29325C20.0988 6.68325 20.0988 7.31725 19.7078 7.70725L9.70777 17.7073C9.51977 17.8943 9.26478 17.9992 8.99978 17.9992Z" fill="currentColor"></path></svg>
                            :
                            <svg width="calc(1rem * 1.3750)" height="calc(1rem * 1.4375)" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.9856 16.5148C17.2542 16.7834 17.2542 17.2189 16.9856 17.4874C16.8518 17.6213 16.6758 17.6891 16.4998 17.6891C16.3238 17.6891 16.1478 17.6222 16.0139 17.4874L10.9998 12.4733L5.9856 17.4874C5.85177 17.6213 5.67577 17.6891 5.49977 17.6891C5.32377 17.6891 5.14777 17.6222 5.01394 17.4874C4.74535 17.2189 4.74535 16.7834 5.01394 16.5148L10.0281 11.5007L5.01394 6.48655C4.74535 6.21797 4.74535 5.78252 5.01394 5.51394C5.28252 5.24535 5.71794 5.24535 5.98653 5.51394L11.0007 10.5281L16.0148 5.51394C16.2834 5.24535 16.7189 5.24535 16.9874 5.51394C17.256 5.78252 17.256 6.21797 16.9874 6.48655L11.9733 11.5007L16.9856 16.5148Z" fill="#E45F35"></path></svg>
                          }
                          <div className="feature_text">
                            {value.content}
                          </div>
                        </div>
                      )
                    })}
                  </div>

                </div>

              </div>
            )
          })}
        </div>

      </div>
    </Helmet>
  )
}

export default UpgradeLevel