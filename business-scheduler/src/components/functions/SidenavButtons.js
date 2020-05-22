import React from 'react'
import CreateServiceModal from './CreateServiceModal'

export default function SidenavButtons(props) {
    const [modalShow, setModalShow] = React.useState(false);
    return (
        <React.Fragment>
            <button onClick={() => setModalShow(true)}> {props.buttonName === "services" ? "Create new service" : "Add new client"}</button>
            <CreateServiceModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                usagename={props.buttonName}
            />
        </React.Fragment>
    )
}
