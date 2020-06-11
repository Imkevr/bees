import React from 'react'
import CreateServiceModal from './CreateServiceModal'
import CreateClientModal from './createClientModal'
import AppointmentPopup from '../CalenderComponents/AppointmentPopup'
import '../../styles/sideNavButtons.scss'

export default function SidenavButtons(props) {
    const [modalShow, setModalShow] = React.useState(false);

    return (
        <React.Fragment>

        <a class="dropdown-item" onClick={() => {setModalShow(true)}}>{props.usage}</a>
            {props.usage === "client" && modalShow &&
                <CreateClientModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    modelUsage={props.usage}
                />
            }
            {props.usage === "service" && modalShow &&
                <CreateServiceModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    modelUsage={props.usage}
                />
            }
            {props.usage === "appointment" && modalShow &&
                <AppointmentPopup
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    modelUsage={props.usage}
                />
            }
        


    </React.Fragment>
    )
}
