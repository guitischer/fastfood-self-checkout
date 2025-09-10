import { notFound } from "next/navigation";

import { getRestaurantWithCategoriesBySlug } from "@/repositories/restaurant-repository";

import RestaurantCategories from "./components/menu-categories";
import RestaurantHeader from "./components/menu-header";

interface RestaurantMenuPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ orderType: string }>;
}

const isOrderTypeValid = (orderType: string) => {
  return ["DINE_IN", "TAKEAWAY"].includes(orderType.toUpperCase());
};

const RestaurantMenuPage = async ({
  params,
  searchParams,
}: RestaurantMenuPageProps) => {
  const { slug } = await params;
  const { orderType } = await searchParams;

  if (!isOrderTypeValid(orderType)) {
    return notFound();
  }

  const restaurant = await getRestaurantWithCategoriesBySlug(slug);

  if (!restaurant) {
    return notFound();
  }
  return (
    <div>
      <RestaurantHeader restaurant={restaurant} />
      <RestaurantCategories restaurant={restaurant} />
    </div>
  );
};

export default RestaurantMenuPage;
