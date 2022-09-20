import React, { Fragment } from "react";
import { TabBar, ProductCard, Button, Loader, useTitle } from "components";
import { useSelector } from "react-redux";
import { authSelector } from "features";
import {
  useGetProductsQuery,
  useSubscriptionMutation,
  useUnSubscriptionMutation,
} from "services";
import toast from "react-hot-toast";

const Products = () => {
  useTitle("Products");
  const auth = useSelector(authSelector);
  const {
    data = {},
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useGetProductsQuery(auth, {
    refetchOnMountOrArgChange: true,
  });

  const [subscription, { isLoading: subscribing }] = useSubscriptionMutation();
  const [unSubscription, { isLoading: unSubscribing }] =
    useUnSubscriptionMutation();

  const { subscribed = [], unsubscribed = [] } = data;

  async function handleSubscription(product) {
    const request = {
      uid: auth.uid,
      product,
    };
    try {
      await subscription(request).unwrap();
      toast.success(`Success, you have subscribed to ${product}`);
      refetch();
    } catch (error) {
      // we handle errors with middleware
    }
  }

  async function handleUnSubscription(product) {
    const request = {
      uid: auth.uid,
      product,
    };
    try {
      await unSubscription(request).unwrap();
      toast.success(`Success, you have been unsubscribed from ${product}`);
      refetch();
    } catch (error) {
      // we handle errors with middleware
    }
  }

  if (isLoading || isFetching || subscribing || unSubscribing) {
    return <Loader />;
  }

  if (isError) {
    return (
      <div className="max-w-screen-xl p-6 mx-auto prose">
        <h3>An error occured</h3>
        <p className="">
          Sorry, an error occured while loading products. If error persists,
          please contact support
        </p>
        <Button onClick={() => refetch()}>try again</Button>
      </div>
    );
  }

  return (
    <div className="flex-1 w-full text-gray-300">
      <TabBar title="Products" />
      <div className="max-w-full p-6 prose">
        <h2 className="text-gray-300">Featured Products</h2>
        <div className="grid grid-cols-12 gap-4">
          <Fragment>
            {unsubscribed.map((product) => (
              <ProductCard
                key={product.name}
                name={product.name}
                label={product.label}
                description={product.description}
                documentation={product.documentation}
                handleSubscription={handleSubscription}
                handleUnSubscription={handleUnSubscription}
              />
            ))}
            {subscribed.map((product) => (
              <ProductCard
                subscribed={true}
                key={product.name}
                name={product.name}
                label={product.label}
                description={product.description}
                documentation={product.documentation}
                handleSubscription={handleSubscription}
                handleUnSubscription={handleUnSubscription}
              />
            ))}
          </Fragment>
        </div>
      </div>
    </div>
  );
};

export default Products;
