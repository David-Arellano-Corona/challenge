import React from 'react';
import { Modal, Image, Button } from 'semantic-ui-react';
export default function ModalDescription(props) {
    const { show, onModalClose, title, img, children } = props;
    return (
        <Modal open={show} size="large" onClose={onModalClose}  >
            <Modal.Header>{title}</Modal.Header>
            <Modal.Content image>
                <Image size="medium" src={img} />
                <Modal.Description>{children}</Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                <Button onClick={onModalClose} >Cerrar</Button>
            </Modal.Actions>
        </Modal>
    )
}
