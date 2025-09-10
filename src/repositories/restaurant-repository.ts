import { db } from "@/lib/prisma";

export const getRestaurantBySlug = async (slug: string) => {
  return await db.restaurant.findUnique({ where: { slug } });
};

export const getRestaurantWithCategoriesBySlug = async (slug: string) => {
  return await db.restaurant.findUnique({
    where: { slug },
    include: {
      menuCategories: {
        include: { products: true },
      },
    },
  });
};
