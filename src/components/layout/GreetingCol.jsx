import React from 'react'
import {setGreeting, bedTimeVariable} from "@/utils/helpers/dateUtils";
export default function GreetingCol({userDetails}) {
  return (
    <>
        <h1 className='greeting'>Good {setGreeting()}, {userDetails?.userName || "user"}</h1>
      <p>{bedTimeVariable()}</p>
    </>
  )
}
