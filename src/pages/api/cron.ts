import sendEmail from "@/lib/utils";
import {NextApiRequest, NextApiResponse} from "next";


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {

    sendEmail()

    res.status(200).json(`results`);
}