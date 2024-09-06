import { dummyProducts } from "@/app/[locale]/home/(products)/dummyProducts";

export const fetchData = jest.fn().mockResolvedValue(dummyProducts);