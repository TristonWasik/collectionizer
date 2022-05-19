// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import cors from "cors";
import axios from "axios";
import cheerio from "cheerio";
import { WorkshopItem } from "../../helpers/types";

type Data = {
  items: WorkshopItem[];
};

const handler = nc()
  .use(cors())
  .post(async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { data } = await axios.get(
      `https://steamcommunity.com/sharedfiles/filedetails/?id=${req.body.collectionId}`
    );
    let $ = cheerio.load(data);
    let items: WorkshopItem[] = [];

    $("div.collectionItem").each(function (i, el) {
      const name = $(el)
        .find("div.collectionItemDetails a div.workshopItemTitle")
        .text();
      const author = $(el)
        .find(
          "div.collectionItemDetails div.workshopItemAuthor span.workshopItemAuthorName a"
        )
        .text();
      const id = $(el).attr("id")?.slice(11) ?? "No Id Found";

      items.push({
        name,
        author,
        id,
      });
    });

    res.status(200).json({ items });
  });

export default handler;
