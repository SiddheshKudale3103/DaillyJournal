import React from "react"
import { clsx } from "clsx"

export default function Card(props: React.HTMLAttributes<HTMLDivElement>) {
  const { className, ...rest } = props
  return <div className={clsx("glass p-4", className)} {...rest} />
}
