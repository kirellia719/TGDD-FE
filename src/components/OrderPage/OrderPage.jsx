import "./OrderPage.scss";
import OrderList from "../OrderList/OrderList";
import { showPrice } from "../../common/common";

const OrderPage = () => {

    return (
        <div className="OrderPage">
            <h1>Danh sách đơn hàng</h1>
            <OrderList />
        </div>
    );
}

export default OrderPage;