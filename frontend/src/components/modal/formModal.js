import React from 'react'
import PropTypes from 'prop-types'
import { Modal } from 'rsuite'

const FormModal = ({ open, onClose, children, ...props }) => {

    return (
        <Modal open={open} onClose={onClose} {...props}>
            <Modal.Header>
                <Modal.Title style={{
                    display: 'block',
                    fontSize: '1.7em',
                    marginBlockStart: '0.83em',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    color: '#fff'
                }}>
                    {props?.title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ overflow: 'hidden' }}>
                {children}
            </Modal.Body>
        </Modal>
    )
}

export default FormModal

FormModal.defaultProps = {
    open: false,
    title: ''
}

FormModal.propTypes = {
    open: PropTypes.bool,
    onClose: PropTypes.func,
    children: PropTypes.node,
    title: PropTypes.string
}

