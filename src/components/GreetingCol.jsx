import React from 'react'
import {setGreeting, bedTimeVariable} from "@/utils/helpers/dateUtils";
export default function GreetingCol({userDetails}) {
  return (
    <div>
        <h1>Good {setGreeting()}, {userDetails?.userName || "user"}</h1>
      <p>{bedTimeVariable()}</p>
    </div>
  )
}
