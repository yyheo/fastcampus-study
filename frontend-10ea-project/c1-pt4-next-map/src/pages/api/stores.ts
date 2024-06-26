import type { NextApiRequest, NextApiResponse } from "next";
import { StoreType, StoreApiResponse } from "@/interface";
import prisma from "@/db";

interface ResponseType {
  page?: string;
  limit?: string;
  q?: string;
  district?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<StoreApiResponse | StoreType[] | StoreType>
) {
  const { page = "", limit = "", q, district }: ResponseType = req.query;

  if (page) {
    const count = await prisma.store.count();
    const skipPage = parseInt(page) - 1;
    const stores = await prisma.store.findMany({
      orderBy: { id: "asc" },
      where: {
        name: q ? { contains: q } : {}, // 참고: https://prisma.io/docs/orm/prisma-client/queries/filtering-and-sorting
        address: district? { contains: district } : {},
      },
      take: 10,
      skip: skipPage * 10,
    });

    res.status(200).json({
      page: parseInt(page),
      data: stores,
      totalCount: count,
      totalPage: Math.ceil(count / 10),
    });
  } else {
    const { id }: { id?: string } = req.query;

    const stores = await prisma.store.findMany({
      orderBy: { id: "asc" },
      where: { id: id ? parseInt(id) : {} },
    });
    return res.status(200).json(id ? stores[0] : stores);
  }
}
