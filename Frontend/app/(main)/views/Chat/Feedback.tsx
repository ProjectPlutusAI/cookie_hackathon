'use client'
import { Flex } from '@/ui/primitives'
import { ThumbsUp, ThumbsDown, SquarePen } from 'lucide-react'

export const FeedbackRow = () => {
	return (
		<Flex className="w-full h-16 bg-ppGray500 border border-ppGray400 rounded-full pl-6 pr-2">
			<ThumbsUp color="white" className="!size-6" size={24} />
			<ThumbsDown color="white" className="!size-6" size={24} />
			<SquarePen color="white" className="!size-6" size={24} />
		</Flex>
	)
}