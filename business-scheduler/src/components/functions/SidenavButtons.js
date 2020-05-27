import React from 'react'
import CreateServiceModal from './CreateServiceModal'
import '../../styles/sideNavButtons.scss'

export default function SidenavButtons(props) {
    const [modalShow, setModalShow] = React.useState(false);

    return (
        <React.Fragment>
                    <a class="dropdown-item" onClick={() => setModalShow(true)}>{props.usage}</a>
            <CreateServiceModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                modelUsage= {props.usage}
            />
        </React.Fragment>
    )
}
