import Pages from '../page/index'
const TRANG_CHU = "/"
const USER = "/user"
const TOUR = "/tour"
const ADDRESS = "/address"
const COMMENTS = "/comments"
const COMMENTS_INCOGNITO = "/incognito-comments"
const POSTS = "/posts"
const CONTACT = "/contact"
const HOTEL = "/hotels"




const RouterWeb = [
    { id: 1, path: TRANG_CHU, role: ['1', '2', '3'], component: <Pages.Homepage /> },
    {
        id: 2, path: USER, component: <Pages.TotalUser />,
        role: ['1', '2', '3'],
        child: [
            {
                path: '',
                component: <Pages.User />,
            },
            {
                path: ':id',
                component: <Pages.UserDetails />,
            },
        ],
    },
    {
        id: 3, path: TOUR, role: ['1', '2', '3'], component: <Pages.TotalTour />,
        child: [
            {
                path: '',
                component: <Pages.Tour />,
            },
            {
                path: ':id',
                component: <Pages.TourDetails />,
            },
        ],
    },
    {
        id: 4, path: ADDRESS, role: ['1', '2', '3'], component: <Pages.AddressTotal />,
        child: [
            {
                path: '',
                component: <Pages.Address />,
            },
            {
                path: ':id',
                component: <Pages.AddressDetails />,
            },
        ],
    },
    {
        id: 5, path: COMMENTS, role: ['1', '2', '3'], component: <Pages.Comments />,
    },
    {
        id: 6, path: COMMENTS_INCOGNITO, role: ['1', '2', '3'], component: <Pages.IncognitoCmt />,
    },
    {
        id: 7, path: POSTS, role: ['1', '2', '3'], component: <Pages.PostTotals />,child: [
            {
                path: '',
                component: <Pages.Posts />,
            },
            {
                path: ':id',
                component: <Pages.PostDetails />,
            },
        ],
    },
    {
        id: 8, path: CONTACT, role: ['1', '2', '3'], component: <Pages.ContactTotal />,child: [
            {
                path: '',
                component: <Pages.Contact />,
            },
            {
                path: ':id',
                component: <Pages.ContactDeatail />,
            },
        ],
    },
    {
        id: 9, path: HOTEL, role: ['1', '2', '3'], component: <Pages.HotelTotal />,child: [
            {
                path: '',
                component: <Pages.Hotel />,
            },
            {
                path: ':id',
                component: <Pages.HotelDetail />,
            },
        ],
    },
]

export default RouterWeb