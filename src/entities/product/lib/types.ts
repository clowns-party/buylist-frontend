import { GetBuylistByIdQuery } from "entities/buylist/model/queries/buylistById.query.generated";

export type Product = GetBuylistByIdQuery["buylist"]["products"][0];
