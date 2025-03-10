"use client"

import { useState } from "react"
import { Phone } from "lucide-react"

export default function CompanyLogo({
  size = 240,
  primaryColor = "#0369a1",
  secondaryColor = "#0ea5e9"
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="inline-flex flex-col items-center justify-center"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <svg
        width={size}
        height={size * 0.8}
        viewBox="0 0 240 192"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-lg transition-all duration-300"
        style={{ transform: hovered ? "scale(1.05)" : "scale(1)" }}
      >
        {/* Background Shape */}
        <path
          d="M40 96C40 65.072 65.072 40 96 40H144C174.928 40 200 65.072 200 96V96C200 126.928 174.928 152 144 152H96C65.072 152 40 126.928 40 96V96Z"
          fill={primaryColor}
        />

        {/* Decorative Elements */}
        <path
          d="M20 96C20 54.0264 54.0264 20 96 20H144C185.974 20 220 54.0264 220 96V96C220 137.974 185.974 172 144 172H96C54.0264 172 20 137.974 20 96V96Z"
          stroke={secondaryColor}
          strokeWidth="4"
          strokeDasharray={hovered ? "0" : "8 8"}
          strokeOpacity="0.6"
          fill="none"
        />

        {/* Signal Waves */}
        <path
          d="M96 56C73.9086 56 56 73.9086 56 96C56 118.091 73.9086 136 96 136"
          stroke="white"
          strokeWidth="4"
          strokeLinecap="round"
          strokeOpacity="0.8"
          fill="none"
        />

        <path
          d="M144 136C166.091 136 184 118.091 184 96C184 73.9086 166.091 56 144 56"
          stroke="white"
          strokeWidth="4"
          strokeLinecap="round"
          strokeOpacity="0.8"
          fill="none"
        />

        {/* Phone Icon (white) in center */}
        <g transform="translate(108, 96)" style={{ transformOrigin: "center" }}>
          <circle cx="0" cy="0" r="28" fill="white" fillOpacity="0.9" />
          <g transform="translate(-12, -12)">
            <Phone color={primaryColor} size={24} strokeWidth={2.5} />
          </g>
        </g>
      </svg>
    </div>
  )
}

