import { Request, Response } from "express";
import {
  CreateProductInput,
  UpdateProductInput,
} from "../schema/product.schema";
import {
  createProduct,
  deleteProduct,
  findAllProducts,
  findAndUpdateProduct,
  findProduct,
} from "../service/product.service";
import logger from "../utils/logger";

export async function createProductHandler(
  req: Request<{}, {}, CreateProductInput["body"]>,
  res: Response
) {
  try {
    const userId = res.locals.user._id;

    const body = req.body;

    const product = await createProduct({ ...body, user: userId });

    res.send(product);
  } catch (e: any) {
    logger.error(e);
    res.status(409).send(e.message);
  }
}

export async function updateProductHandler(
  req: Request<UpdateProductInput["params"]>,
  res: Response
) {
  try {
    const userId = res.locals.user._id;
    const productId = req.params.productId;
    const update = req.body;

    const product = await findProduct({ productId });

    if (!product) {
      res.sendStatus(404);
      return;
    }

    if (String(product.user) !== userId) {
      res.sendStatus(403);
      return;
    }

    const updatedProduct = await findAndUpdateProduct({ productId }, update, {
      new: true,
    });

    res.send(updatedProduct);
  } catch (e: any) {
    logger.error(e);
    res.status(409).send(e.message);
  }
}

export async function getProductHandler(
  req: Request<UpdateProductInput["params"]>,
  res: Response
) {
  try {
    const productId = req.params.productId;
    const product = await findProduct({ productId });

    if (!product) {
      res.sendStatus(404);
      return;
    }

    res.send(product);
  } catch (e: any) {
    logger.error(e);
    res.status(409).send(e.message);
  }
}

export async function getAllProductsHandler(req: Request, res: Response) {
  try {
    const products = await findAllProducts();

    if (!products) {
      res.sendStatus(404);
    }

    res.send(products);
  } catch (e: any) {
    logger.error(e);
    res.status(409).send(e.message);
  }
}

export async function deleteProductHandler(
  req: Request<UpdateProductInput["params"]>,
  res: Response
) {
  try {
    const userId = res.locals.user._id;
    const productId = req.params.productId;

    const product = await findProduct({ productId });

    if (!product) {
      res.sendStatus(404);
      return;
    }

    if (String(product.user) !== userId) {
      res.sendStatus(403);
      return;
    }

    await deleteProduct({ productId });

    res.sendStatus(200);
  } catch (e: any) {
    logger.error(e);
    res.status(409).send(e.message);
  }
}
