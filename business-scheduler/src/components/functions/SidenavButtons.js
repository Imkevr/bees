import React from 'react'
import CreateServiceModal from './CreateServiceModal'
import CreateClientModal from './createClientModal'
import '../../styles/sideNavButtons.scss'

export default function SidenavButtons(props) {
    const [modalShow, setModalShow, setClientModalShow] = React.useState(false);

    return (
        <React.Fragment>

            <a class="dropdown-item" onClick={() => {setModalShow(true)}}>{props.usage}</a>
            {
                if(props.usage === "client" && modalShow){
                    <CreateClientModal
                    show={modalShow}
                    onHide={() => setClientModalShow(false)}
                    modelUsage={props.usage}
                />
                }
                if(props.usage === "service" && modalShow){
                    <CreateServiceModal
                    show={modalShow}
                    onHide={() => setServiceModalShow(false)}
                    modelUsage={props.usage}
                />
                }
                if(props.usage === "appointment" && modalShow){
                    <CreateAppointmentModal
                    show={modalShow}
                    onHide={() => setServiceModalShow(false)}
                    modelUsage={props.usage}
                />
                }
            }


        </React.Fragment>
    )
}
