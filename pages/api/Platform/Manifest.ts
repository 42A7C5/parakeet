/****************************
© 2019-present Samuel Sharp. All rights reserved.
****************************/

let apiVersion = 2

export type ResponseData = {
    "Response": any,
    "ParakeetAPI": number,
    "ErrorCode": number,
    "ErrorStatus": string,
    "Message": string,
    "ThrottleSeconds": number,
}

export const ErrorResponseData = {
    UnimplementedMethod: {
        "Response": null,
        "ParakeetAPI": apiVersion,
        "ErrorCode": 2100,
        "ErrorStatus": "UnimplementedMethod",
        "Message": "This method is not yet implemented.",
        "ThrottleSeconds": 0,
    },
    NoGameAuthentication: {
        "Response": null,
        "ParakeetAPI": apiVersion,
        "ErrorCode": 2200,
        "ErrorStatus": "NoGameAuthentication",
        "Message": "You must authenticate your game client before accessing this endpoint.",
        "ThrottleSeconds": 0,
    },
    NoUserAuthentication: {
        "Response": null,
        "ParakeetAPI": apiVersion,
        "ErrorCode": 2201,
        "ErrorStatus": "NoUserAuthentication",
        "Message": "You must authenticate the logged in user with a token to access this endpoint.",
        "ThrottleSeconds": 0,
    },
}

export const SuccessfulResponseData = {
    "ParakeetAPI": apiVersion,
    "ErrorCode": 1,
    "ErrorStatus": "Success",
    "Message": "Ok",
    "ThrottleSeconds": 0,
}

import type { NextApiRequest, NextApiResponse } from 'next'
 
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  res.status(200).json(ErrorResponseData.UnimplementedMethod)
}