"use client"

import { useState, useMemo } from "react"
import { Bell, Bookmark, Video, MapPin, Facebook, Twitter, Mail, Copy, Share, Play, Eye } from "lucide-react"

interface PaymentMethod {
  id: string
  name: string
  logo: string
  color: string
  qrCode?: string
  instructions?: string
}

const paymentMethods: PaymentMethod[] = [
  {
    id: "orange",
    name: "Orange Money",
    logo: "../../../public/images/OrangeMoneymainlogo.jpg",
    color: "#FF6600",
    qrCode:
      "/images/defaultQRCODE.png",
    instructions: "Dial *126# and follow the prompts to pay 5000 XAF",
  },
  {
    id: "mtn",
    name: "MTN Mobile Money",
    logo: "../../../public/images/mtnlogo0.jpeg",
    color: "#FFCC00",
    qrCode:
      "/images/defaultQRCODE.png",
    instructions: "Send 5000 XAF to *150*50# for event registration",
  },
  {
    id: "visa",
    name: "Visa/Mastercard",
    logo: "💳",
    color: "#1A1F71",
    instructions: "Enter your card details securely below",
  },
  {
    id: "paypal",
    name: "PayPal",
    logo: "🔵",
    color: "#003087",
    instructions: "You will be redirected to PayPal to complete payment",
  },
]

type EventStatus = "upcoming" | "ongoing" | "past"

interface EventDetailTopProps {
  eventTitle?: string
  eventDate?: string
  eventTime?: string
  location?: string
  eventImage?: string
  eventDateTime?: string // ISO string format for precise status calculation
  hasStream?: boolean // Whether the event has streaming capability
}

export default function EventDetailTop({
  eventTitle = "Dinner Party",
  eventDate = "Saturday, Feb 23 2019",
  eventTime = "5:00 PM - 11:00 PM",
  location = "5323 Gilroy St Gilroy, CA",
  eventImage = "https://images.unsplash.com/photo-1703883635837-932563331641?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bmlnZXJpYW4lMjBjdWx0dXJlfGVufDB8fDB8fHww",
  eventDateTime = "2024-12-25T17:00:00Z",
  hasStream = true,
}: EventDetailTopProps) {
  const [selectedPayment, setSelectedPayment] = useState<string>("orange")
  const [showTooltip, setShowTooltip] = useState<string | null>(null)

  const eventStatus: EventStatus = useMemo(() => {
    const now = new Date()
    const eventStart = new Date(eventDateTime)
    const eventEnd = new Date(eventStart.getTime() + 6 * 60 * 60 * 1000) // Assume 6 hours duration

    if (now < eventStart) return "upcoming"
    if (now >= eventStart && now <= eventEnd) return "ongoing"
    return "past"
  }, [eventDateTime])

  const getActionButtons = () => {
    const baseButtons = [
      {
        id: "save",
        icon: Bookmark,
        tooltip: "Save Event",
        className:
          "p-2 rounded-lg border border-gray-200 hover:border-gray-300 text-gray-600 hover:text-gray-700 transition-colors duration-200",
      },
      {
        id: "share",
        icon: Share,
        tooltip: "Share Event",
        className:
          "p-2 rounded-lg border border-gray-200 hover:border-gray-300 text-gray-600 hover:text-gray-700 transition-colors duration-200",
      },
    ]

    switch (eventStatus) {
      case "upcoming":
        return [
          {
            id: "notify",
            icon: Bell,
            tooltip: "Notify Me",
            className: "p-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-200",
          },
          ...baseButtons,
          ...(hasStream
            ? [
                {
                  id: "streaming",
                  icon: Video,
                  tooltip: "Go to Streaming",
                  className:
                    "p-2 rounded-lg border border-gray-200 hover:border-gray-300 text-gray-600 hover:text-gray-700 transition-colors duration-200",
                },
              ]
            : []),
        ]

      case "ongoing":
        return [
          {
            id: "watch-live",
            icon: Eye,
            tooltip: "Watch Live",
            className:
              "p-2 rounded-lg bg-red-600 hover:bg-red-700 text-white transition-colors duration-200 ring-2 ring-red-200 animate-pulse",
          },
          ...baseButtons,
        ]

      case "past":
        return [
          ...(hasStream
            ? [
                {
                  id: "rewatch",
                  icon: Play,
                  tooltip: "Rewatch Stream",
                  className:
                    "p-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white transition-colors duration-200",
                },
              ]
            : []),
          ...baseButtons,
        ]

      default:
        return baseButtons
    }
  }

  const getStatusColor = (status: EventStatus) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-500"
      case "ongoing":
        return "bg-green-500 animate-pulse"
      case "past":
        return "bg-gray-500"
    }
  }

  const getStatusText = (status: EventStatus) => {
    switch (status) {
      case "upcoming":
        return "Upcoming"
      case "ongoing":
        return "Live Now"
      case "past":
        return "Past Event"
    }
  }

  const socialButtons = [
    { id: "facebook", icon: Facebook, color: "#1877F2" },
    { id: "twitter", icon: Twitter, color: "#1DA1F2" },
    { id: "email", icon: Mail, color: "#EA4335" },
    { id: "copy", icon: Copy, color: "#6B7280" },
  ]

  return (
    <div className="w-full bg-gray-50">
      {/* Full-width Event Image Background */}
      <div className="relative w-full h-96">
        <img src={eventImage || "/placeholder.svg"} alt={eventTitle} className="w-full h-full object-cover" />
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/20"></div>

        {/* Status Badge */}
        <div className="absolute top-6 right-6 z-10">
          <span className={`px-4 py-2 rounded-full text-white text-sm font-semibold ${getStatusColor(eventStatus)}`}>
            {getStatusText(eventStatus)}
          </span>
        </div>
      </div>

      {/* Event Card - Overlapping the image */}
      <div className="relative -mt-20 mx-auto max-w-5xl px-6">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* Left Side - Event Information */}
            <div className="flex-1 p-8">
              <div className="space-y-6">
                <h1 className="text-3xl font-bold text-gray-900 leading-tight">{eventTitle}</h1>

                {/* Date and Time Section */}
                <div className="space-y-3">
                  <div className="flex items-start">
                    <div className="flex items-center justify-center w-6 h-6 bg-red-100 rounded-full mr-3 mt-0.5">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    </div>
                    <div className="flex-1">
                      <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Date And Time</div>
                      <div className="flex justify-between items-center">
                        <div className="text-sm text-gray-900">{eventDate}</div>
                        <div className="text-sm text-gray-600">{eventTime}</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex items-center justify-center w-6 h-6 bg-gray-100 rounded-full mr-3 mt-0.5">
                      <MapPin className="w-3 h-3 text-gray-600" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Address</div>
                      <div className="text-sm text-blue-600 hover:text-blue-700 cursor-pointer hover:cursor-pointer">
                        {location}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Share Section with Action Buttons */}
                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <div className="text-xs text-gray-500 uppercase tracking-wide mb-3">Share With Friends</div>
                    <div className="flex items-center gap-3">
                      {socialButtons.map((button) => (
                        <button
                          key={button.id}
                          className="p-2 rounded-lg border border-gray-200 hover:border-gray-300 text-gray-600 hover:text-gray-700 transition-colors duration-200 hover:cursor-pointer"
                          style={{ color: button.color }}
                        >
                          <button.icon className="w-4 h-4" />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex-1 ">
                    {/* <div className="text-xs text-gray-500 uppercase tracking-wide mb-3">Quick Actions</div> */}
                    <div className="flex items-center justify-end gap-3 mt-6 ">
                      {getActionButtons().map((action) => (
                        <div key={action.id} className="relative">
                          <button
                            onMouseEnter={() => setShowTooltip(action.id)}
                            onMouseLeave={() => setShowTooltip(null)}
                            className={`${action.className} hover:cursor-pointer`}
                          >
                            <action.icon className="w-4 h-4" />
                          </button>
                          {showTooltip === action.id && (
                            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap z-10">
                              {action.tooltip}
                              <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Vertical Separator with Circle */}
            <div className="relative flex items-center justify-center lg:px-4">
              <div className="hidden lg:block relative w-full h-full">
                {/* Dashed line that touches edges */}
                <div
                  className="absolute top-0 bottom-0 left-1/2 transform -translate-x-1/2 w-px opacity-50"
                  style={{
                    backgroundImage: `repeating-linear-gradient(to bottom, #d1d5db 0, #d1d5db 4px, transparent 4px, transparent 8px)`,
                  }}
                ></div>
                {/* Larger circle in middle */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-white border-2 border-gray-200 rounded-full shadow-sm"></div>
              </div>
              {/* Mobile separator */}
              <div className="lg:hidden w-full h-px bg-gray-200 relative mx-8">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-white border-2 border-gray-200 rounded-full shadow-sm"></div>
              </div>
            </div>

            {/* Right Side - Payment Section */}
            <div className="flex-1 p-8 mt-4">
              <div className="space-y-6">
                <div className="text-left">
                  <h2 className="text-xl font-semibold text-gray-900 ml-3">Contribute Now</h2>
                </div>

                {/* Section 1: Payment Information */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-3">
                    {paymentMethods.find((m) => m.id === selectedPayment)?.name} Payment
                  </h4>

                  <div className="text-sm">
                    {selectedPayment === "orange" && (
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Deposit Number:</span>
                          <span className="font-mono text-gray-900">671 75 54 32</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Deposit Name:</span>
                          <span className="font-mono text-gray-900">DINNER PARTY 2024</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Amount:</span>
                          <span className="font-mono text-gray-900 font-semibold">5,000 XAF</span>
                        </div>
                      </div>
                    )}

                    {selectedPayment === "mtn" && (
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Deposit Number:</span>
                          <span className="font-mono text-gray-900">691 65 54 32</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Deposit Name:</span>
                          <span className="font-mono text-gray-900">DINNER PARTY EVENT</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Amount:</span>
                          <span className="font-mono text-gray-900 font-semibold">5,000 XAF</span>
                        </div>
                      </div>
                    )}

                    {selectedPayment === "visa" && (
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Merchant:</span>
                          <span className="font-mono text-gray-900">PC Events Ltd</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Reference:</span>
                          <span className="font-mono text-gray-900">DINNER_PARTY_2024</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Amount:</span>
                          <span className="font-mono text-gray-900 font-semibold">5,000 XAF</span>
                        </div>
                      </div>
                    )}

                    {selectedPayment === "paypal" && (
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">PayPal Email:</span>
                          <span className="font-mono text-gray-900">pay@dinnerparty.com</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Reference:</span>
                          <span className="font-mono text-gray-900">DINNER_PARTY_2024</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Amount:</span>
                          <span className="font-mono text-gray-900 font-semibold">$12 USD</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-3 bg-white text-gray-500">OR</span>
                  </div>
                </div>

                {/* Section 2: QR Code (Middle) */}
                <div className="text-center">
                  <div className="inline-block p-3 bg-gray-50 rounded-lg">
                    {paymentMethods.find((m) => m.id === selectedPayment)?.qrCode ? (
                      <img
                        src={paymentMethods.find((m) => m.id === selectedPayment)?.qrCode || "../../assets/defaultQRCODE.png"}
                        alt="Payment QR Code"
                        className="w-24 h-24"
                      />
                    ) : (
                      <div className="w-24 h-24 bg-white rounded border-2 border-gray-200 flex items-center justify-center">
                        <div className="grid grid-cols-5 gap-1">
                          {[...Array(25)].map((_, i) => (
                            <div key={i} className={`w-1 h-1 ${Math.random() > 0.5 ? "bg-black" : "bg-white"}`}></div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <p className="text-xs text-gray-600 mt-2">
                    Scan to pay with {paymentMethods.find((m) => m.id === selectedPayment)?.name}
                  </p>
                </div>

                {/* Section 3: Payment Buttons Row (Bottom) */}
                <div className="text-center">
                  <div className="flex items-center justify-center gap-3">
                    {paymentMethods.map((method) => (
                      <div key={method.id} className="relative">
                        {/* <button
                          onClick={() => setSelectedPayment(method.id)}
                          onMouseEnter={() => setShowTooltip(method.id)}
                          onMouseLeave={() => setShowTooltip(null)}
                          className={`p-2 rounded-lg border transition-colors duration-200 hover:cursor-pointer ${
                            selectedPayment === method.id
                              ? "border-blue-300 bg-blue-50"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <span className="text-lg">{method.logo}</span>
                        </button> */}
                        <button
                            onClick={() => setSelectedPayment(method.id)}
                            onMouseEnter={() => setShowTooltip(method.id)}
                            onMouseLeave={() => setShowTooltip(null)}
                            className={`p-2 rounded-lg border transition-colors duration-200 hover:cursor-pointer ${
                              selectedPayment === method.id
                                ? "border-blue-300 bg-blue-50"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                          >
                            <img 
                              src={method.logo} 
                              alt={method.name}
                              className="w-6 h-6 object-contain"
                              onError={(e) => {
                                // Fallback if image fails to load
                                e.currentTarget.style.display = 'none'
                                e.currentTarget.nextSibling.style.display = 'inline'
                              }}
                            />
                            <span className="text-lg hidden">💳</span> {/* Fallback emoji */}
                          </button>

                        {/* Tooltip */}
                        {showTooltip === method.id && (
                          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap z-10">
                            {method.name}
                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Extra spacing below */}
      <div className="h-16"></div>
    </div>
  )
}
