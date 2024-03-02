'use client'
import '@styles/toast.css';

import { useEffect } from 'react';

import ReactDOMServer from 'react-dom/server';

const Toast = ({ show, text, type, after }) => {

  useEffect(() => {
    if (!show || !text) return
    // Create a new element on body
    const { id, jsx } = ToastElement({ text, type });
    const toaNode = ReactDOMServer.renderToStaticMarkup(jsx);
    document.body.insertAdjacentHTML('beforeend', toaNode);
    // remove the toast after 5 seconds
    setTimeout(() => {
      const el = document.getElementById(id)
      el.classList.add('inactive');
      setTimeout(() => {
        document.body.removeChild(el);
        after()
      }, 300)
    }, 5000)
  }, [show, text])

  return null
}

const ToastElement = ({ text, type }) => {
  
  const rand = "id-" + Math.floor(Math.random() * 9000)
  
  return {id: rand, jsx: (
    <div className={`toast ${type}`} id={rand}>
      <div className="toast-content">
        <div className="message">
          {text}
        </div>
      </div>
    </div>
  )}}

export default Toast