/****************************
© 2019-present LeagueXP. All rights reserved.
****************************/

import { useRouter } from "next/router"
import { useEffect } from "react"

export default function E404() {
    const router = useRouter()
    useEffect(() => {
        router.replace("/")
    })
    return (<></>)
}