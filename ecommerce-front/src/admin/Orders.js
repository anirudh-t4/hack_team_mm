import React, {useState, useEffect} from 'react';
import Layout from '../core/Layout';
import {isAuthenricated} from '../auth/index';
import {Link} from 'react-router-dom';
import {listOrders, getStatusValues, updateOrderStatus} from './apiAdmin';
import moment from 'moment';
import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { CChartLine } from '@coreui/react-chartjs'
import { getStyle, hexToRgba } from '@coreui/utils'
import CIcon from '@coreui/icons-react'
import {
  cibCcAmex,
  cibCcApplePay,
  cibCcMastercard,
  cibCcPaypal,
  cibCcStripe,
  cibCcVisa,
  cifBr,
  cifEs,
  cifFr,
  cifIn,
  cifPl,
  cifUs,
  cilBed,
  cilCarAlt,
  cilCloudDownload,
  cilCoffee,
  cilDinner,
  cilFastfood,
  cilPeople,
  cilUser,
  cilUserFemale,
} from '@coreui/icons'
import avatar1 from './../assets/images/avatars/1.jpg'
import avatar2 from './../assets/images/avatars/2.jpg'
import avatar3 from './../assets/images/avatars/3.jpg'
import avatar4 from './../assets/images/avatars/4.jpg'
import avatar5 from './../assets/images/avatars/5.jpg'
import avatar6 from './../assets/images/avatars/6.jpg'
const tableExample = [
    {
      avatar: { src: avatar1, status: 'success' },
      user: {
        name: '101',
        new: true,
        registered: 'Jan 1, 2021',
        contact: '6662369211',
      },
      country: { name: 'USA', flag: cifUs },
      usage: {
        value: 50,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'success',
      },
      payment: { name: 'Mastercard', icon: cibCcMastercard },
      activity: '10 sec ago',
    },
    {
      avatar: { src: avatar2, status: 'danger' },
      user: {
        name: '403',
        new: false,
        registered: 'Jan 1, 2021',
        contact: '6662369211',
      },
      country: { name: 'Brazil', flag: cifBr },
      usage: {
        value: 22,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'info',
      },
      payment: { name: 'Visa', icon: cibCcVisa },
      activity: '5 minutes ago',
    },
    {
      avatar: { src: avatar3, status: 'warning' },
      user: { name: '501', new: true, registered: 'Jan 1, 2021', contact: '6662369211' },
      country: { name: 'India', flag: cifIn },
      usage: {
        value: 74,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'warning',
      },
      payment: { name: 'Stripe', icon: cibCcStripe },
      activity: '1 hour ago',
    },
    {
      avatar: { src: avatar4, status: 'secondary' },
      user: { name: 'Enéas Kwadwo', new: true, registered: 'Jan 1, 2021', contact: '6662369211' },
      country: { name: 'France', flag: cifFr },
      usage: {
        value: 98,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'danger',
      },
      payment: { name: 'PayPal', icon: cibCcPaypal },
      activity: 'Last month',
    },
    {
      avatar: { src: avatar5, status: 'success' },
      user: {
        name: 'Agapetus Tadeáš',
        new: true,
        registered: 'Jan 1, 2021',
        contact: '6662369211',
      },
      country: { name: 'Spain', flag: cifEs },
      usage: {
        value: 22,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'primary',
      },
      payment: { name: 'Google Wallet', icon: cibCcApplePay },
      activity: 'Last week',
    },
    {
      avatar: { src: avatar6, status: 'danger' },
      user: {
        name: 'Friderik Dávid',
        new: true,
        registered: 'Jan 1, 2021',
        contact: '6662369211',
      },
      country: { name: 'Poland', flag: cifPl },
      usage: {
        value: 43,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'success',
      },
      payment: { name: 'Amex', icon: cibCcAmex },
      activity: 'Last week',
    },
  ]
const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [statusValues, setStatusValues] = useState([]);
    const {user, token} = isAuthenricated();
    const loadOrders = () => {
        listOrders(user._id, token)
        .then(data => {
            if(data.error) {
                console.log(data.errors);
            } else {
                setOrders(data);
            }
        });
    };
    const loadStatusValues = () => {
        getStatusValues(user._id, token)
        .then(data => {
            if(data.error) {
                console.log(data.errors);
            } else {
                setStatusValues(data);
            }
        });
    };
    useEffect(() => {
        loadOrders();
        loadStatusValues();
    },[]);
    const showOrdersLength = () => {
        if(orders.length > 0) {
            return(
                <h1 className="text-danger display-2">Total Orders: {orders.length}</h1>            );
        } else {
            return(
                <h1 className="text-danger">No Orders</h1>            );
        }
    };
    const showInput =(key, value) => {
        return(
            <div className="input-group mb-2 mr-sm-2">                <div className="input-group-prepend">                    <div className="input-group-text">{key}</div>                </div>                <input text="text" value={value} className="form-control" readOnly/>            </div>        );
    };
    const handleStatusChange = (e, orderId) => {
        updateOrderStatus(user._id, token, orderId, e.target.value)
        .then(data => {
            if(data.error) {
                console.log('Status Update Failed');
            } else {
                loadOrders();
            }
        });
    };
    const showStatus = (o) => {
        return(
            <div className="form-group">                <h3 className="mark mb-4">Status: {o.status}</h3>                <select className="form-control" onChange={(e) => handleStatusChange(e, o._id)}>                    <option>Update Status</option>                    {statusValues.map((status, i) => (
                        <option key={i} value={status}>{status}</option>                    ))}
                </select>            </div>        );
    };
        return (<CRow>                        <CCol xs>                          <CCard className="mb-4">                            <CCardHeader>Roomwise Services Denied</CCardHeader>                            <CCardBody>                              <CTable align="middle" className="mb-0 border" hover responsive>                                <CTableHead color="light">                                  <CTableRow>                                    <CTableHeaderCell>Room Number</CTableHeaderCell>                                    <CTableHeaderCell>Reservation Period</CTableHeaderCell>                                    <CTableHeaderCell>Contact No.</CTableHeaderCell>                                    <CTableHeaderCell className="text-center">                                      <CIcon icon={cilBed} />                                    </CTableHeaderCell>                                    <CTableHeaderCell className="text-center">                                      <CIcon icon={cilCoffee} />                                    </CTableHeaderCell>                                    <CTableHeaderCell className="text-center">                                      <CIcon icon={cilDinner} />                                    </CTableHeaderCell>                                    <CTableHeaderCell className="text-center">                                      <CIcon icon={cilCarAlt} />                                    </CTableHeaderCell>                                  </CTableRow>                                </CTableHead>                                <CTableBody>                                  {tableExample.map((item, index) => (
                                    <CTableRow v-for="item in tableItems" key={index}>                                      <CTableDataCell>                                        <div>{item.user.name}</div>                                        <div className="small text-medium-emphasis">                                          <span>{item.user.new ? 'Suite' : 'Single'}</span> | Registered:{' '}
                                          {item.user.registered}
                                        </div>                                      </CTableDataCell>                                      <CTableDataCell>                                        <div className="clearfix">                                          <div className="float-start">                                            <strong>{item.usage.value}%</strong>                                          </div>                                          <div className="float-end">                                            <small className="text-medium-emphasis">{item.usage.period}</small>                                          </div>                                        </div>                                        <CProgress thin color={item.usage.color} value={item.usage.value} />                                      </CTableDataCell>                                      <CTableDataCell className="text-center">                                        <div>{item.user.contact}</div>                                      </CTableDataCell>                                      <CTableDataCell className="text-center">                                        <CIcon size="md" icon={cilBed} status={item.avatar.status} />                                      </CTableDataCell>                                      <CTableDataCell className="text-center">                                        <CIcon size="md" icon={cilCoffee} status={item.avatar.status} />                                      </CTableDataCell>                                      <CTableDataCell className="text-center">                                        <CIcon size="md" icon={cilDinner} status={item.avatar.status} />                                      </CTableDataCell>                                         <CTableDataCell className="text-center">                      <CIcon size="md" icon={cilCarAlt} status={item.avatar.status} />                   </CTableDataCell>                                    </CTableRow>                                  ))}
                                </CTableBody>                              </CTable>                            </CCardBody>                          </CCard>                        </CCol>                      </CRow>)
}
export default Orders;