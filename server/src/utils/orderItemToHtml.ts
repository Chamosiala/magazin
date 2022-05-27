import { Product } from "../entities/Product";
import { OrderItem } from "../entities/OrderItem";

export async function orderItemToHtml(orderItem: OrderItem) {
  const product = await Product.findOneBy({ id: orderItem.productId });
  return `
    <tr>
      <td style="border-bottom:1px solid #ddd;color:#555;">
        <b>${product!.name}</b>					
      </td>
      <td style="border-bottom:1px solid #ddd;color:#555;" nowrap align="right">${
        product!.price
      } RON</td>
      <td style="border-bottom:1px solid #ddd;color:#555;" align="center">${
        orderItem.quantity
      }</td>
      <td style="border-bottom:1px solid #ddd;color:#555;" nowrap align="right">${
        product!.price * orderItem.quantity
      } RON</td>
    </tr>
  `;
}
