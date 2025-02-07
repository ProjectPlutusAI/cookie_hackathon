import ms from 'ms'
import { ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { PublicKey } from '@solana/web3.js'

const LAMPORTS_TO_SOL = 1000000000

export function lamportsToSol(lamp: number) { return lamp / LAMPORTS_TO_SOL }

export function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)) }

export function wait(ms: number): Promise<void> { return new Promise((resolve) => setTimeout(resolve, ms)) }

export function capitalize(str: string) {
	if (!str || typeof str !== 'string') return str
	return str.charAt(0).toUpperCase() + str.slice(1)
}
  
export const truncate = (str: string, length: number) => {
	if (!str || str.length <= length) return str
	return `${str.slice(0, length)}...`
}

export const shorten = (address: string, chars: number = 4): string => {
	return `${address.slice(0, chars)}...${address.slice(-chars)}`
}

export const timeAgo = (timestamp: Date, timeOnly?: boolean): string => {
	if (!timestamp) return 'never'
	return `${ms(Date.now() - new Date(timestamp).getTime())}${timeOnly ? '' : ' ago'}`
}

export function getTimeDiff(timestamp: string | undefined) {
	if (!timestamp) return null
	const date = new Date(Date.parse(timestamp))
	const currentDate = new Date()
	const diff = currentDate.getTime() - date.getTime() // difference in milliseconds
	const diffInSeconds = Math.floor(diff / 1000) // difference in seconds
  
	if (diffInSeconds < 180) {
		return 'just now'
	} else if (diffInSeconds < 3600) {
		const minutes = Math.floor(diffInSeconds / 60)
		// return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
		return `${minutes}m`
	} else if (diffInSeconds < 86400) {
		const hours = Math.floor(diffInSeconds / 3600)
		// return `${hours} hour${hours > 1 ? 's' : ''} ago`;
		return `${hours}h`
	} else if (diffInSeconds < 604800) {
		const days = Math.floor(diffInSeconds / 86400)
		// return `${days} day${days > 1 ? 's' : ''} ago`;
		return `${days}d`
	} else if (diffInSeconds < 2592000) {
		const weeks = Math.floor(diffInSeconds / 604800)
		// return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
		return `${weeks}w`
	} else {
		const years = Math.floor(diffInSeconds / 31536000)
		// return `${years} year${years > 1 ? 's' : ''} ago`;
		return `${years}y`
	}
}

export const  isValidSolanaPublicKey = (publicKeyString: string) => {
	// Attempt to create a PublicKey object. No error means the key is valid. Any error means the key is invalid
	try { new PublicKey(publicKeyString); return true
	} catch (error) { return false }
}

export const findAddressBySymbol = async (symbol: string): Promise<string | null> => {
	try {
		const response = await fetch('/api/address-lookup?symbol=' + symbol)
		const data = await response.json()
		return data.address || null
	} catch (error) {
		console.error('Error looking up address:', error)
		return null
	}
}


export const formatMarketCap = (num: number): string => {
	if (num < 0) throw new Error('Number must be non-negative')

	let suffix = ''
	let formattedNum = num

	if (num >= 1_000_000_000) {
		suffix = 'B'
		formattedNum = num / 1_000_000_000
	} else if (num >= 1_000_000) {
		suffix = 'M'
		formattedNum = num / 1_000_000
	} else if (num >= 1_000) {
		suffix = 'K'
		formattedNum = num / 1_000
	}
	
	return `$${formattedNum.toFixed(2)}${suffix}`
}


// export const formatPrice = (number: number): string => {
// 	if (number <= 0) throw new Error('Number must be positive')
// 	if (number > .01) return number.toFixed(2)
// 	// Convert the number to a string
// 	const numStr = number.toString()

// 	// Find the position of the first non-zero digit after the decimal point
// 	const match = numStr.match(/^0\.(0+)(\d)/)
// 	if (!match) throw new Error('Invalid input number format')

// 	const zerosAfterDecimal = match[1].length // Number of zeros after the decimal point
// 	const significantDigits = match[2] + numStr.slice(match[0].length, match[0].length + 3) // Extract 4 significant digits

// 	// Construct the formatted string
// 	return `$0.0₄${significantDigits}`
// }

export const formatPrice = (number: number): string => {
	if (number <= 0) throw new Error('Number must be positive')

	if (number >= 0.01) return number.toFixed(2)

	// Convert the number to a string
	const numStr = number.toString()

	// Match leading zeros after decimal point and capture significant digits
	const zerosMatch = numStr.match(/^0\.0+/)
	if (!zerosMatch) throw new Error('Invalid input number format')

	const zerosAfterDecimal = zerosMatch[0].length - 2 // Count zeros after decimal
	const significantDigits = numStr.slice(zerosMatch[0].length, zerosMatch[0].length + 4) // Extract first 4 significant digits

	if (!significantDigits) throw new Error('Invalid input number format')

	// Map digits to subscript Unicode characters
	const subscriptMap: { [key: string]: string } = {
		'0': '₀', '1': '₁', '2': '₂', '3': '₃', '4': '₄',
		'5': '₅', '6': '₆', '7': '₇', '8': '₈', '9': '₉'
	}

	// Convert zerosAfterDecimal to subscript
	const subscript = zerosAfterDecimal
		.toString()
		.split('')
		.map((digit) => subscriptMap[digit])
		.join('')

	// Return formatted string
	return `$0.0${subscript}${significantDigits}`
}

export const isWithinPercentage = (num1: number, num2: number, percentage: number): boolean => {
	if (num2 === 0) {
	  // Edge case: if num2 is zero, handle separately to avoid division by zero
	  return num1 === 0 
	}
	
	const diff = Math.abs(num1 - num2)
	const allowedDifference = Math.abs(num2) * (percentage / 100)
  
	return diff <= allowedDifference
}