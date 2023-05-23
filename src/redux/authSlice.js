import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import {
    API_LOGIN, API_REGISTER, API_SERVICE, API_ACCOUNT, API_DOCTORS,
    API_PATIENTS, API_SERVICE_DETAIL, API_BILLS, API_PATIENTS_SERVICE,
    API_ADDRESS, API_DASHBOARD, API_TOUR, API_BLOG, API_USER, API_ROLE, API_HOTEL, API_HOTEL_IMGS,
     API_TOUR_IMGS, API_HISTORY_TOUR, API_CONTACT ,API_COMMENT , API_BLOG_IMGS
} from '../api'



export const FetchLogin = createAsyncThunk('fetch/login', async (payload) => {
    const response = await axios.post(API_LOGIN, {
        "username": payload.username,
        "password": payload.password,
        "grant_type": "password",
        "client_id": "EPS",
        "client_secret": "b0udcdl8k80cqiyt63uq"
    }, {
        headers: {
        }
    })
    console.log("respone", response)
    return response.data
})
export const FetchRegister = createAsyncThunk('fetch/register', async (payload) => {
    const response = await axios.post(API_REGISTER, {
        "username": payload.username,
        "email": payload.email,
        "password": payload.password
    }, {
        headers: {
        }
    })
    console.log("respone", response)
    return response.data
})
export const FetchDataService = createAsyncThunk('fetch/service', async (payload) => {
    const response = await axios.get(API_SERVICE + '/getall', {
        headers: {
            "Content-Type": "application/json",
            "x_authorization": payload
        }
    })
    console.log("respone", response)
    return response.data
})
export const FetchDataServiceDetail = createAsyncThunk('fetch/service', async (payload) => {
    const response = await axios.get(API_SERVICE + `/getbyid/${payload.url}`, {
        headers: {
            "Content-Type": "application/json",
            "x_authorization": payload.token
        }
    })
    console.log("respone", response)
    return response.data
})
export const AddService = createAsyncThunk('update/detail', async (payload) => {
    const response = await axios.post(API_SERVICE, {
        "name": payload.value
    }, {
        headers: {
            "Content-Type": "application/json",
            "x_authorization": payload.token
        }
    })
    console.log("respone", response)
    return response.data
})
export const UpdateOneServiceDetail = createAsyncThunk('update/detail', async (payload) => {
    const response = await axios.put(API_SERVICE + `/${payload.url}`, {
        "name": payload.value
    }, {
        headers: {
            "Content-Type": "application/json",
            "x_authorization": payload.token
        }
    })
    console.log("respone", response)
    return response.data
})
export const DeleteService = createAsyncThunk('update/detail', async (payload) => {
    const response = await axios.delete(API_SERVICE + `/${payload.url}`, {
        headers: {
            "Content-Type": "application/json",
            "x_authorization": payload.token
        }
    })
    console.log("respone", response)
    return response.data
})
//  account =======================================================================
export const GetAccount = createAsyncThunk('get/account', async (payload) => {
    const response = await axios.get(API_ACCOUNT + '/getall', {
        headers: {
            "Content-Type": "application/json",
            "x_authorization": payload
        }
    })
    console.log("respone", response)
    return response.data
})
export const AddAcoust = createAsyncThunk('add/account', async (payload) => {
    const response = await axios.post(API_ACCOUNT, {
        "username": payload.username,
        "password": payload.password,
        "email": payload.email
    }, {
        headers: {
            "Content-Type": "application/json",
            "x_authorization": payload.token
        }
    })
    console.log("respone", response)
    return response.data
})
export const DeleteAccount = createAsyncThunk('delete/account', async (payload) => {
    const response = await axios.delete(API_ACCOUNT + `/${payload.url}`, {
        headers: {
            "Content-Type": "application/json",
            "x_authorization": payload.token
        }
    })
    console.log("respone", response)
    return response.data
})
export const GetOneAccount = createAsyncThunk('get/one/detail', async (payload) => {
    const response = await axios.get(API_ACCOUNT + `/getbyid/${payload.url}`, {
        headers: {
            "Content-Type": "application/json",
            "x_authorization": payload.token
        }
    })
    console.log("respone", response)
    return response.data
})
export const UpdateOneAccount = createAsyncThunk('update/one/detail', async (payload) => {
    const response = await axios.put(API_ACCOUNT + `/${payload.url}`, {
        "username": payload.username,
        "email": payload.email,
        "password": payload.password
    }, {
        headers: {
            "Content-Type": "application/json",
            "x_authorization": payload.token
        }
    })
    console.log("respone", response)
    return response.data
})
//  docctor ========================================================================================
export const GetDoctors = createAsyncThunk('get/doctors', async (payload) => {
    const response = await axios.get(API_DOCTORS + '/getall', {
        headers: {
            "Content-Type": "application/json",
            "x_authorization": payload
        }
    })
    console.log("respone", response)
    return response.data
})
export const AddDoctor = createAsyncThunk('add/doctor', async (payload) => {
    const response = await axios.post(API_DOCTORS, {
        "fullname": payload.fullname,
        "email": payload.email,
        "address": payload.address,
        "phone": payload.phone,
        "position": payload.position,
        "gender": +payload.gender,
        "major": payload.major,
    }, {
        headers: {
            "Content-Type": "application/json",
            "x_authorization": payload.token
        }
    })
    console.log("respone", response)
    return response.data
})
export const DeleteDoctor = createAsyncThunk('delete/doctor', async (payload) => {
    const response = await axios.delete(API_DOCTORS + `/${payload.url}`, {
        headers: {
            "Content-Type": "application/json",
            "x_authorization": payload.token
        }
    })
    console.log("respone", response)
    return response.data
})
export const GetOneDoctor = createAsyncThunk('get/one/detail', async (payload) => {
    const response = await axios.get(API_DOCTORS + `/getbyid/${payload.url}`, {
        headers: {
            "Content-Type": "application/json",
            "x_authorization": payload.token
        }
    })
    console.log("respone", response)
    return response.data
})
export const UpdateOneDoctor = createAsyncThunk('update/one/detail', async (payload) => {
    const response = await axios.put(API_DOCTORS + `/${payload.url}`, {
        "fullname": payload.fullname,
        "email": payload.email,
        "address": payload.address,
        "phone": payload.phone,
        "position": payload.position
    }, {
        headers: {
            "Content-Type": "application/json",
            "x_authorization": payload.token
        }
    })
    console.log("respone", response)
    return response.data
})
//  patients ========================================================================================
export const GetPatients = createAsyncThunk('get/patients', async (payload) => {
    const response = await axios.get(API_PATIENTS + '/getall', {
        headers: {
            "Content-Type": "application/json",
            "x_authorization": payload
        }
    })
    console.log("respone", response)
    return response.data
})
export const AddPatients = createAsyncThunk('add/patients', async (payload) => {
    const response = await axios.post(API_PATIENTS, {
        "fullname": payload.fullname,
        "email": payload.email,
        "address": payload.address,
        "phone": payload.phone,
        "gender": +payload.gender
    }, {
        headers: {
            "Content-Type": "application/json",
            "x_authorization": payload.token
        }
    })
    console.log("respone", response)
    return response.data
})
export const DeletePatients = createAsyncThunk('delete/patients', async (payload) => {
    const response = await axios.delete(API_PATIENTS + `/${payload.url}`, {
        headers: {
            "Content-Type": "application/json",
            "x_authorization": payload.token
        }
    })
    console.log("respone", response)
    return response.data
})
export const GetOnePatients = createAsyncThunk('get/one/detail', async (payload) => {
    const response = await axios.get(API_PATIENTS + `/getbyid/${payload.url}`, {
        headers: {
            "Content-Type": "application/json",
            "x_authorization": payload.token
        }
    })
    console.log("respone", response)
    return response.data
})
export const UpdateOnePatients = createAsyncThunk('update/one/detail', async (payload) => {
    const response = await axios.put(API_PATIENTS + `/${payload.url}`, {
        "fullname": payload.fullname,
        "email": payload.email,
        "address": payload.address,
        "phone": payload.phone,
        "gender": payload.gender
    }, {
        headers: {
            "Content-Type": "application/json",
            "x_authorization": payload.token
        }
    })
    console.log("respone", response)
    return response.data
})
// servicer ====================================
export const FetchService = createAsyncThunk('fetch/service', async (payload) => {
    const response = await axios.get(API_SERVICE_DETAIL + '/getall', {
        headers: {
            "Content-Type": "application/json",
            "x_authorization": payload
        }
    })
    console.log("respone", response)
    return response.data
})
export const FetchServiceId = createAsyncThunk('fetch/service', async (payload) => {
    const response = await axios.get(API_SERVICE_DETAIL + `/${payload.url}`, {
        headers: {
            "Content-Type": "application/json",
            "x_authorization": payload.token
        }
    })
    console.log("respone", response)
    return response.data
})
// export const UpdateOneServiceDetails = createAsyncThunk('fetch/service', async (payload) => {
//     const response = await axios.put(API_SERVICE_DETAIL + `/${payload.url}`, {
//         "servicieid ": "642828b2fa87e5b20053d694",
//         "patientid": "64279b840a0903fda7098db0"
//     }, {
//         headers: {
//             "Content-Type": "application/json",
//             "x_authorization": payload.token
//         }
//     })
//     console.log("respone", response)
//     return response.data
// })
export const AddPatientService = createAsyncThunk('fetch/service', async (payload) => {
    const response = await axios.post(API_PATIENTS_SERVICE, {
        "serviceid": payload.url,
        "patientid": payload.idUser
    }, {
        headers: {
            "Content-Type": "application/json",
            "x_authorization": payload.token
        }
    })
    console.log("respone", response)
    return response.data
})
// bills ================================================================
export const FetchBills = createAsyncThunk('fetch/service', async (payload) => {
    const response = await axios.get(API_BILLS + '/getall', {
        headers: {
            "Content-Type": "application/json",
            "x_authorization": payload
        }
    })
    console.log("respone", response)
    return response.data
})
export const FetchGetbillbypatientid = createAsyncThunk('fetch/service', async (payload) => {
    const response = await axios.get(API_BILLS + '/getbillbypatientid' + `/${payload}`, {
        headers: {
            "Content-Type": "application/json",
            "x_authorization": payload
        }
    })
    console.log("respone", response)
    return response.data
})
export const FetchTotalrevenue = createAsyncThunk('fetch/service', async (payload) => {
    const response = await axios.get(API_BILLS + '/totalrevenue', {
        headers: {
            "Content-Type": "application/json",
            "x_authorization": payload
        }
    })
    console.log("respone", response)
    return response.data
})
export const FetchBillsbyId = createAsyncThunk('fetch/service', async (payload) => {
    const response = await axios.get(API_BILLS + `/getbyid/${payload.url}`, {
        headers: {
            "Content-Type": "application/json",
            "x_authorization": payload.token
        }
    })
    console.log("respone", response)
    return response.data
})
export const AddBills = createAsyncThunk('fetch/service', async (payload) => {
    const response = await axios.post(API_BILLS, {
        "name": payload.name,
        "description": payload.description,
        "totalprice": payload.totalprice,
        patientid: payload.patient,
        doctorid: payload.doctor
    }, {
        headers: {
            "Content-Type": "application/json",
            "x_authorization": payload.token
        }
    })
    console.log("respone", response)
    return response.data
})
export const DeleteBills = createAsyncThunk('delete/patients', async (payload) => {
    const response = await axios.delete(API_BILLS + `/${payload.url}`, {
        headers: {
            "Content-Type": "application/json",
            "x_authorization": payload.token
        }
    })
    console.log("respone", response)
    return response.data
})
export const ExportBills = createAsyncThunk('delete/patients', async (payload) => {
    console.log("payload", payload.token);
    const url = API_BILLS + `/exportexcel`
    const data = {
        "fromDate": payload.date.todate,
        "toDate": payload.date.fromdate
    }
    const response = await axios.post(url, data, {
        headers: {
            "Content-Type": "application/json",
            x_authorization: payload.token
        },
        responseType: 'blob',
    });
    // const response = await axios({
    //     url,
    //     method: 'GET',
    //     responseType: 'blob',
    //     data,
    //     headers: {
    //         "Content-Type": "application/json",
    //         x_authorization: payload.token
    //     }


    // });
    console.log("respone", response)
    return response.data
})
// ================================================
export const FetchPamacy = createAsyncThunk('fetch/service', async (payload) => {
    const response = await axios.get(API_PATIENTS_SERVICE + `/getpatientservice/${payload.url}`, {
        headers: {
            "Content-Type": "application/json",
            "x_authorization": payload.token
        }
    })
    console.log("respone", response)
    return response.data
})

// =============================================== địa điểm du lịch
export const GetAddress = createAsyncThunk('get/address', async (payload) => {
    const response = await axios.get(API_ADDRESS, {
        headers: {
            'Content-Type': 'multipart/form-data',
            "Authorization": `Bearer ${payload.token}`
        }
    })
    console.log("respone", response)
    return response.data
})
export const DeleteAddress = createAsyncThunk('get/address', async (payload) => {
    const response = await axios.delete(API_ADDRESS + `/${payload.id}`, {
        headers: {
            'Content-Type': 'multipart/form-data',
            "Authorization": `Bearer ${payload.token}`
        }
    })
    console.log("respone", response)
    return response.data
})
export const PostAddress = createAsyncThunk('get/address', async (payload) => {
    const formData = new FormData();
    formData.append('name', payload.name);
    formData.append('url', payload.url);
    const response = await axios.post(API_ADDRESS, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            "Authorization": `Bearer ${payload.token}`
        }
    })
    console.log("respone", response)
    return response.data
})
export const GetAddressById = createAsyncThunk('get/address/id', async (payload) => {

    const response = await axios.get(API_ADDRESS + `/getbyid/${payload.id}`, {
        headers: {
            'Content-Type': 'multipart/form-data',
            "Authorization": `Bearer ${payload.token}`
        }
    })
    console.log("respone", response)
    return response.data
})
export const PutAddress = createAsyncThunk('get/address/id', async (payload) => {
    const formData = new FormData();
    formData.append('name', payload.name);
    formData.append('url', payload.url);
    const response = await axios.put(API_ADDRESS + `/${payload.id}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            "Authorization": `Bearer ${payload.token}`
        }
    })
    console.log("respone", response)
    return response.data
})
// ======================= dashboard
export const GetDashboard = createAsyncThunk('get/dashboard', async (payload) => {
    const response = await axios.get(API_DASHBOARD, {
        headers: {
            'Content-Type': 'multipart/form-data',
            "Authorization": `Bearer ${payload.token}`
        }
    })
    console.log("respone", response)
    return response.data
})
// ======================= TOUR 
export const Gettour = createAsyncThunk('get/dashboard', async (payload) => {
    const response = await axios.get(API_TOUR + '?ItemsPerPage=100', {
        headers: {
            'Content-Type': 'multipart/form-data',
            "Authorization": `Bearer ${payload.token}`
        }
    })
    console.log("respone", response)
    return response.data
})
export const GetAddTourID = createAsyncThunk('get/tour/id', async (payload) => {

    const response = await axios.get(API_TOUR + `/getbyid/${payload.id}`, {
        headers: {
            'Content-Type': 'multipart/form-data',
            "Authorization": `Bearer ${payload.token}`
        }
    })
    console.log("respone", response)
    return response.data
})
export const GetCmtTour = createAsyncThunk('get/tour/id', async (payload) => {

    const response = await axios.get(API_COMMENT + `${payload.id}`, {
        headers: {
            'Content-Type': 'multipart/form-data',
            "Authorization": `Bearer ${payload.token}`
        }
    })
    console.log("respone", response)
    return response.data
})
export const PutTours = createAsyncThunk('put/tours', async (payload) => {
    const formData = new FormData();
    formData.append('category_id', payload.category_id);
    formData.append('name', payload.name);
    formData.append('url', payload.url);
    formData.append('price', payload.price);
    formData.append('infor', payload.infor);
    formData.append('intro', payload.intro);
    formData.append('file', payload.file);
    formData.append('schedule', payload.schedule);
    formData.append('policy', payload.policy);
    formData.append('note', payload.note);
    formData.append('isurance', payload.isurance);
    formData.append('tour_guide', payload.tour_guide);
    const response = await axios.put(API_TOUR + `/${payload.id}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            "Authorization": `Bearer ${payload.token}`
        }
    })
    console.log("respone", response)
    return response.data
})
export const PostTours = createAsyncThunk('post/tours', async (payload) => {
    const formData = new FormData();
    formData.append('category_id', payload.category_id);
    formData.append('name', payload.name);
    formData.append('url', payload.url);
    formData.append('price', payload.price);
    formData.append('infor', payload.infor);
    formData.append('intro', payload.intro);
    formData.append('file', payload.file);
    formData.append('schedule', payload.schedule);
    formData.append('policy', payload.policy);
    formData.append('note', payload.note);
    formData.append('isurance', payload.isurance);
    formData.append('tour_guide', payload.tour_guide);
    const response = await axios.post(API_TOUR, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            "Authorization": `Bearer ${payload.token}`
        }
    })
    console.log("respone", response)
    return response.data
})
export const PostTourImg = createAsyncThunk('post/tours', async (payload) => {
    const arr = []
    arr.push(payload.RoleIds)
    const formData = new FormData();
    formData.append('type_id', payload.id);
    formData.append('img_src', payload.img_src);
    formData.append('type', payload.type);
    const response = await axios.post(API_TOUR_IMGS, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            "Authorization": `Bearer ${payload.token}`
        }
    })
    console.log("respone", response)
    return response.data
})
export const DeleteTour = createAsyncThunk('delete/tour', async (payload) => {
    const response = await axios.delete(API_TOUR + `/${payload.id}`, {
        headers: {
            'Content-Type': 'multipart/form-data',
            "Authorization": `Bearer ${payload.token}`
        }
    })
    console.log("respone", response)
    return response.data
})
// ======================= Blog
export const Getblog = createAsyncThunk('get/blog', async (payload) => {
    const response = await axios.get(API_BLOG, {
        headers: {
            'Content-Type': 'multipart/form-data',
            "Authorization": `Bearer ${payload.token}`
        }
    })
    console.log("respone", response)
    return response.data
})
export const GetBlogById = createAsyncThunk('get/blog/id', async (payload) => {

    const response = await axios.get(API_BLOG + `/getbyid/${payload.id}`, {
        headers: {
            'Content-Type': 'multipart/form-data',
            "Authorization": `Bearer ${payload.token}`
        }
    })
    console.log("respone", response)
    return response.data
})
export const DeleteBlog = createAsyncThunk('get/blog', async (payload) => {
    const response = await axios.delete(API_BLOG + `/${payload.id}`, {
        headers: {
            'Content-Type': 'multipart/form-data',
            "Authorization": `Bearer ${payload.token}`
        }
    })
    console.log("respone", response)
    return response.data
})
export const PostBlog = createAsyncThunk('post/tours', async (payload) => {

    const formData = new FormData();
    formData.append('title', payload.title);
    formData.append('img_src', payload.img_src);
    formData.append('contents', payload.contents);
    const response = await axios.post(API_BLOG, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            "Authorization": `Bearer ${payload.token}`
        }
    })
    console.log("respone", response)
    return response.data
})
export const PutBlog = createAsyncThunk('post/tours', async (payload) => {

    const formData = new FormData();
    formData.append('title', payload.title);
    formData.append('img_src', payload.img_src);
    formData.append('contents', payload.contents);
    const response = await axios.put(API_BLOG+`/${payload.id}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            "Authorization": `Bearer ${payload.token}`
        }
    })
    console.log("respone", response)
    return response.data
})
export const PostBlogImg = createAsyncThunk('post/tours', async (payload) => {
    const arr = []
    arr.push(payload.RoleIds)
    const formData = new FormData();
    formData.append('type_id', payload.id);
    formData.append('img_src', payload.img_src);
    formData.append('type', payload.type);
    const response = await axios.post(API_BLOG_IMGS, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            "Authorization": `Bearer ${payload.token}`
        }
    })
    console.log("respone", response)
    return response.data
})
// =============================== user 
export const GetUser = createAsyncThunk('get/user', async (payload) => {
    const response = await axios.get(API_USER, {
        headers: {
            'Content-Type': 'multipart/form-data',
            "Authorization": `Bearer ${payload.token}`
        }
    })
    console.log("respone", response)
    return response.data
})
export const GetRole = createAsyncThunk('get/user', async (payload) => {
    const response = await axios.get(API_ROLE, {
        headers: {
            'Content-Type': 'multipart/form-data',
            "Authorization": `Bearer ${payload.token}`
        }
    })
    console.log("respone", response)
    return response.data
})
export const GetUserById = createAsyncThunk('get/user/id', async (payload) => {

    const response = await axios.get(API_USER + `/${payload.id}`, {
        headers: {
            'Content-Type': 'multipart/form-data',
            "Authorization": `Bearer ${payload.token}`
        }
    })
    console.log("respone", response)
    return response.data
})
export const DeleteUser = createAsyncThunk('delete/user', async (payload) => {
    const response = await axios.delete(API_USER + `/${payload.id}`, {
        headers: {
            'Content-Type': 'multipart/form-data',
            "Authorization": `Bearer ${payload.token}`
        }
    })
    console.log("respone", response)
    return response.data
})
export const PutUser = createAsyncThunk('put/tours', async (payload) => {
    // const arr = []
    // arr.push(payload.RoleIds)
    const formData = new FormData();
    formData.append('Username', payload.Username);
    formData.append('Password', payload.Password);
    formData.append('FullName', payload.FullName);
    formData.append('Email', payload.Email);
    formData.append('PhoneNumber', payload.PhoneNumber);
    formData.append('backgroundImage', payload.backgroundImage);
    formData.append('Address', payload.Address);
    formData.append('RoleIds', JSON.stringify(payload.RoleIds));
    const response = await axios.put(API_USER + `/${payload.id}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            "Authorization": `Bearer ${payload.token}`
        }
    })
    console.log("respone", response)
    return response.data
})
export const PostUser = createAsyncThunk('post/tours', async (payload) => {
    const arr = []
    arr.push(payload.RoleIds)
    const formData = new FormData();
    formData.append('Username', payload.Username);
    formData.append('Password', payload.Password);
    formData.append('FullName', payload.FullName);
    formData.append('Email', payload.Email);
    formData.append('PhoneNumber', payload.PhoneNumber);
    formData.append('backgroundImage', payload.backgroundImage);
    formData.append('Address', payload.Address);
    formData.append('RoleIds', JSON.stringify(arr));
    const response = await axios.post(API_USER, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            "Authorization": `Bearer ${payload.token}`
        }
    })
    console.log("respone", response)
    return response.data
})
// =============================== hotel 
export const GetHotel = createAsyncThunk('get/hotel', async (payload) => {
    const response = await axios.get(API_HOTEL + '?ItemsPerPage=100', {
        headers: {
            'Content-Type': 'multipart/form-data',
            "Authorization": `Bearer ${payload.token}`
        }
    })
    console.log("respone", response)
    return response.data
})
export const GetHotelById = createAsyncThunk('get/user/id', async (payload) => {

    const response = await axios.get(API_HOTEL + `/getbyid/${payload.id}`, {
        headers: {
            'Content-Type': 'multipart/form-data',
            "Authorization": `Bearer ${payload.token}`
        }
    })
    console.log("respone", response)
    return response.data
})
export const DeleteHotel = createAsyncThunk('delete/user', async (payload) => {
    const response = await axios.delete(API_HOTEL + `/${payload.id}`, {
        headers: {
            'Content-Type': 'multipart/form-data',
            "Authorization": `Bearer ${payload.token}`
        }
    })
    console.log("respone", response)
    return response.data
})
export const PutHotel = createAsyncThunk('put/tours', async (payload) => {
    // const arr = []
    // arr.push(payload.RoleIds)
    const formData = new FormData();
    formData.append('category_id', payload.category_id);
    formData.append('name', payload.name);
    formData.append('background_image', payload.background_image);
    const response = await axios.put(API_HOTEL + `/${payload.id}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            "Authorization": `Bearer ${payload.token}`
        }
    })
    console.log("respone", response)
    return response.data
})
export const PostHotel = createAsyncThunk('post/tours', async (payload) => {
    const arr = []
    arr.push(payload.RoleIds)
    const formData = new FormData();
    formData.append('category_id', payload.category_id);
    formData.append('name', payload.name);
    formData.append('background_image', payload.background_image);
    const response = await axios.post(API_HOTEL, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            "Authorization": `Bearer ${payload.token}`
        }
    })
    console.log("respone", response)
    return response.data
})
export const PostHotelImg = createAsyncThunk('post/tours', async (payload) => {
    const arr = []
    arr.push(payload.RoleIds)
    const formData = new FormData();
    formData.append('type_id', payload.id);
    formData.append('img_src', payload.img_src);
    formData.append('type', payload.type);
    const response = await axios.post(API_HOTEL_IMGS, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            "Authorization": `Bearer ${payload.token}`
        }
    })
    console.log("respone", response)
    return response.data
})
// ==========================================
export const GetHistory = createAsyncThunk('get/hotel', async (payload) => {
    const response = await axios.get(API_HISTORY_TOUR + '?ItemsPerPage=100', {
        headers: {
            'Content-Type': 'multipart/form-data',
            "Authorization": `Bearer ${payload.token}`
        }
    })
    console.log("respone", response)
    return response.data
})
export const DeleteHistory  = createAsyncThunk('delete/user', async (payload) => {
    const response = await axios.delete(API_HISTORY_TOUR + `/${payload.id}`, {
        headers: {
            'Content-Type': 'multipart/form-data',
            "Authorization": `Bearer ${payload.token}`
        }
    })
    console.log("respone", response)
    return response.data
})
// ===========================================================concact
export const GetContact = createAsyncThunk('get/hotel', async (payload) => {
    const response = await axios.get(API_CONTACT + '?ItemsPerPage=100', {
        headers: {
            'Content-Type': 'multipart/form-data',
            "Authorization": `Bearer ${payload.token}`
        }
    })
    console.log("respone", response)
    return response.data
})
export const GetContactById = createAsyncThunk('get/user/id', async (payload) => {

    const response = await axios.get(API_CONTACT + `/getbyid/${payload.id}`, {
        headers: {
            'Content-Type': 'multipart/form-data',
            "Authorization": `Bearer ${payload.token}`
        }
    })
    console.log("respone", response)
    return response.data
})
export const PutContact = createAsyncThunk('put/tours', async (payload) => {
    const formData = new FormData();
    formData.append('name_register', payload.name_register);
    formData.append('address_register', payload.address_register);
    formData.append('email_register', payload.email_register);
    formData.append('phone_register', payload.phone_register);
    const response = await axios.put(API_CONTACT + `/${payload.id}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            "Authorization": `Bearer ${payload.token}`
        }
    })
    console.log("respone", response)
    return response.data
})
export const PostContact  = createAsyncThunk('post/tours', async (payload) => {
    const arr = []
    arr.push(payload.RoleIds)
    const formData = new FormData();
    formData.append('name_register', payload.name_register);
    formData.append('address_register', payload.address_register);
    formData.append('email_register', payload.email_register);
    formData.append('phone_register', payload.phone_register);
    const response = await axios.post(API_CONTACT, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            "Authorization": `Bearer ${payload.token}`
        }
    })
    console.log("respone", response)
    return response.data
})
export const DeleteContact = createAsyncThunk('delete/user', async (payload) => {
    const response = await axios.delete(API_CONTACT + `/${payload.id}`, {
        headers: {
            'Content-Type': 'multipart/form-data',
            "Authorization": `Bearer ${payload.token}`
        }
    })
    console.log("respone", response)
    return response.data
})
const authSlice = createSlice({
    name: 'auth',
    initialState: {
        data: [],
        service: [],
        idUser: {}
    },
    reducers: {
        getservice: (state, action) => {
            state.service = action.payload
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(FetchLogin.fulfilled, (state, action) => {
                state.data = action.payload
            })
    }
})

const { actions, reducer } = authSlice
export const { getservice } = actions
export default reducer