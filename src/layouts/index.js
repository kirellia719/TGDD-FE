import Cart from "../components/Cart/Cart";
import Dashboard from "../components/Dashboard/Dashboard"; 
import OrderPage from "../components/OrderPage/OrderPage"; 
import Statistic from "../components/Statistic/Statistic";

export default [
    {
        icon: <i className='bx bx-home nav-icon'></i>,
        active: <i className='bx bxs-home nav-icon'></i>,
        path: '/*',
        to: '/',
        title: 'Sản phẩm',
        element: <Dashboard />
    },
    // {
    //     icon: <i className='bx bx-trending-down nav-icon'></i>,
    //     active: <i className='bx bx-line-chart-down nav-icon'></i>,
    //     path: '/voucher',
    //     to: '/voucher',
    //     title: 'Thẻ giảm giá',
    //     element: <div>Thẻ giảm giá</div>
    // },
    {
        icon: <i className='bx bx-cart nav-icon'></i>,
        active: <i className='bx bxs-cart nav-icon'></i>,
        path: '/cart',
        to: '/cart',
        title: 'Giỏ hàng',
        element: <Cart />
    },
    {
        icon: <i className='bx bx-note nav-icon'></i>,
        active: <i className='bx bxs-note nav-icon'></i>,
        path: '/order',
        to: '/order',
        title: 'Đơn hàng',
        element: <OrderPage />
    },
    {
        icon: <i className='bx bx-bar-chart-alt-2 nav-icon'></i>,
        active: <i className='bx bxs-bar-chart-alt-2 nav-icon'></i>,
        path: '/statistic',
        to: '/statistic',
        title: 'Thống kê',
        element: <Statistic/>
    },
]