import React, {Component, Fragment} from 'react';
import Menu from "../components/Menu";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import  Axios from "axios";
import {Col, Container, Row, Spinner} from "react-bootstrap";
import LoadingDiv from '../components/loadingDiv';
import WentWrong from '../components/wentWrong';
import Card from "react-bootstrap/Card";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class ContactPage extends Component {

    constructor(){
        super();
        this.state={
            dataList:[],
            isLoading:true,
            isError:false,
            rowDataID: "",
            deleteBtnText:"Delete"
        }
        this.dataDelete=this.dataDelete.bind(this);
    }

    componentDidMount() {
        Axios.get('/ContactList').then((response)=>{

            if (response.status==200){
                this.setState({dataList:response.data,isLoading:false,isError:false})
            }
            else{
                this.setState({isLoading:false,isError:true})
            }

        }).catch((error)=>{
            this.setState({isLoading:false,isError:true})
        })
    }

    dataDelete(){


        let confirmResult = confirm("Do you want to delete..?")

        if(confirmResult==true){

            this.setState({deleteBtnText:" Deleting..."})
            Axios.post('/ContactDelete',{id:this.state.rowDataID}).then((response)=>{

                if(response.data==1 && response.status==200){
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
                }
                else{
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
            }).catch((error)=>{
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

    render() {

        if (this.state.isLoading==true){
            return(
                <Menu>
                    <Container>
                        <LoadingDiv/>
                    </Container>
                </Menu>
            )
        }
        else if(this.state.isError==true){
            return(
                <Menu>
                    <Container>
                        <WentWrong/>
                    </Container>
                </Menu>
            )
        }else{
            const data = this.state.dataList;

            const columns = [
                {dataField: 'id', text: 'ID'},
                {dataField: 'name', text: 'Name'},
                {dataField: 'email', text: 'Email'},
                {dataField: 'message', text: 'Message'}
            ];

            const selectRow = {
                mode:'radio',
                onSelect:(row,isSelect,rowIndex)=>{
                    this.setState({rowDataID: row['id']})
                }
            }

            return (
                <Fragment>
                    <Menu title="Contact">
                        <Container fluid={true}>
                            <Row>
                                <Col md={12} sm={12} lg={12} className="mt-2">
                                    <Card>
                                        <Card.Body>
                                            <button onClick = {this.dataDelete} className="normal-btn my-2 btn">{this.state.deleteBtnText}</button>
                                            <BootstrapTable
                                                keyField='id'
                                                data={data}
                                                columns={columns}
                                                selectRow={selectRow}
                                                pagination={ paginationFactory() } />
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
                </Fragment>
            );
        }
    }
}
export default ContactPage;
