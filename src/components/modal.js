import React from "react"
import { motion, AnimatePresence } from "framer-motion";

import Icon from "../components/icon"
import { ScaleUp } from "../components/animations/scaleUp"

export const ModalWrapperVariants = {
    open: () => ({
        opacity: "1"
    }),
    closed: () => ({
        opacity: "0"
    })
};

export const ModalOverlayVariants = {
  open: () => ({
      opacity: "1",
      x: "-50%",
      y: "-50%",
      scale: "1",
      borderWidth: "0",
      transition: {
        when: "beforeChildren"
      }
  }),
  closed: () => ({
      opacity: "0",
      x: "-50%",
      y: "-50%",
      scale: "0",
      borderWidth: "150vmax",
      transition: {
        when: "afterChildren"
      },
  })
};

export const ModalVariants = {
  open: () => ({
      opacity: "1",
      y: "0",
      transition: {
        delay: "0.2"
      }
  }),
  closed: () => ({
      opacity: "0",
      y: "50%"
  })
};

const stopPropagation = e => e.stopPropagation();

const Modal = ({ children, open, onClose, modalClassName, ...props }) => {

  return (
    <AnimatePresence>

      {open && (
        <motion.div
          key="modal"
          className="c-modal-wrapper"
          initial="closed"
          animate="open"
          exit="closed"
          variants={ModalWrapperVariants}>

          <motion.div className={"c-modal-overlay"}
            onClick={onClose}
            initial="closed"
            animate="open"
            variants={ModalOverlayVariants}>
          </motion.div>

          <motion.div className={"c-modal " + modalClassName}
            {...props}
            onClick={stopPropagation}
            initial="closed"
            animate="open"
            variants={ModalVariants}>

            <button onClick={onClose} className="c-modal__close u-pd-xs">
              <ScaleUp delay={200}>
                <Icon name="close" />
              </ScaleUp>
            </button>

            {children}

          </motion.div>
        </motion.div>
      )}

    </AnimatePresence>
  )
};

export default Modal
