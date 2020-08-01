import React, {Component, Fragment} from 'react';
import Menu from "../components/Menu";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import  Axios from "axios";
import {Button, Col, Container, Form, Modal, Row, Spinner} from "react-bootstrap";
import LoadingDiv from '../components/loadingDiv';
import WentWrong from '../components/wentWrong';
import Card from "react-bootstrap/Card";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class ClientReviewPage extends Component {

    constructor() {
        super();
        this.state = {
            dataList: [],
            isLoading: true,
            isError: false,
            rowDataID: "",
            deleteBtnText: "Delete",
            AddNewModal: false,
            addTitle: '',
            addDes: '',
            addFile: '',
        };
        this.dataDelete = this.dataDelete.bind(this);
        this.imgCellFormat=this.imgCellFormat.bind(this);

        this.addNewModalOpen=this.addNewModalOpen.bind(this);
        this.addNewModalClose=this.addNewModalClose.bind(this);

        this.titleOnChange=this.titleOnChange.bind(this);
        this.desOnChange=this.desOnChange.bind(this);
        this.fileOnChange=this.fileOnChange.bind(this);

        this.addFormSubmit=this.addFormSubmit.bind(this);
    }

    addNewModalOpen(){
        this.setState({AddNewModal:true});
    }

    addNewModalClose(){
        this.setState({AddNewModal:false});
    }

    //Form data pull

    titleOnChange(event){
        let title =  event.target.value;
        this.setState({addTitle:title});
    }

    desOnChange(event){
        let des =  event.target.value;
        this.setState({addDes:des});
    }

    fileOnChange(event){
        let photo =  event.target.files[0];
        this.setState({addFile:photo});
    }
    addFormSubmit(event){

        let title = this.state.addTitle;
        let des = this.state.addDes;
        let photo = this.state.addFile;
        let url = "/AddReview";

        let myFormData = new FormData();
        myFormData.append('title',title);
        myFormData.append('des',des);
        myFormData.append('photo',photo);

        let config = {
            headers:{'content-type':'multipart/form-data'}
        };
        Axios.post(url,myFormData,config).then((response)=>{

            if(response.data==1){
                toast.success('Create Success', {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: 0,
                });
                this.addNewModalClose();
                this.componentDidMount();
            }
            else{
                toast.error('Create Fail', {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: 0,
                });
            }

        }).catch((error)=>{
            toast.error('Create Fail', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: 0,
            });
        });

        event.preventDefault();
    }

    componentDidMount() {
        Axios.get('/ReviewList').then((response) => {

            if (response.status == 200) {
                this.setState({dataList: response.data, isLoading: false, isError: false})
            } else {
                this.setState({isLoading: false, isError: true})
            }

        }).catch((error) => {
            this.setState({isLoading: false, isError: true})
        })
    }

    dataDelete() {

        let confirmResult = confirm("Do you want to delete..?");

        if (confirmResult == true) {

            this.setState({deleteBtnText: " Deleting..."});
            Axios.post('/ReviewDelete', {id: this.state.rowDataID}).then((response) => {

                if (response.data == 1 && response.status == 200) {
                    toast.success('Delete Success', {
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: 0,
                    });
                    this.setState({deleteBtnText: "Delete"})
                    this.componentDidMount();

                } else {
                    toast.error('Delete fail', {
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: 0,
                    });
                    this.setState({deleteBtnText: "Delete"})
                }

            }).catch((error) => {
                toast.error('Delete fail', {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: 0,
                });
                this.setState({deleteBtnText: "Delete"})
            })

        }
    }


    imgCellFormat(cell,row){

        return (
            <img className="w-75" src={cell} alt="image"/>
        )

    }

    render() {

        if (this.state.isLoading == true) {
            return (
                <Menu>
                    <Container>
                        <LoadingDiv/>
                    </Container>
                </Menu>
            )
        } else if (this.state.isError == true) {
            return (
                <Menu>
                    <Container>
                        <WentWrong/>
                    </Container>
                </Menu>
            )
        } else {
            const data = this.state.dataList;

            const columns = [
                {dataField: 'id', text: 'ID'},
                {dataField: 'client_img', text: 'Image',formatter:this.imgCellFormat},
                {dataField: 'client_title', text: 'Client Name '},
                {dataField: 'client_description', text: 'Description'},
            ];

            const selectRow = {
                mode: 'radio',
                onSelect: (row, isSelect, rowIndex) => {
                    this.setState({rowDataID: row['id']})
                }
            }

            return (
                <Fragment>
                    <Menu title="ClientReview">
                        <Container>
                            <Row>
                                <Col md={12} sm={12} lg={12} className="mt-2">
                                    <Card>
                                        <Card.Body>
                                            <button onClick={this.dataDelete} className="normal-btn my-2 btn">{this.state.deleteBtnText}</button>
                                            <button onClick={this.addNewModalOpen} className="normal-btn ml-2 my-2 btn ">Add New</button>
                                            <BootstrapTable
                                                keyField='id'
                                                data={data}
                                                columns={columns}
                                                selectRow={selectRow}
                                                pagination={paginationFactory()}/>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                            <ToastContainer
                                position="top-center"
                                autoClose={3000}
                                hideProgressBar={false}
                                newestOnTop={false}
                                closeOnClick
                                rtl={false}
                                pauseOnFocusLoss={false}
                                draggable
                                pauseOnHover={false}
                            />
                        </Container>
                    </Menu>

                    <Modal show={this.state.AddNewModal} onHide={this.addNewModalClose}>
                        <Modal.Header closeButton>
                            <h6>Add New Review</h6>
                        </Modal.Header>
                        <Modal.Body>

                            <Form onSubmit={this.addFormSubmit}>
                                <Form.Group>
                                    <Form.Label>Review Title</Form.Label>
                                    <Form.Control onChange={this.titleOnChange} type="text" placeholder="Review Title" />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Review Description</Form.Label>
                                    <Form.Control onChange={this.desOnChange} type="text" placeholder="Review Description" />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Client Image</Form.Label>
                                    <Form.Control onChange={this.fileOnChange}  type="file" placeholder="Client Image" />
                                </Form.Group>

                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                            </Form>

                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.addNewModalClose}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </Fragment>
            );
        }
    }
}
export default ClientReviewPage;
