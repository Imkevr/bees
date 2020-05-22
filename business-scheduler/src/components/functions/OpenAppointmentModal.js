import React from 'react'
import CreateAppointmentModal from './createAppointmentModal'

export default function OpenAppointmentModal(props) {
    const [modalShow, setModalShow] = React.useState(false);
    return (
        <React.Fragment >
            {() => setModalShow(true)}
            <CreateAppointmentModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                object={props.object}
            />
        </React.Fragment>
    )
}
