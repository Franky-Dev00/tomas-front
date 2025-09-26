import OrdersAdmin from "./orders-admin";
import OrdersUser from "./orders-user";

export default function Orders() {
  return (
    <main>
      <h1> order list </h1>
      <OrdersAdmin />
      <OrdersUser />
    </main>
  )
}
