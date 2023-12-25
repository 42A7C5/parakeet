/****************************
© 2019-present Samuel Sharp. All rights reserved.
****************************/

import type { NextApiRequest, NextApiResponse } from 'next'
import type { ResponseData } from '../Manifest'

import { ErrorResponseData, SuccessfulResponseData } from '../Manifest'
 
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  res.status(200).json({
    "Response": {
        "membershipId": "QvkwDWiB4GXN7IAJFJOv5blONnW2",
        "displayName": "Parakeet User",
        "profilePicture": '/interface/default.png',
        "persistentData": {
            "coins": 660,
            "gems": 300,
            "skins": []
        }
    },
    ...SuccessfulResponseData,
  })
}