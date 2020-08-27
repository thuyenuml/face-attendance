import React,{ useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { ACCESS_TOKEN_NAME, API_BASE_URL } from '../constants/apiContants';
import axios from 'axios';
import './Home.css';
import Header from "../Header/Header";

function Home(props) {
    const [state, setState] = useState(0);
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get(API_BASE_URL+'/subjects', { headers: { 'token': localStorage.getItem(ACCESS_TOKEN_NAME) }})
                // .then(function (response) {
                //     console.log('list subject: ', response);
                //     setState(response.data.result);
                //
                // })
                // .catch(function (error) {
                //     redirectToLogin()
                // });
            console.log('result: ', result);
            setState(result.data.result);

        };
        fetchData();

    }, [])

    function transform(faceImage) {
        return 'data:image/png;base64,' + faceImage;
    }

    function redirectToLogin() {
        props.history.push('/login');
    }

    function editSubject(subject) {

    }

    function openModal(subject) {

    }

    return(
        <div className="home">
            <Header />
            <div className="mt-2">
                <div>
                    <table className="table user-list">
                        <thead>
                        <tr>
                            <th className="hidden" ><span>Id</span></th>
                            <th ><span>Photo</span></th >
                            <th><span>NID</span></th>
                            <th><span>Email</span></th>
                            <th><span>Created</span></th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {state && state.map(subject => (
                            <tr>
                                <td className="hidden">{subject.subjectId}</td>
                                <td>
                                    <img className="image-subject" src={transform(subject.image.base64Image)} />
                                    <a href="javascript:void(0)" className="user-link" onClick={editSubject(subject)}>{subject.bioGraphy.firstName}
                                        {subject.bioGraphy.lastName}</a>
                                    <span className="user-subhead">{subject.bioGraphy.birthDate}</span>
                                </td>
                                <td>{subject.bioGraphy.nid}</td>
                                <td>{subject.contact.email}</td>
                                <td>{subject.createdDate}</td>
                                <td>
                                    <button className="btn btn-info btn-sm" onClick={editSubject(subject)}>Edit</button>
                                    <button className="btn btn-danger btn-sm" onClick={openModal(subject)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default withRouter(Home);
