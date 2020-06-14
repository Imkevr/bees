import React from 'react'
import { Modal } from 'react-bootstrap'

class CalenderSettingsModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            workStart: 8,
            workEnd: '',
            workDays: [],

        }

    }
    handleCheckboxChange = (event) => {
        let newArray = [...this.state.workDays, event.target.id];
        if (this.state.workDays.includes(event.target.id)) {
          newArray = newArray.filter(day => day !== event.target.id);
        } else {
          newArray = [...this.state.workDays, event.target.id];
        }
        this.setState({
          workDays: newArray
        });
       
      };

      handleStartChange = (event)=>{
          this.setState({workStart: event.target.value})
      }

      handleEndChange = (event)=>{
        this.setState({workEnd: event.target.value})
    }

    render() {
        console.log('workdays',this.state.workDays)
        console.log('work start',this.state.workStart)
        console.log('work end',this.state.workEnd)

        return (
            <React.Fragment>

                <Modal
                    {...this.props}
                    size="lg"
                    aria-labelledby="contained-modal-create-service"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">Calendar settings</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <div>
                                <h5>Select your workday(s):</h5>
                                <div class="custom-control custom-checkbox " >

                                    {
                                        ["monday", "tuesday","wednesday","thursday","friday","saturday","sunday"].map(day => {
                                            return (
                                                <div class="custom-control custom-checkbox">
                                                    <input type="checkbox" class="custom-control-input" id={day} value={day} onChange={this.handleCheckboxChange} />
                                                    <label class="custom-control-label" for={day}>{day}</label>
                                                </div>
                                            )
                                        })
                                    }
                                </div>

                         

                            <label class="my-1 mr-2" for="inlineFormCustomSelectPref">Start:</label>
                            <select class="custom-select my-1 mr-sm-2" id="inlineFormCustomSelectPref" onChange={this.handleStartChange} >
                                <option selected>Choose a start hour...</option>
                                <option value="7">7u</option>
                                <option value="8">8u</option>
                                <option value="9">9u</option>
                                <option value="10">10u</option>
                                <option value="11">11u</option>
                            </select>
                            <label class="my-1 mr-2" for="inlineFormCustomSelectPref">End:</label>
                            <select class="custom-select my-1 mr-sm-2" id="inlineFormCustomSelectPref" onChange={this.handleEndChange}>
                                <option selected>Choose an end hour...</option>
                                <option value="16">16u</option>
                                <option value="17">17u</option>
                                <option value="18">18u</option>
                                <option value="19">19u</option>
                                <option value="20">20u</option>
                            </select>

                                </div>
                        </form>
                    <button onClick={this.props.onHide}>Save settings</button>
                          
                    </Modal.Body>

                </Modal>


            </React.Fragment >

        );
    }
}

export default CalenderSettingsModal;
