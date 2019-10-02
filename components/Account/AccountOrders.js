import { useRouter } from "next/router";
import {
  Header,
  Accordion,
  Label,
  Segment,
  Icon,
  Button,
  List,
  Image
} from "semantic-ui-react";
import formatDate from "../../utils/formatDate";

function AccountOrders({ orders }) {
  const router = useRouter();

  function mapOrdersToPanels(orders) {
    return orders.map(order => ({
      key: order._id,
      title: {
        content: <Label color="blue" content={formatDate(order.createdAt)} />
      },
      content: {
        content: (
          <>
            <List.Header as="h3">
              Total: ${order.total}
              <Label
                content={order.email}
                icon="mail"
                basic
                horizontal
                style={{ marginLeft: "1em" }}
              />
            </List.Header>
            <List>
              {order.products.map(item => (
                <List.Item key={item.product._id}>
                  <Image avatar src={item.product.mediaUrl} />
                  <List.Content>
                    <List.Header>{item.product.name}</List.Header>
                    <List.Description>
                      {item.quantity} | {item.product.price}
                    </List.Description>
                  </List.Content>
                  <List.Content floated="right">
                    <Label tag color="red" size="tiny">
                      {item.product.sku}
                    </Label>
                  </List.Content>
                </List.Item>
              ))}
            </List>
          </>
        )
      }
    }));
  }

  return (
    <>
      <Header as="h2">
        <Icon name="folder open" />
        Order History
      </Header>
      {orders.length === 0 ? (
        <Segment inverted tertiary color="grey" textAlign="center">
          <Header icon>
            <Icon name="copy outline" />
            No past orders.
          </Header>
          <div>
            <Button color="orange" onClick={() => router.push("/")}>
              View Products
            </Button>
          </div>
        </Segment>
      ) : (
        <Accordion
          fluid
          styled
          exclusive={false}
          panels={mapOrdersToPanels(orders)}
        />
      )}
    </>
  );
}

export default AccountOrders;
