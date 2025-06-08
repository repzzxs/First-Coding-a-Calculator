"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export default function IOSCalculator() {
  const [display, setDisplay] = useState("0")
  const [previousValue, setPreviousValue] = useState<number | null>(null)
  const [operation, setOperation] = useState<string | null>(null)
  const [waitingForOperand, setWaitingForOperand] = useState(false)

  const inputNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(String(num))
      setWaitingForOperand(false)
    } else {
      setDisplay(display === "0" ? String(num) : display + num)
    }
  }

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay("0.")
      setWaitingForOperand(false)
    } else if (display.indexOf(".") === -1) {
      setDisplay(display + ".")
    }
  }

  const clear = () => {
    setDisplay("0")
    setPreviousValue(null)
    setOperation(null)
    setWaitingForOperand(false)
  }

  const performOperation = (nextOperation: string) => {
    const inputValue = Number.parseFloat(display)

    if (previousValue === null) {
      setPreviousValue(inputValue)
    } else if (operation) {
      const currentValue = previousValue || 0
      const newValue = calculate(currentValue, inputValue, operation)

      setDisplay(String(newValue))
      setPreviousValue(newValue)
    }

    setWaitingForOperand(true)
    setOperation(nextOperation)
  }

  const calculate = (firstValue: number, secondValue: number, operation: string) => {
    switch (operation) {
      case "+":
        return firstValue + secondValue
      case "-":
        return firstValue - secondValue
      case "×":
        return firstValue * secondValue
      case "÷":
        return firstValue / secondValue
      case "=":
        return secondValue
      default:
        return secondValue
    }
  }

  const handleEquals = () => {
    const inputValue = Number.parseFloat(display)

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation)
      setDisplay(String(newValue))
      setPreviousValue(null)
      setOperation(null)
      setWaitingForOperand(true)
    }
  }

  const handlePercentage = () => {
    const value = Number.parseFloat(display)
    setDisplay(String(value / 100))
  }

  const handleToggleSign = () => {
    const value = Number.parseFloat(display)
    setDisplay(String(value * -1))
  }

  const formatDisplay = (value: string) => {
    if (value.length > 9) {
      return Number.parseFloat(value).toExponential(3)
    }
    return value
  }

  const Button = ({
    children,
    onClick,
    className,
    span = false,
  }: {
    children: React.ReactNode
    onClick: () => void
    className?: string
    span?: boolean
  }) => (
    <motion.button
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      onClick={onClick}
      className={cn(
        "h-20 rounded-full font-light text-3xl transition-all duration-150 active:brightness-75",
        span ? "col-span-2" : "",
        className,
      )}
    >
      {children}
    </motion.button>
  )

  return (
    <div className="flex items-center justify-center min-h-screen bg-black p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-black rounded-3xl p-6 shadow-2xl max-w-sm w-full"
      >
        {/* Display */}
        <motion.div
          key={display}
          initial={{ opacity: 0.8 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.1 }}
          className="text-white text-right text-6xl font-thin mb-4 h-24 flex items-end justify-end overflow-hidden"
        >
          {formatDisplay(display)}
        </motion.div>

        {/* Button Grid */}
        <div className="grid grid-cols-4 gap-3">
          {/* Row 1 */}
          <Button onClick={clear} className="bg-gray-400 text-black hover:bg-gray-300">
            {display !== "0" || operation || previousValue ? "C" : "AC"}
          </Button>
          <Button onClick={handleToggleSign} className="bg-gray-400 text-black hover:bg-gray-300">
            ±
          </Button>
          <Button onClick={handlePercentage} className="bg-gray-400 text-black hover:bg-gray-300">
            %
          </Button>
          <Button
            onClick={() => performOperation("÷")}
            className={cn(
              "bg-orange-500 text-white hover:bg-orange-400",
              operation === "÷" ? "bg-white text-orange-500" : "",
            )}
          >
            ÷
          </Button>

          {/* Row 2 */}
          <Button onClick={() => inputNumber("7")} className="bg-gray-800 text-white hover:bg-gray-700">
            7
          </Button>
          <Button onClick={() => inputNumber("8")} className="bg-gray-800 text-white hover:bg-gray-700">
            8
          </Button>
          <Button onClick={() => inputNumber("9")} className="bg-gray-800 text-white hover:bg-gray-700">
            9
          </Button>
          <Button
            onClick={() => performOperation("×")}
            className={cn(
              "bg-orange-500 text-white hover:bg-orange-400",
              operation === "×" ? "bg-white text-orange-500" : "",
            )}
          >
            ×
          </Button>

          {/* Row 3 */}
          <Button onClick={() => inputNumber("4")} className="bg-gray-800 text-white hover:bg-gray-700">
            4
          </Button>
          <Button onClick={() => inputNumber("5")} className="bg-gray-800 text-white hover:bg-gray-700">
            5
          </Button>
          <Button onClick={() => inputNumber("6")} className="bg-gray-800 text-white hover:bg-gray-700">
            6
          </Button>
          <Button
            onClick={() => performOperation("-")}
            className={cn(
              "bg-orange-500 text-white hover:bg-orange-400",
              operation === "-" ? "bg-white text-orange-500" : "",
            )}
          >
            −
          </Button>

          {/* Row 4 */}
          <Button onClick={() => inputNumber("1")} className="bg-gray-800 text-white hover:bg-gray-700">
            1
          </Button>
          <Button onClick={() => inputNumber("2")} className="bg-gray-800 text-white hover:bg-gray-700">
            2
          </Button>
          <Button onClick={() => inputNumber("3")} className="bg-gray-800 text-white hover:bg-gray-700">
            3
          </Button>
          <Button
            onClick={() => performOperation("+")}
            className={cn(
              "bg-orange-500 text-white hover:bg-orange-400",
              operation === "+" ? "bg-white text-orange-500" : "",
            )}
          >
            +
          </Button>

          {/* Row 5 */}
          <Button
            onClick={() => inputNumber("0")}
            className="bg-gray-800 text-white hover:bg-gray-700 text-left pl-8"
            span={true}
          >
            0
          </Button>
          <Button onClick={inputDecimal} className="bg-gray-800 text-white hover:bg-gray-700">
            .
          </Button>
          <Button onClick={handleEquals} className="bg-orange-500 text-white hover:bg-orange-400">
            =
          </Button>
        </div>
      </motion.div>
    </div>
  )
}
