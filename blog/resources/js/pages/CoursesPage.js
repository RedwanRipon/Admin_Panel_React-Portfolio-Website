import React, {Component, Fragment} from 'react';
import Menu from "../components/Menu";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import  Axios from "axios";
import {Button, Col, Container, Form, Modal, Row, Spinner} from "react-bootstrap";
import LoadingDiv from '../components/loadingDiv';
import WentWrong from '../components/wentWrong';
import ReactQuill from "react-quill";
import Card from "react-bootstrap/Card";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class CoursesPage extends Component {

    constructor(){
        super();
        this.state={
            dataList:[],
            isLoading:true,
            isError:false,
            rowDataID: "",
            deleteBtnText:"Delete",
            AddNewModal: false,
            shortTitle:'',
            shortDes:'',
            longTitle:'',
            longDes:'',
            TotalLecture:'',
            TotalStudent:'',
            coursePhoto:'',
            skillAll:'',
            videoUrl:'',
            courseLink:''
        };
        this.dataDelete=this.dataDelete.bind(this);
        this.imgCellFormat=this.imgCellFormat.bind(this);

        this.addNewModalOpen=this.addNewModalOpen.bind(this);
        this.addNewModalClose=this.addNewModalClose.bind(this);

        this.sTitleOnChange=this.sTitleOnChange.bind(this);
        this.sDesOnChange=this.sDesOnChange.bind(this);
        this.lTitleOnChange=this.lTitleOnChange.bind(this);
        this.lDesOnChange=this.lDesOnChange.bind(this);
        this.lectureOnChange=this.lectureOnChange.bind(this);
        this.studentOnChange=this.studentOnChange.bind(this);
        this.photoOnChange=this.photoOnChange.bind(this);
        this.skillOnChange=this.skillOnChange.bind(this);
        this.videoOnChange=this.videoOnChange.bind(this);
        this.linkOnChange=this.linkOnChange.bind(this);

        this.addFormSubmit=this.addFormSubmit.bind(this);
    }
    addNewModalOpen(){
        this.setState({AddNewModal:true});
    }

    addNewModalClose(){
        this.setState({AddNewModal:false});
    }

    sTitleOnChange(event){
        let shortTitle =  event.target.value;
        this.setState({shortTitle:shortTitle})
    }

    sDesOnChange(event){
        let shortDes =  event.target.value;
        this.setState({shortDes:shortDes})
    }

    lTitleOnChange(event){
        let longTitle =  event.target.value;
        this.setState({longTitle:longTitle})
    }

    lDesOnChange(event){
        let longDes =  event.target.value;
        this.setState({longDes:longDes})
    }

    lectureOnChange(event){
        let TotalLecture =  event.target.value;
        this.setState({TotalLecture:TotalLecture})
    }

    studentOnChange(event){
        let TotalStudent =  event.target.value;
        this.setState({TotalStudent:TotalStudent})
    }

    photoOnChange(event){
        let coursePhoto =  event.target.files[0];
        this.setState({coursePhoto:coursePhoto})
    }

    skillOnChange(content, delta, source, editor){
        let htmlContent = editor.getHTML();
        this.setState({skillAll:htmlContent})
    }

    videoOnChange(event){
        let videoUrl =  event.target.value;
        this.setState({videoUrl:videoUrl})
    }

    linkOnChange(event){
        let courseLink =  event.target.value;
        this.setState({courseLink:courseLink})
    }

    addFormSubmit(event){

        let shortTitle = this.state.shortTitle;
        let shortDes = this.state.shortDes;
        let longTitle = this.state.longTitle;
        let longDes = this.state.longDes;
        let TotalLecture = this.state.TotalLecture;
        let TotalStudent = this.state.TotalStudent;
        let coursePhoto = this.state.coursePhoto;
        let skillAll = this.state.skillAll;
        let videoUrl = this.state.videoUrl;
        let courseLink = this.state.courseLink;

        let url = "/AddCourse";

        let myFormData = new FormData();
        myFormData.append('shortTitle',shortTitle);
        myFormData.append('shortDes',shortDes);
        myFormData.append('longTitle',longTitle);
        myFormData.append('longDes',longDes);
        myFormData.append('TotalLecture',TotalLecture);
        myFormData.append('TotalStudent',TotalStudent);
        myFormData.append('coursePhoto',coursePhoto);
        myFormData.append('skillAll',skillAll);
        myFormData.append('videoUrl',videoUrl);
        myFormData.append('courseLink',courseLink);

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
        Axios.get('/CourseList').then((response)=>{

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
            Axios.post('/CourseDelete',{id:this.state.rowDataID}).then((response)=>{

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

    imgCellFormat(cell,row){

        return (
            <img className="w-75" src={cell} alt="image"/>
        )

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
                {dataField: 'small_img', text: 'Image',formatter:this.imgCellFormat},
                {dataField: 'short_title', text: 'Short Title'},
                {dataField: 'short_des', text: 'Short Description'},
                {dataField: 'long_title', text: 'Long Title'},
                {dataField: 'long_des', text: 'Long Description'},
                {dataField: 'total_lecture', text: 'Total Lecture'},
                {dataField: 'total_student', text: 'Total Student'},
            ];

            const selectRow = {
                mode:'radio',
                onSelect:(row,isSelect,rowIndex)=>{
                    this.setState({rowDataID: row['id']})
                }
            };

            return (
                <Fragment>
                    <Menu title="Courses">
                        <Container fluid={true}>
                            <Row>
                                <Col md={12} sm={12} lg={12} className="mt-2">
                                    <Card>
                                        <Card.Body>
                                            <button onClick = {this.dataDelete} className="normal-btn my-2 btn">{this.state.deleteBtnText}</button>
                                            <button onClick={this.addNewModalOpen} className="normal-btn ml-2 my-2 btn ">Add New</button>
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

                    <Modal show={this.state.AddNewModal} onHide={this.addNewModalClose}>
                        <Modal.Header closeButton>
                            <h6>Add New Courses</h6>
                        </Modal.Header>
                        <Modal.Body>
                            <Form onSubmit={this.addFormSubmit}>
                                <Form.Group>
                                    <Form.Label>Short Title</Form.Label>
                                    <Form.Control onChange={this.sTitleOnChange} type="text" placeholder="Short Title" />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Short Description</Form.Label>
                                    <Form.Control onChange={this.sDesOnChange} type="text" placeholder="Short Description" />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Long Title</Form.Label>
                                    <Form.Control onChange={this.lTitleOnChange} type="text" placeholder="Long Title" />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Long Description</Form.Label>
                                    <Form.Control onChange={this.lDesOnChange} type="text" placeholder="Long Description" />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Total Lecture</Form.Label>
                                    <Form.Control onChange={this.lectureOnChange} type="text" placeholder="Total Lecture" />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Total Student</Form.Label>
                                    <Form.Control onChange={this.studentOnChange} type="text" placeholder="Total Student" />
                                </Form.Group>
                                <Form.Group className="mb-5">
                                    <Form.Label>Skill You Get</Form.Label>
                                    <ReactQuill onChange={this.skillOnChange} className="h-50 course-feature" theme="snow"/>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Video Url</Form.Label>
                                    <Form.Control onChange={this.videoOnChange} type="text" placeholder="Video Url" />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Course Link</Form.Label>
                                    <Form.Control onChange={this.linkOnChange} type="text" placeholder="Course Link" />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Course Image</Form.Label>
                                    <Form.Control onChange={this.photoOnChange}  type="file" placeholder="Course Image" />
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
export default CoursesPage;
